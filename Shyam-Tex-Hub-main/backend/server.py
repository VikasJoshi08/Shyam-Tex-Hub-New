from fastapi import FastAPI, APIRouter, BackgroundTasks, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emails import send_contact_inquiry_email, send_quote_request_email, EmailDeliveryError


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    phone: str
    requirement: Optional[str] = ""
    message: str

class QuoteRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    phone: str
    fabricType: str
    quantity: str
    message: Optional[str] = ""

class ResponseMessage(BaseModel):
    status: str
    message: str


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc_dict = status_obj.model_dump()
    doc_dict['timestamp'] = status_obj.timestamp.isoformat()
    
    _ = await db.status_checks.insert_one(doc_dict)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ResponseMessage)
async def submit_contact_form(request: ContactFormRequest, background_tasks: BackgroundTasks):
    """
    Handle contact form submission and send email notification
    """
    try:
        # Store inquiry in database
        inquiry_data = {
            "id": str(uuid.uuid4()),
            "type": "contact",
            "name": request.name,
            "company": request.company,
            "email": request.email,
            "phone": request.phone,
            "requirement": request.requirement,
            "message": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.inquiries.insert_one(inquiry_data)
        
        # Send email notification in background
        background_tasks.add_task(
            send_contact_inquiry_email,
            request.name,
            request.company,
            request.email,
            request.phone,
            request.requirement,
            request.message
        )
        
        return ResponseMessage(
            status="success",
            message="Thank you for your inquiry! We will get back to you shortly."
        )
    except EmailDeliveryError as e:
        logger.error(f"Email delivery failed: {str(e)}")
        # Still return success if database save succeeded
        return ResponseMessage(
            status="success",
            message="Thank you for your inquiry! We will get back to you shortly."
        )
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred. Please try again later.")

@api_router.post("/quote", response_model=ResponseMessage)
async def submit_quote_request(request: QuoteRequest, background_tasks: BackgroundTasks):
    """
    Handle product quote request and send email notification
    """
    try:
        # Store quote request in database
        quote_data = {
            "id": str(uuid.uuid4()),
            "type": "quote",
            "name": request.name,
            "company": request.company,
            "email": request.email,
            "phone": request.phone,
            "fabric_type": request.fabricType,
            "quantity": request.quantity,
            "message": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        await db.inquiries.insert_one(quote_data)
        
        # Send email notification in background
        background_tasks.add_task(
            send_quote_request_email,
            request.name,
            request.company,
            request.email,
            request.phone,
            request.fabricType,
            request.quantity,
            request.message
        )
        
        return ResponseMessage(
            status="success",
            message="Quote request received! Our team will contact you shortly with pricing details."
        )
    except EmailDeliveryError as e:
        logger.error(f"Email delivery failed: {str(e)}")
        # Still return success if database save succeeded
        return ResponseMessage(
            status="success",
            message="Quote request received! Our team will contact you shortly with pricing details."
        )
    except Exception as e:
        logger.error(f"Quote request error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred. Please try again later.")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

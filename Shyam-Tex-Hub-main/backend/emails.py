from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
from typing import Optional

class EmailDeliveryError(Exception):
    """Exception raised when email delivery fails"""
    pass

def send_email(to: str, subject: str, html_content: str, plain_text_content: Optional[str] = None):
    """
    Send email via SendGrid
    
    Args:
        to: Recipient email address
        subject: Email subject line
        html_content: HTML email content
        plain_text_content: Plain text fallback (optional)
    
    Returns:
        bool: True if email sent successfully
        
    Raises:
        EmailDeliveryError: If email delivery fails
    """
    sender_email = os.getenv('SENDER_EMAIL', 'noreply@shyamtexhub.com')
    sendgrid_api_key = os.getenv('SENDGRID_API_KEY')
    
    if not sendgrid_api_key:
        raise EmailDeliveryError("SendGrid API key not configured")
    
    message = Mail(
        from_email=sender_email,
        to_emails=to,
        subject=subject,
        html_content=html_content,
        plain_text_content=plain_text_content
    )
    
    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        return response.status_code == 202
    except Exception as e:
        raise EmailDeliveryError(f"Failed to send email: {str(e)}")


def send_contact_inquiry_email(name: str, company: str, email: str, phone: str, 
                               requirement: str, message: str):
    """
    Send contact form inquiry notification email
    """
    subject = f"New Contact Inquiry from {name} - {company}"
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #a32820; border-bottom: 2px solid #a32820; padding-bottom: 10px;">
                    New Contact Inquiry
                </h2>
                
                <div style="background-color: #f6f5e8; padding: 20px; margin: 20px 0; border-left: 4px solid #a32820;">
                    <h3 style="margin-top: 0; color: #a32820;">Contact Details</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Company:</strong> {company}</p>
                    <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:{phone}">{phone}</a></p>
                    <p><strong>Requirement Type:</strong> {requirement if requirement else 'Not specified'}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #a32820;">Message</h3>
                    <div style="background-color: #fffef2; padding: 15px; border: 1px solid #bcbbb4;">
                        <p style="white-space: pre-wrap;">{message}</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #bcbbb4; color: #666;">
                    <p style="font-size: 12px;">
                        This inquiry was submitted through the Shyam Tex Hub website contact form.
                    </p>
                </div>
            </div>
        </body>
    </html>
    """
    
    plain_text = f"""
    New Contact Inquiry
    
    Contact Details:
    Name: {name}
    Company: {company}
    Email: {email}
    Phone: {phone}
    Requirement Type: {requirement if requirement else 'Not specified'}
    
    Message:
    {message}
    
    ---
    This inquiry was submitted through the Shyam Tex Hub website contact form.
    """
    
    recipient_email = os.getenv('CONTACT_EMAIL', 'shyamtexhub@gmail.com')
    return send_email(recipient_email, subject, html_content, plain_text)


def send_quote_request_email(name: str, company: str, email: str, phone: str,
                             fabric_type: str, quantity: str, message: str):
    """
    Send product quote request notification email
    """
    subject = f"New Quote Request from {name} - {fabric_type}"
    
    # Build additional requirements section if message exists
    additional_req_html = ""
    if message:
        additional_req_html = f"""
                <div style="margin: 20px 0;">
                    <h3 style="color: #a32820;">Additional Requirements</h3>
                    <div style="background-color: #fffef2; padding: 15px; border: 1px solid #bcbbb4;">
                        <p style="white-space: pre-wrap;">{message}</p>
                    </div>
                </div>
                """
    
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #a32820; border-bottom: 2px solid #a32820; padding-bottom: 10px;">
                    New Quote Request
                </h2>
                
                <div style="background-color: #f6f5e8; padding: 20px; margin: 20px 0; border-left: 4px solid #a32820;">
                    <h3 style="margin-top: 0; color: #a32820;">Customer Details</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Company:</strong> {company}</p>
                    <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:{phone}">{phone}</a></p>
                </div>
                
                <div style="background-color: #fffef2; padding: 20px; margin: 20px 0; border-left: 4px solid #a32820;">
                    <h3 style="margin-top: 0; color: #a32820;">Quote Details</h3>
                    <p><strong>Fabric Type:</strong> {fabric_type}</p>
                    <p><strong>Quantity:</strong> {quantity} meters</p>
                </div>
                
                {additional_req_html}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #bcbbb4; color: #666;">
                    <p style="font-size: 12px;">
                        This quote request was submitted through the Shyam Tex Hub website.
                    </p>
                </div>
            </div>
        </body>
    </html>
    """
    
    plain_text = f"""
    New Quote Request
    
    Customer Details:
    Name: {name}
    Company: {company}
    Email: {email}
    Phone: {phone}
    
    Quote Details:
    Fabric Type: {fabric_type}
    Quantity: {quantity} meters
    
    Additional Requirements:
    {message if message else 'None'}
    
    ---
    This quote request was submitted through the Shyam Tex Hub website.
    """
    
    recipient_email = os.getenv('CONTACT_EMAIL', 'shyamtexhub@gmail.com')
    return send_email(recipient_email, subject, html_content, plain_text)

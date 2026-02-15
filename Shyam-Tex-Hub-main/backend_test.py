import requests
import sys
import json
from datetime import datetime

class ShyamTexHubAPITester:
    def __init__(self, base_url="https://shyam-tex-preview.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    "name": name,
                    "endpoint": endpoint,
                    "expected_status": expected_status,
                    "actual_status": response.status_code,
                    "response": response.text
                })

            return success, response.json() if success else {}

        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection Error: Cannot connect to {url}")
            self.failed_tests.append({
                "name": name,
                "endpoint": endpoint,
                "error": "Connection Error - Backend not accessible"
            })
            return False, {}
        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout: Request took too long")
            self.failed_tests.append({
                "name": name,
                "endpoint": endpoint,
                "error": "Timeout Error"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "name": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        return self.run_test(
            "Basic API Connectivity",
            "GET",
            "/",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "company": "Test Company Ltd",
            "email": "testuser@example.com",
            "phone": "+91 9876543210",
            "requirement": "bulk-order",
            "message": "This is a test contact inquiry."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "/contact",
            200,
            data=contact_data
        )

    def test_quote_request_submission(self):
        """Test product quote request submission"""
        quote_data = {
            "name": "Test Buyer",
            "company": "Test Manufacturing Co",
            "email": "buyer@example.com", 
            "phone": "+91 9876543211",
            "fabricType": "Polyester Chiffon",
            "quantity": "5000",
            "message": "Need quote for polyester chiffon fabric"
        }
        
        return self.run_test(
            "Quote Request Submission",
            "POST",
            "/quote",
            200,
            data=quote_data
        )

    def test_invalid_contact_form_data(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "company": "Test Company",
            "email": "invalid-email",  # Invalid email
            "phone": "+91 9876543210",
            "requirement": "bulk-order",
            "message": "Test message"
        }
        
        return self.run_test(
            "Contact Form - Invalid Data",
            "POST",
            "/contact",
            422,  # Expecting validation error
            data=invalid_data
        )

    def test_invalid_quote_request_data(self):
        """Test quote request with invalid data"""
        invalid_data = {
            "name": "Test User",
            "company": "",  # Empty company
            "email": "invalid-email",  # Invalid email
            "phone": "+91 9876543210",
            "fabricType": "",  # Empty fabric type
            "quantity": "",  # Empty quantity
            "message": "Test message"
        }
        
        return self.run_test(
            "Quote Request - Invalid Data", 
            "POST",
            "/quote",
            422,  # Expecting validation error
            data=invalid_data
        )

    def test_status_check_endpoints(self):
        """Test status check endpoints"""
        # Test creating a status check
        status_data = {
            "client_name": "Test Client"
        }
        
        create_success, create_response = self.run_test(
            "Create Status Check",
            "POST", 
            "/status",
            200,
            data=status_data
        )
        
        # Test getting status checks
        get_success, get_response = self.run_test(
            "Get Status Checks",
            "GET",
            "/status", 
            200
        )
        
        return create_success and get_success

def main():
    # Setup
    print("🚀 Starting Shyam Tex Hub Backend API Testing...")
    print("=" * 60)
    
    tester = ShyamTexHubAPITester()
    
    # Run all tests
    print("\n📡 Testing Basic Connectivity...")
    tester.test_basic_connectivity()
    
    print("\n📝 Testing Contact Form...")
    tester.test_contact_form_submission()
    
    print("\n💰 Testing Quote Request...")
    tester.test_quote_request_submission()
    
    print("\n🔍 Testing Status Check Endpoints...")
    tester.test_status_check_endpoints()
    
    print("\n⚠️  Testing Error Handling...")
    tester.test_invalid_contact_form_data()
    tester.test_invalid_quote_request_data()
    
    # Print final results
    print("\n" + "=" * 60)
    print("📊 BACKEND TEST RESULTS")
    print("=" * 60)
    print(f"✅ Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"❌ Tests failed: {len(tester.failed_tests)}/{tester.tests_run}")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests Details:")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"{i}. {failure['name']}")
            print(f"   Endpoint: {failure['endpoint']}")
            if 'expected_status' in failure:
                print(f"   Expected: {failure['expected_status']}, Got: {failure['actual_status']}")
            if 'error' in failure:
                print(f"   Error: {failure['error']}")
            print()
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    if success_rate < 50:
        print("🔥 CRITICAL: More than 50% of backend functionality is broken!")
        return 1
    elif tester.failed_tests:
        print("⚠️  Some backend issues detected. Check failed tests above.")
        return 1
    else:
        print("🎉 All backend tests passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
#!/usr/bin/env python3
"""
Backend API Test Suite for XV Años RSVP Application
Tests all RSVP and Admin endpoints
"""

import requests
import json
import sys
from typing import Optional

# Load backend URL from frontend .env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BASE_URL = line.split('=')[1].strip() + '/api'
            break

print(f"Testing backend at: {BASE_URL}")
print("=" * 80)

# Test results tracking
tests_passed = 0
tests_failed = 0
test_details = []

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    global tests_passed, tests_failed
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {test_name}")
    if details:
        print(f"   {details}")
    
    if passed:
        tests_passed += 1
    else:
        tests_failed += 1
    
    test_details.append({
        "test": test_name,
        "passed": passed,
        "details": details
    })

def test_root_endpoint():
    """Test 1: GET /api/ should return welcome message"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "XV Años API":
                log_test("GET /api/ - Root endpoint", True, f"Response: {data}")
                return True
            else:
                log_test("GET /api/ - Root endpoint", False, f"Unexpected message: {data}")
                return False
        else:
            log_test("GET /api/ - Root endpoint", False, f"Status: {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /api/ - Root endpoint", False, f"Error: {str(e)}")
        return False

def test_create_rsvp_valid():
    """Test 2: POST /api/rsvp with valid data"""
    try:
        payload = {
            "name": "Juan Pérez",
            "passes": 2,
            "message": "¡Felicidades!"
        }
        response = requests.post(f"{BASE_URL}/rsvp", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            # Check if response has required fields
            if all(key in data for key in ["id", "name", "passes", "message"]):
                if data["name"] == payload["name"] and data["passes"] == payload["passes"]:
                    log_test("POST /api/rsvp - Valid RSVP creation", True, f"Created RSVP with id: {data['id']}")
                    return data["id"]  # Return ID for later tests
                else:
                    log_test("POST /api/rsvp - Valid RSVP creation", False, "Data mismatch in response")
                    return None
            else:
                log_test("POST /api/rsvp - Valid RSVP creation", False, f"Missing fields in response: {data}")
                return None
        else:
            log_test("POST /api/rsvp - Valid RSVP creation", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("POST /api/rsvp - Valid RSVP creation", False, f"Error: {str(e)}")
        return None

def test_create_rsvp_empty_name():
    """Test 3: POST /api/rsvp with empty name (should fail)"""
    try:
        payload = {
            "name": "",
            "passes": 2,
            "message": "Test"
        }
        response = requests.post(f"{BASE_URL}/rsvp", json=payload, timeout=10)
        
        if response.status_code == 400:
            log_test("POST /api/rsvp - Empty name validation", True, f"Correctly rejected with 400")
            return True
        else:
            log_test("POST /api/rsvp - Empty name validation", False, f"Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        log_test("POST /api/rsvp - Empty name validation", False, f"Error: {str(e)}")
        return False

def test_create_rsvp_zero_passes():
    """Test 4: POST /api/rsvp with passes=0 (should fail)"""
    try:
        payload = {
            "name": "Test User",
            "passes": 0,
            "message": "Test"
        }
        response = requests.post(f"{BASE_URL}/rsvp", json=payload, timeout=10)
        
        # Should return 422 (validation error) or 400
        if response.status_code in [400, 422]:
            log_test("POST /api/rsvp - Zero passes validation", True, f"Correctly rejected with {response.status_code}")
            return True
        else:
            log_test("POST /api/rsvp - Zero passes validation", False, f"Expected 400/422, got {response.status_code}")
            return False
    except Exception as e:
        log_test("POST /api/rsvp - Zero passes validation", False, f"Error: {str(e)}")
        return False

def test_admin_login_wrong_password():
    """Test 5: POST /api/admin/login with wrong password"""
    try:
        payload = {"password": "wrong"}
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        
        if response.status_code == 401:
            log_test("POST /api/admin/login - Wrong password", True, "Correctly rejected with 401")
            return True
        else:
            log_test("POST /api/admin/login - Wrong password", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("POST /api/admin/login - Wrong password", False, f"Error: {str(e)}")
        return False

def test_admin_login_correct_password():
    """Test 6: POST /api/admin/login with correct password"""
    try:
        payload = {"password": "alisson2026"}
        response = requests.post(f"{BASE_URL}/admin/login", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "token" in data and data["token"]:
                log_test("POST /api/admin/login - Correct password", True, f"Token received: {data['token'][:20]}...")
                return data["token"]
            else:
                log_test("POST /api/admin/login - Correct password", False, "No token in response")
                return None
        else:
            log_test("POST /api/admin/login - Correct password", False, f"Status: {response.status_code}, Body: {response.text}")
            return None
    except Exception as e:
        log_test("POST /api/admin/login - Correct password", False, f"Error: {str(e)}")
        return None

def test_admin_rsvps_no_token():
    """Test 7: GET /api/admin/rsvps without token"""
    try:
        response = requests.get(f"{BASE_URL}/admin/rsvps", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /api/admin/rsvps - No token", True, "Correctly rejected with 401")
            return True
        else:
            log_test("GET /api/admin/rsvps - No token", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("GET /api/admin/rsvps - No token", False, f"Error: {str(e)}")
        return False

def test_admin_rsvps_with_token(token: str, expected_rsvp_id: Optional[str] = None):
    """Test 8: GET /api/admin/rsvps with valid token"""
    try:
        headers = {"x-admin-token": token}
        response = requests.get(f"{BASE_URL}/admin/rsvps", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                found = False
                if expected_rsvp_id:
                    for rsvp in data:
                        if rsvp.get("id") == expected_rsvp_id:
                            found = True
                            break
                    if found:
                        log_test("GET /api/admin/rsvps - With token", True, f"Found expected RSVP in list of {len(data)} items")
                    else:
                        log_test("GET /api/admin/rsvps - With token", False, f"Expected RSVP {expected_rsvp_id} not found in list")
                else:
                    log_test("GET /api/admin/rsvps - With token", True, f"Retrieved {len(data)} RSVPs")
                return True
            else:
                log_test("GET /api/admin/rsvps - With token", False, "Response is not a list")
                return False
        else:
            log_test("GET /api/admin/rsvps - With token", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("GET /api/admin/rsvps - With token", False, f"Error: {str(e)}")
        return False

def test_admin_stats(token: str):
    """Test 9: GET /api/admin/stats with token"""
    try:
        headers = {"x-admin-token": token}
        response = requests.get(f"{BASE_URL}/admin/stats", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if "total_confirmations" in data and "total_passes" in data:
                log_test("GET /api/admin/stats - With token", True, 
                        f"Stats: {data['total_confirmations']} confirmations, {data['total_passes']} passes")
                return True
            else:
                log_test("GET /api/admin/stats - With token", False, f"Missing required fields: {data}")
                return False
        else:
            log_test("GET /api/admin/stats - With token", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("GET /api/admin/stats - With token", False, f"Error: {str(e)}")
        return False

def test_delete_rsvp(token: str, rsvp_id: str):
    """Test 10: DELETE /api/admin/rsvps/{id} with token"""
    try:
        headers = {"x-admin-token": token}
        response = requests.delete(f"{BASE_URL}/admin/rsvps/{rsvp_id}", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("DELETE /api/admin/rsvps/{id} - Delete RSVP", True, f"Successfully deleted RSVP {rsvp_id}")
                return True
            else:
                log_test("DELETE /api/admin/rsvps/{id} - Delete RSVP", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("DELETE /api/admin/rsvps/{id} - Delete RSVP", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("DELETE /api/admin/rsvps/{id} - Delete RSVP", False, f"Error: {str(e)}")
        return False

def test_verify_deletion(token: str, rsvp_id: str):
    """Test 11: Verify RSVP was deleted from list"""
    try:
        headers = {"x-admin-token": token}
        response = requests.get(f"{BASE_URL}/admin/rsvps", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            for rsvp in data:
                if rsvp.get("id") == rsvp_id:
                    log_test("Verify RSVP deletion", False, f"RSVP {rsvp_id} still exists in list")
                    return False
            log_test("Verify RSVP deletion", True, f"RSVP {rsvp_id} successfully removed from list")
            return True
        else:
            log_test("Verify RSVP deletion", False, f"Failed to fetch list: {response.status_code}")
            return False
    except Exception as e:
        log_test("Verify RSVP deletion", False, f"Error: {str(e)}")
        return False

def test_admin_logout(token: str):
    """Test 12: POST /api/admin/logout with token"""
    try:
        headers = {"x-admin-token": token}
        response = requests.post(f"{BASE_URL}/admin/logout", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("POST /api/admin/logout - Logout", True, "Successfully logged out")
                return True
            else:
                log_test("POST /api/admin/logout - Logout", False, f"Unexpected response: {data}")
                return False
        else:
            log_test("POST /api/admin/logout - Logout", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        log_test("POST /api/admin/logout - Logout", False, f"Error: {str(e)}")
        return False

def test_token_after_logout(token: str):
    """Test 13: Verify token is invalid after logout"""
    try:
        headers = {"x-admin-token": token}
        response = requests.get(f"{BASE_URL}/admin/rsvps", headers=headers, timeout=10)
        
        if response.status_code == 401:
            log_test("Token validity after logout", True, "Token correctly invalidated (401)")
            return True
        else:
            log_test("Token validity after logout", False, f"Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        log_test("Token validity after logout", False, f"Error: {str(e)}")
        return False

def main():
    """Run all tests in sequence"""
    print("\n🧪 Starting Backend API Tests\n")
    
    # Test 1: Root endpoint
    test_root_endpoint()
    
    # Test 2: Create valid RSVP
    rsvp_id = test_create_rsvp_valid()
    
    # Test 3 & 4: Validation tests
    test_create_rsvp_empty_name()
    test_create_rsvp_zero_passes()
    
    # Test 5 & 6: Admin login
    test_admin_login_wrong_password()
    admin_token = test_admin_login_correct_password()
    
    if not admin_token:
        print("\n❌ Cannot continue tests without admin token")
        print_summary()
        sys.exit(1)
    
    # Test 7 & 8: Admin RSVP list
    test_admin_rsvps_no_token()
    test_admin_rsvps_with_token(admin_token, rsvp_id)
    
    # Test 9: Admin stats
    test_admin_stats(admin_token)
    
    # Test 10 & 11: Delete RSVP
    if rsvp_id:
        test_delete_rsvp(admin_token, rsvp_id)
        test_verify_deletion(admin_token, rsvp_id)
    else:
        print("⚠️  Skipping delete tests - no RSVP ID available")
    
    # Test 12 & 13: Logout
    test_admin_logout(admin_token)
    test_token_after_logout(admin_token)
    
    print_summary()

def print_summary():
    """Print test summary"""
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY")
    print("=" * 80)
    print(f"✅ Passed: {tests_passed}")
    print(f"❌ Failed: {tests_failed}")
    print(f"📈 Total:  {tests_passed + tests_failed}")
    print(f"🎯 Success Rate: {(tests_passed / (tests_passed + tests_failed) * 100):.1f}%")
    print("=" * 80)
    
    if tests_failed > 0:
        print("\n❌ FAILED TESTS:")
        for detail in test_details:
            if not detail["passed"]:
                print(f"  • {detail['test']}")
                if detail["details"]:
                    print(f"    {detail['details']}")
        sys.exit(1)
    else:
        print("\n✅ All tests passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()

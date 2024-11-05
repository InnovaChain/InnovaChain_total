import requests

def test_update_image_prompt(image_id=1, wallet_address="0x1234567890123456789012345678901234567890"):
    url = f"http://localhost:8000/images/{image_id}/update_owner"

    params = {
        "wallet_address": wallet_address
    }

    response = requests.post(url, params=params)
    
    print(f"Response status code: {response.status_code}")
    
    print(f"Response content: {response.text}")
    
    try:
        data = response.json()
        print(f"Response JSON: {data}")
    except ValueError:
        print("Failed to parse JSON from the response.")
    
    if response.status_code == 200:
        print("Test passed: Prompt updated successfully.")
    else:
        print("Test failed: Prompt update failed.")

if __name__ == "__main__":
    test_update_image_prompt()
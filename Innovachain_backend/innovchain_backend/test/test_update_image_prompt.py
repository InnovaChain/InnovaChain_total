import requests

def test_update_image_prompt(image_id=1, new_prompt="New prompt for the image"):
    url = f"http://localhost:8000/images/{image_id}/prompt"

    data = {"prompt": new_prompt}

    response = requests.post(url, data=data)
    
    print(f"Response status code: {response.status_code}")
    
    print(f"Response content: {response.text}")
    
    try:
        data = response.json()
        print(f"Response JSON: {data}")
    except ValueError:
        print("Failed to parse JSON from the response.")
    
    if response.status_code == 200 and data.get('prompt') == new_prompt:
        print("Test passed: Prompt updated successfully.")
    else:
        print("Test failed: Prompt update failed.")

if __name__ == "__main__":
    test_update_image_prompt()
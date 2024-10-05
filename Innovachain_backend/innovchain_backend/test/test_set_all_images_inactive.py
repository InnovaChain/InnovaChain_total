import requests

def test_set_all_images_inactive():
    url = "http://localhost:8000/images/set-all-inactive"
    
    response = requests.post(url)
    
    print(f"Response status code: {response.status_code}")
    
    print(f"Response content: {response.text}")
    
    try:
        data = response.json()
        print(f"Response JSON: {data}")
    except ValueError:
        print("Failed to parse JSON from the response.")
    
    if response.status_code == 200 and data.get('message') == "All images set to inactive":
        print("Test passed: Correct message received.")
    else:
        print("Test failed: Incorrect message or status code.")

if __name__ == "__main__":
    test_set_all_images_inactive()

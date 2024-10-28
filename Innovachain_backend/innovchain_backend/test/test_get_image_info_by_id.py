import requests

def test_read_image_info(image_id, user_id=None):
    url = f"http://localhost:8000/images/info/{image_id}"
    params = {}

    if user_id is not None:
        params['user_id'] = user_id
    
    response = requests.get(url, params=params)
    
    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")

if __name__ == "__main__":
    test_read_image_info(2)
    test_read_image_info(1, user_id=2)

import requests

def test_read_image_info(image_id):
    url = f"http://localhost:8000/images/source/{image_id}"
    response = requests.get(url)

    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")

if __name__ == "__main__":
    test_read_image_info(2)

import requests

def test_increment_reference_count(image_id):
    url = f"http://localhost:8000/images/{image_id}/reference/increment"
    response = requests.post(url)

    data = response.json()
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:
        print(f"Updated reference count for image {image_id} is {data['reference_count']}")

if __name__ == "__main__":
    test_increment_reference_count(2)
import requests

def test_read_image(image_id):
    url = f"http://localhost:8000/images/{image_id}"
    response = requests.get(url)

    print(f"Response status code: {response.status_code}")

    print(f"Response headers: {response.headers}")

    print(f"Response content length: {len(response.content)}")

    with open(f"downloaded_{image_id}.jpg", "wb") as f:
        f.write(response.content)
    print(f"Image saved to downloaded_{image_id}.jpg")

if __name__ == "__main__":
    test_read_image(2)

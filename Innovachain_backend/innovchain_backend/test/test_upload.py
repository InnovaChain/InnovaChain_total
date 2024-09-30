import requests


def test_upload_image(file_path, wallet_address, name, description, prompt="", source_image_id=None, ):
    url = "http://localhost:8000/upload/"

    files = {
        "file": ("image.jpg", open(file_path, "rb"), "image/jpeg"),
        "wallet_address": (None, str(wallet_address)),
        "prompt": (None, prompt),
        "source_image_id": (None, str(source_image_id)) if source_image_id is not None else None,
        "name": (None, name),
        "description": (None, description),
    }

    response = requests.post(url, files=files)

    files["file"][1].close()

    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")


if __name__ == "__main__":
    test_upload_image(file_path="../innovation.png", wallet_address="test address", name="test name", description="test description", prompt="test prompt", source_image_id=2)

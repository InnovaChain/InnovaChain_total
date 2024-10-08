import requests


def test_upload_image(file_path, wallet_address, name, description, prompt="", source_image_id=None):
    url = "http://localhost:8000/upload/"

    files = [
        ("file", ("image.jpg", open(file_path, "rb"), "image/jpeg")),
        ("wallet_address", (None, str(wallet_address))),
        ("prompt", (None, prompt)),
        ("source_image_id", (None, str(source_image_id))) if source_image_id is not None else None,
        ("name", (None, name)),
        ("description", (None, description)),
    ]

    response = requests.post(url, files=[item for item in files if item])

    for _, f in files:
        if hasattr(f, "close"):
            f.close()

    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")


def test_upload_image_with_url(image_url, wallet_address, name, description, prompt="", source_image_id=None):
    url = "http://localhost:8000/upload/"

    data = {
        "wallet_address": wallet_address,
        "prompt": prompt,
        "name": name,
        "description": description,
        "source_image_id": str(source_image_id) if source_image_id is not None else "",
        "image_url": image_url,
    }

    response = requests.post(url, data=data)

    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")


if __name__ == "__main__":
    test_upload_image(file_path="../innovation.png", wallet_address="test address", name="test name", description="test description", prompt="test prompt", source_image_id=2)

    test_upload_image_with_url(image_url="https://media.discordapp.net/attachments/1288523822542094438/1293031830530035763/eureka0402_An_anime-style_profile_picture_of_a_character_with_w_2ab70016-2fae-47a1-ad42-1e0df079941b.png?ex=6705e53b&is=670493bb&hm=1543d3086a7d640c1fd47fe69b97d30bfc1e1d1fbb998f0d7b3cb587b7d83ba6&", wallet_address="test address", name="test name", description="test description", prompt="test prompt", source_image_id=2)
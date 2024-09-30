import requests

def test_read_images():
    url = "http://localhost:8000/images/"
    response = requests.get(url)

    print(f"Response status code: {response.status_code}")

    print(f"Response content: {response.text}")

    try:
        data = response.json()
        print(f"Response JSON: {data}")
    except ValueError:
        print("Failed to parse JSON from the response.")

    if isinstance(data, list):
        print("Data is a list.")
        for item in data:
            print(f"Item: {item}")
            if 'id' in item:
                print(f"Item ID: {item['id']}")
            if 'filename' in item:
                print(f"Item Filename: {item['filename']}")
            if 'watermark' in item:
                print(f"Item Watermark: {item['watermark']}")
    else:
        print("Data is not a list.")

if __name__ == "__main__":
    test_read_images()

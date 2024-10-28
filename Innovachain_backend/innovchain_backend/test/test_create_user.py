import requests

def test_create_user(wallet_address):
    url = "http://localhost:8000/users/"

    payload = {
        "wallet_address": wallet_address
    }

    response = requests.post(url, json=payload)

    data = response.json()
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:
        print(f"Created user with ID: {data['user_id']}")

if __name__ == "__main__":
    test_create_user("0x1234567890123456789012345678901234567890")
    
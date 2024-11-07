import requests

def test_get_user_by_id(user_id):
    url = f"http://localhost:8000/users/{user_id}"
    response = requests.get(url)

    print(f"Response status code: {response.status_code}")

    if response.status_code == 200:
        print(f"Response JSON: {response.json()}")
    else:
        print(f"Error message: {response.text}")

if __name__ == "__main__":
    test_get_user_by_id(2)

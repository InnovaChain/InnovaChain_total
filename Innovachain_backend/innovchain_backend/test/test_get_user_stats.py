import requests

def test_get_user_stats(user_id):
    url = f"http://localhost:8000/users/{user_id}/stats"
    response = requests.get(url)

    print(f"Response status code: {response.status_code}")
    try:
        data = response.json()
        if response.status_code == 200:
            print(f"User stats for user {user_id}: {data}")
        else:
            print(f"Failed to retrieve user stats: {data}")
    except requests.exceptions.JSONDecodeError:
        print("Failed to decode JSON response.")

if __name__ == "__main__":
    user_id = 2
    test_get_user_stats(user_id)

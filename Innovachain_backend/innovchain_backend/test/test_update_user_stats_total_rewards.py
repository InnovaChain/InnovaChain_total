import requests

def test_update_user_stats_total_rewards(user_id, total_rewards):
    url = f"http://localhost:8000/users/{user_id}/stats"
    payload = {
        "total_rewards": total_rewards
    }
    response = requests.post(url, json=payload)

    data = response.json()
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:
        print(f"User stats for user {user_id} updated successfully: {data}")
    else:
        print(f"Failed to update user stats: {data}")

if __name__ == "__main__":
    user_id = 1
    total_rewards = 50.0
    test_update_user_stats_total_rewards(user_id, total_rewards)

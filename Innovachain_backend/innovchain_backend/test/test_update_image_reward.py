import requests

def test_update_image_reward(image_id, reward=None):
    url = f"http://localhost:8000/images/{image_id}/update_reward"
    
    params = {
        "reward": reward
    }
    
    response = requests.post(url, params=params)

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    data = response.json()
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:
        print(f"Updated like count for image {image_id} is {data['reward']}")

if __name__ == "__main__":
    test_update_image_reward(5, 2)

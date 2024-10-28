import requests

def test_increment_like_count(image_id, user_id=None):
    url = f"http://localhost:8000/images/{image_id}/like/increment"
    
    params = {}

    if user_id is not None:
        params['user_id'] = user_id
    
    response = requests.post(url, params=params)

    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    data = response.json()
    print(f"Response status code: {response.status_code}")
    if response.status_code == 200:
        print(f"Updated like count for image {image_id} is {data['like_count']}")

if __name__ == "__main__":
    test_increment_like_count(5, 2)

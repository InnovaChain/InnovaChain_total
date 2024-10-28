# API Docs

## reference

http://localhost:8000/docs

## API List

### 获取图像信息

#### 描述
获取指定图像的信息。

#### URL
`http://localhost:8000/images/info/{image_id}`

#### 方法
`GET`

#### 请求参数
- `image_id` (必需): 图像的唯一标识符。
- `user_id` (可选): 用户的唯一标识符。

#### 示例请求
```bash
curl -X 'GET' \
  'http://localhost:8000/images/info/1?user_id=2' \
  -H 'accept: application/json'
```

#### 响应示例
```json
{
  "user_id": 2,
  "filename": "20241026234519_image.jpg",
  "prompt": "New prompt for the image",
  "watermark": "test address_20241026234519~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "description": "test description",
  "created_at": "2024-10-26T15:45:21",
  "reference_count": 3,
  "like_count": 4,
  "id": 1,
  "image_path": "data/20241026234519_image.jpg",
  "source_image_id": 2,
  "name": "test name",
  "is_active": false,
  "updated_at": "2024-10-28T13:10:11",
  "reward": 7475.4,
  "user": {
    "id": 2,
    "wallet_address": "test address"
  },
  "is_liked_by_user": true
}
```

### 获取图像信息列表

#### 描述
获取图像的信息列表。

#### URL
`http://localhost:8000/images/?skip=0&limit=100&user_id=1`

#### 方法
`GET`

#### 请求参数
- `skip` (可选): 分页跳过的记录数量，默认为0。
- `limit` (可选): 每页显示的记录数量，默认为100。
- `user_id` (可选): 用户的唯一标识符。


#### 示例请求
```bash
curl -X 'GET' \
  'http://localhost:8000/images/?skip=0&limit=100&user_id=1' \
  -H 'accept: application/json'
```

#### 响应示例
```json
[
  {
    "user_id": 2,
    "filename": "20241028211807_image.jpg",
    "prompt": "test prompt",
    "watermark": "test address_20241028211807~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    "description": "test description",
    "created_at": "2024-10-28T13:18:08",
    "reference_count": 0,
    "like_count": 0,
    "id": 7,
    "image_path": "data/20241028211807_image.jpg",
    "source_image_id": 2,
    "name": "test name",
    "is_active": true,
    "updated_at": "2024-10-28T13:18:08",
    "reward": 0,
    "user": {
      "id": 2,
      "wallet_address": "test address"
    },
    "is_liked_by_user": false
  }
]
```

### 用户点击 like

#### 描述
获取指定用户统计信息。

#### URL
`http://localhost:8000/images/1/like/increment?user_id=1`

#### 方法
`GET`

#### 请求参数
- `image_id` (必需): 图像的唯一标识符。
- `user_id` (必需): 用户的唯一标识符。
  
#### 示例请求
```bash
curl -X 'POST' \
  'http://localhost:8000/images/1/like/increment?user_id=1' \
  -H 'accept: application/json' \
  -d ''
```

#### 响应示例
```json
{
  "user_id": 2,
  "filename": "20241026234519_image.jpg",
  "prompt": "New prompt for the image",
  "watermark": "test address_20241026234519~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "description": "test description",
  "created_at": "2024-10-26T15:45:21",
  "reference_count": 3,
  "like_count": 5,
  "id": 1,
  "image_path": "data/20241026234519_image.jpg",
  "source_image_id": 2,
  "name": "test name",
  "is_active": false,
  "updated_at": "2024-10-28T14:14:02",
  "reward": 7475.4
}
```

### 获取用户统计信息

#### 描述
获取指定用户统计信息。

#### URL
`http://localhost:8000/users/2/stats`

#### 方法
`GET`

#### 请求参数

#### 示例请求
```bash
curl -X 'GET' \
  'http://localhost:8000/users/2/stats' \
  -H 'accept: application/json'
```

#### 响应示例
```json
{
  "total_references": 13,
  "total_rewards": 31946.09,
  "user_id": 2,
  "total_likes": 5
}
```

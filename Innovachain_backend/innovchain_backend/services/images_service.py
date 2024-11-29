from models.images_repository import ImageRepository

class ImageService:
    def __init__(self, repository: ImageRepository):
        self.repository = repository
    async def create_image(self, filename: str, watermark: str, user_id: int, image_path: str, prompt: str, source_image_id: int, name: str, description: str):
        return await self.repository.create(filename, watermark, user_id, image_path, prompt, source_image_id, name, description)

    async def get_image(self, image_id: int):
        return await self.repository.get(image_id)

    async def get_total_count(self):
        return await self.repository.get_total_count()

    async def get_images(self, skip: int = 0, limit: int = 100):
        return await self.repository.list(skip, limit)

    async def get_images_all(self):
        return await self.repository.list_all()

    async def update_image(self, image_id: int, prompt: str):
        return await self.repository.update(image_id, prompt)
    
    async def update_image_owner(self, image_id: int, user_id: str):
        return await self.repository.update_owner(image_id, user_id)

    async def delete_image(self, image_id: int):
        return await self.repository.delete(image_id)

    async def set_all_images_inactive(self):
        await self.repository.set_all_inactive()

    async def get_image_source_ids(self, image_id: int):
        return await self.repository.get_image_source_ids(image_id)

    async def increment_like_count(self, image_id: int):
        return await self.repository.increment_like_count(image_id)

    async def decrement_like_count(self, image_id: int):
        return await self.repository.decrement_like_count(image_id)

    async def increment_like_count_with_user(self, user_id: int, image_id: int):
        return await self.repository.increment_like_count_with_user(user_id, image_id)

    async def decrement_like_count_with_user(self, user_id: int, image_id: int):
        return await self.repository.decrement_like_count_with_user(user_id, image_id)

    async def increment_reference_count(self, image_id: int):
        return await self.repository.increment_reference_count(image_id)

    async def increment_reference_count_by(self, image_id: int, count: int):
        return await self.repository.increment_reference_count_by(image_id, count)

    async def update_image_reward(self, image_id: int, reward: float):
        return await self.repository.update_image_reward(image_id, reward)

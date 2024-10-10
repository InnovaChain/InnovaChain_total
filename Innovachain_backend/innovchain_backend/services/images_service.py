from models.images_repository import ImageRepository

class ImageService:
    def __init__(self, repository: ImageRepository):
        self.repository = repository
    async def create_image(self, filename: str, watermark: str, user_id: int, image_path: str, prompt: str, source_image_id: int, name: str, description: str):
        return await self.repository.create(filename, watermark, user_id, image_path, prompt, source_image_id, name, description)

    async def get_image(self, image_id: int):
        return await self.repository.get(image_id)

    async def get_images(self, skip: int = 0, limit: int = 100):
        return await self.repository.list(skip, limit)

    async def update_image(self, image_id: int, prompt: str):
        return await self.repository.update(image_id, prompt)

    async def delete_image(self, image_id: int):
        return await self.repository.delete(image_id)

    async def set_all_images_inactive(self):
        await self.repository.set_all_inactive()

    async def get_image_source_ids(self, image_id: int):
        return await self.repository.get_image_source_ids(image_id)

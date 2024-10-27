from models.likes_repository import LikesRepository

class ImageService:
    def __init__(self, repository: LikesRepository):
        self.repository = repository
    async def get_like(self, user_id: int, image_id: int):
        return await self.repository.get_like(user_id, image_id)

    async def create_like(self, user_id: int, image_id: int):
        return await self.repository.create_like(user_id, image_id)

    async def deactivate_like(self, user_id: int, image_id: int):
        return await self.repository.deactivate_like(user_id, image_id)


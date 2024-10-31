from typing import Optional
from models.model import User

from models.users_repository import UserRepository

class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    async def get_all_users(self):
        return await self.repository.get_all_users()

    async def get_user_by_id(self, user_id: int) -> Optional[User]:
        return await self.repository.get_user_by_id(user_id)

    async def get_user_images_by_id(self, user_id: int) -> Optional[User]:
        return await self.repository.get_user_images_by_id(user_id)

    async def get_user_by_wallet_address(self, wallet_address: str) -> Optional[User]:
        return await self.repository.get_user_by_wallet_address(wallet_address)

    async def create_user(self, wallet_address: str) -> User:
        return await self.repository.create_user(wallet_address)

    async def update_user(self, user: User, wallet_address: str) -> User:
        return await self.repository.update_user(user, wallet_address)

    async def delete_user(self, user: User):
        await self.repository.delete_user(user)

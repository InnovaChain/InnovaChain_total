from typing import Optional
from models.model import User

from models.user_stats_repository import UserStatsRepository

class UserStatsService:
    def __init__(self, repository: UserStatsRepository):
        self.repository = repository

    async def update_user_stats(self, user_id: int, likes: int, references: int):
        return await self.repository.update_user_stats(user_id, likes, references)

    async def get_user_stats(self, user_id: int) -> Optional[User]:
        return await self.repository.get_user_stats(user_id)

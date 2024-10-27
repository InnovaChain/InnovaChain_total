from typing import Optional
from models.model import User

from models.user_stats_repository import UserStatsRepository

class UserStatsService:
    def __init__(self, repository: UserStatsRepository):
        self.repository = repository

    async def update_user_stats_likes(self, user_id: int, change: int):
        return await self.repository.update_user_stats_likes(user_id, change)

    async def update_user_stats_references(self, user_id: int, change: int):
        return await self.repository.update_user_stats_references(user_id, change)

    async def update_user_stats_total_rewards(self, user_id: int, change: float):
        return await self.repository.update_user_stats_total_rewards(user_id, change)

    async def get_user_stats(self, user_id: int):
        return await self.repository.get_user_stats(user_id)

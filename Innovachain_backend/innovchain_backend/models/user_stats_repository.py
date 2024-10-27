from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func, Numeric
from .model import UserStats, Image

class UserStatsRepository:
    def __init__(self, db: Session):
        self.db = db

    async def get_user_stats(self, user_id: int):
        return self.db.query(UserStats).filter_by(user_id=user_id).first()
    
    def _get_or_create_user_stats(self, user_id: int):
        user_stats = self.db.query(UserStats).filter_by(user_id=user_id).first()
        if user_stats is None:
            total_references = (
                self.db.query(func.sum(Image.reference_count))
                .filter(Image.user_id == user_id)
                .scalar() or 0
            )
            total_rewards = (
                self.db.query(func.sum(Image.reward))
                .filter(Image.user_id == user_id)
                .scalar() or 0
            )
            user_stats = UserStats(
                user_id=user_id,
                total_likes=0,
                total_references=total_references,
                total_rewards=total_rewards
            )
            self.db.add(user_stats)
        return user_stats

    async def update_user_stats_likes(self, user_id: int, change: int):
        user_stats = self._get_or_create_user_stats(user_id)
        user_stats.total_likes += change
        return user_stats

    async def update_user_stats_references(self, user_id: int, change: int):
        user_stats = self._get_or_create_user_stats(user_id)
        user_stats.total_references += change
        return user_stats

    async def update_user_stats_total_rewards(self, user_id: int, change: float):
        user_stats = self._get_or_create_user_stats(user_id)
        user_stats.total_rewards += change
        return user_stats

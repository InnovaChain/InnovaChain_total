# from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .model import UserStats

class UserStatsRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def update_user_stats(self, user_id: int, likes: int, references: int):
        user_stats = self.db.query(UserStats).filter_by(user_id=user_id).first()
        if user_stats:
            user_stats.total_likes = likes
            user_stats.total_references = references
            try:
                self.db.commit()
                self.db.refresh(user_stats)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        else:
            raise ValueError("UserStats record not found for the given user_id")

    async def get_user_stats(self, user_id: int):
        return self.db.query(UserStats).filter_by(user_id=user_id).first()
    
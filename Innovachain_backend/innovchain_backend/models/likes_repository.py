from sqlalchemy.orm import Session
from .model import  Likes

class LikesRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_like(self, user_id: int, image_id: int):
        return self.db.query(Likes).filter(
            Likes.user_id == user_id,
            Likes.image_id == image_id,
            Likes.is_active == True
        ).first()

    def create_like(self, user_id: int, image_id: int):
        new_like = Likes(user_id=user_id, image_id=image_id, is_active=True)
        self.db.add(new_like)
        self.db.commit()
        self.db.refresh(new_like)
        return new_like

    def deactivate_like(self, user_id: int, image_id: int):
        existing_like = self.db.query(Likes).filter(
            Likes.user_id == user_id,
            Likes.image_id == image_id,
            Likes.is_active == True
        ).first()
        if existing_like:
            existing_like.is_active = False
            self.db.commit()
            return existing_like
        return None

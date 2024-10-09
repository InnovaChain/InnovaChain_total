# from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .model import Image, User

class ImageRepository:

    def __init__(self, db: Session):
        self.db = db

    async def create(self, filename: str, watermark: str, user_id: int, image_path: str, prompt: str, source_image_id: int, name: str, description: str):
        db_image = Image(
            user_id=user_id,
            filename=filename,
            image_path=image_path,
            prompt=prompt,
            source_image_id=source_image_id,
            watermark=watermark,
            name=name,
            description=description,
        )
        self.db.add(db_image)
        try:
            self.db.commit()
            self.db.refresh(db_image)
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e
        return db_image

    async def get(self, image_id: int):
        image_with_user = self.db.execute(
            self.db.query(Image, User).
            join(User, Image.user_id == User.id).
            filter(Image.id == image_id)
        )
        
        image, user = image_with_user.first()
        
        if image and user:
            image.user = user
        
        return image

    async def list(self, skip: int = 0, limit: int = 100):
        images_with_users = self.db.execute(
            self.db.query(Image, User).
            join(User, Image.user_id == User.id).
            filter(Image.is_active == True).
            offset(skip).
            limit(limit)
        )

        images = []
        for image, user in images_with_users.all():
            image.user = user
            images.append(image)
        
        return images

    async def update(self, image_id: int, prompt: str):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image:
            db_image.prompt = prompt
            try:
                self.db.commit()
                self.db.refresh(db_image)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        return db_image

    async def delete(self, image_id: int):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image:
            self.db.delete(db_image)
            try:
                self.db.commit()
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e

    async def set_all_inactive(self):
        try:
            self.db.query(Image).filter(Image.is_active == True).update({Image.is_active: False}, synchronize_session=False)
            self.db.commit()
        except SQLAlchemyError as e:
            self.db.rollback()
            raise e

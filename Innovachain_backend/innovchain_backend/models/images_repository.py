# from sqlalchemy.ext.asyncio import AsyncSession
from decimal import Decimal
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .model import Image, User
from .user_stats_repository import UserStatsRepository
from sqlalchemy import func, Numeric

class ImageRepository:

    def __init__(self, db: Session):
        self.db = db
        self.user_stats_repo = UserStatsRepository(db)

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

    async def list_all(self):
        images_with_users = self.db.execute(
            self.db.query(Image, User).
            join(User, Image.user_id == User.id).
            filter(Image.is_active == True)
        )

        images = []
        for image, user in images_with_users.all():
            image.user = user
            images.append(image)
        
        return images

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

    async def get_image_source_ids(self, image_id: int):
        source_ids = []
        current_id = image_id
        depth = 0

        while current_id and depth < 4:
            current_image = self.db.query(Image).filter(Image.id == current_id).first()
            if not current_image:
                break
            if depth > 0:
                source_ids.append(current_image.id)

            current_id = current_image.source_image_id
            depth += 1
        
        return list(reversed(source_ids))

    async def increment_like_count(self, image_id: int):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image:
            db_image.like_count += 1
            try:
                await self.user_stats_repo.update_user_stats_likes(db_image.user_id, 1)
                self.db.commit()
                self.db.refresh(db_image)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        return db_image

    async def decrement_like_count(self, image_id: int):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image and db_image.like_count > 0:
            db_image.like_count -= 1
            try:
                await self.user_stats_repo.update_user_stats_likes(db_image.user_id, -1)
                self.db.commit()
                self.db.refresh(db_image)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        return db_image

    async def increment_reference_count(self, image_id: int):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image:
            if db_image.reference_count == 0:
                reference_count = (
                    self.db.query(func.count(Image.id))
                    .filter(Image.source_image_id == db_image.id)
                    .scalar() or 0
                )
                db_image.reference_count = reference_count
            db_image.reference_count += 1
            try:
                await self.user_stats_repo.update_user_stats_references(db_image.user_id, 1)
                self.db.commit()
                self.db.refresh(db_image)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        return db_image

    async def increment_reference_count(self, image_id: int):
        db_image = self.db.query(Image).filter(Image.id == image_id).first()
        if db_image:
            if db_image.reference_count == 0:
                reference_count = (
                    self.db.query(func.count(Image.id))
                    .filter(Image.source_image_id == db_image.id)
                    .scalar() or 0
                )
                db_image.reference_count = reference_count
            db_image.reference_count += 1
            try:
                await self.user_stats_repo.update_user_stats_references(db_image.user_id, 1)
                self.db.commit()
                self.db.refresh(db_image)
            except SQLAlchemyError as e:
                self.db.rollback()
                raise e
        return db_image

    async def update_image_reward(self, image_id: int, reward: float):
        db_image = self.db.query(Image).filter(Image.id == image_id).one_or_none()
        if db_image:
            db_image.reward += Decimal(reward)

            await self.user_stats_repo.update_user_stats_total_rewards(db_image.user_id)
            
            self.db.commit()
            self.db.refresh(db_image)
            return db_image
        return None

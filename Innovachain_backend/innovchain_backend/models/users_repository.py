# from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .model import User

class UserRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def get_all_users(self):
        result = self.db_session.query(User).all()
        return result

    async def get_user_by_id(self, user_id: int):
        return self.db_session.get(User, user_id)

    async def get_user_by_wallet_address(self, wallet_address: str):
        result = self.db_session.query(User).filter(User.wallet_address == wallet_address).first()
        return result

    async def create_user(self, wallet_address: str):
        new_user = User(wallet_address=wallet_address)
        self.db_session.add(new_user)
        try:
            self.db_session.commit()
            self.db_session.refresh(new_user)
        except SQLAlchemyError as e:
            self.db_session.rollback()
            raise e
        return new_user

    async def update_user(self, user: User, wallet_address: str):
        user.wallet_address = wallet_address
        self.db_session.add(user)
        try:
            self.db_session.commit()
            self.db_session.refresh(user)
        except SQLAlchemyError as e:
            self.db_session.rollback()
            raise e
        return user

    async def delete_user(self, user: User):
        self.db_session.delete(user)
        try:
            self.db_session.commit()
        except SQLAlchemyError as e:
            self.db_session.rollback()
            raise e
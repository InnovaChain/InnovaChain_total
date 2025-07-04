from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey, func, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id')) 
    user = relationship("User", back_populates="images")
    filename = Column(String, index=True)
    image_path = Column(String)
    prompt = Column(String)
    source_image_id = Column(Integer)
    watermark = Column(String)
    name = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    reference_count = Column(Integer, default=0)
    like_count = Column(Integer, default=0)
    reward = Column(Numeric(precision=10, scale=2), default=0.0)

    likes = relationship("Likes", back_populates="image")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, index=True)
    images = relationship("Image", back_populates="user")
    likes = relationship("Likes", back_populates="user")

class UserStats(Base):
    __tablename__ = "user_stats"

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    total_likes = Column(Integer, default=0)
    total_references = Column(Integer, default=0)
    total_rewards = Column(Numeric(precision=10, scale=2), default=0.0)

class LastExecution(Base):
    __tablename__ = 'last_executions'

    id = Column(Integer, primary_key=True)
    last_execution_time = Column(DateTime, default=lambda: datetime(1970, 1, 1))

class Likes(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    image_id = Column(Integer, ForeignKey('images.id'), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="likes")
    image = relationship("Image", back_populates="likes")

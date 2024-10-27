import mimetypes
import os
from fastapi import FastAPI, Form, HTTPException, Response, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy import create_engine, select, func
from sqlalchemy.orm import Session
from models.model import Base, Image, UserStats
from models.images_repository import ImageRepository
from models.users_repository import UserRepository
from models.user_stats_repository import UserStatsRepository
from watermark_test import ImageWatermarkProcessor
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from services.images_service import ImageService
from services.users_service import UserService
from services.user_stats_service import UserStatsService
import requests
from typing import Optional
from utils.pagerank_calculator import PageRankCalculator
from pydantic import BaseModel
import schedule

app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

DATABASE_URL = "sqlite:///data/innovachain.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

class TotalRewardsUpdate(BaseModel):
    total_rewards: float = 0.0

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_service(db: Session = Depends(get_db)) -> UserService:
    repository = UserRepository(db)
    return UserService(repository)

async def get_user_stats_service(db: Session = Depends(get_db)) -> UserStatsService:
    repository = UserStatsRepository(db)
    return UserStatsService(repository)


async def get_image_service(db: Session = Depends(get_db)) -> ImageService:
    repository = ImageRepository(db)
    return ImageService(repository)


@app.post("/upload/")
async def upload_image(
    file: Optional[UploadFile] = File(None),
    wallet_address: str = Form(...),
    prompt: str = Form(""),
    name: str = Form(""),
    description: str = Form(""),
    source_image_id: Optional[int] = Form(None),
    image_url: Optional[str] = Form(None),
    us: UserService = Depends(get_user_service),
    imgs: ImageService = Depends(get_image_service)
):
    target_directory = "data/"
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    
    if image_url:
        response = requests.get(image_url, stream=True)
        if not response.ok:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch {image_url}")
        
        content_type = response.headers['content-type']
        if 'image' not in content_type:
            raise HTTPException(status_code=400, detail="The URL does not point to an image.")
        
        unique_filename = f"{timestamp}_{wallet_address}.png"
        target_filepath = os.path.join(target_directory, unique_filename)
        
        with open(target_filepath, 'wb') as f:
            for block in response.iter_content(1024):
                f.write(block)
    else:
        unique_filename = f"{timestamp}_{file.filename}"
        target_filepath = os.path.join(target_directory, unique_filename)

        os.makedirs(target_directory, exist_ok=True)
        contents = await file.read()
        with open(target_filepath, "wb") as f:
            f.write(contents)
    
    processor = ImageWatermarkProcessor(
        image_path=target_filepath,
        watermark_text = f"{wallet_address}_{timestamp}",
        output_image_path=target_filepath,
        embed_percentage=0.001
    )
    
    processor.encode_watermark()
    
    if wallet_address is None:
        raise HTTPException(status_code=400, detail="Missing required field 'wallet_address'")
    
    user = await us.get_user_by_wallet_address(wallet_address)
    
    if user is None:
        user = await us.create_user(wallet_address)
    
    db_image = await imgs.create_image(
        filename=unique_filename,
        watermark=processor.watermark_text,
        user_id=user.id,
        image_path=target_filepath,
        prompt=prompt,
        source_image_id=source_image_id,
        name=name,
        description=description
    )
    return {"filename": unique_filename, "image_id": db_image.id, "watermark": processor.watermark_text}


@app.get("/images/")
async def read_images(skip: int = 0, limit: int = 100, imgs: ImageService = Depends(get_image_service)):
    images = await imgs.get_images(skip=skip, limit=limit)
    return images


@app.get("/images/{image_id}")
async def read_image(image_id: int, imgs: ImageService = Depends(get_image_service)):
    image = await imgs.get_image(image_id)
    if not image:
        return Response(status_code=404)

    mime_type, _ = mimetypes.guess_type(image.image_path)
    
    with open(image.image_path, mode="rb") as file:
        content = file.read()

    return StreamingResponse(iter([content]), media_type=mime_type)


@app.get("/images/info/{image_id}")
async def read_image_info(image_id: int, imgs: ImageService = Depends(get_image_service)):
    image = await imgs.get_image(image_id)
    if not image:
        return Response(status_code=404)
    return image


@app.get("/images/source/{image_id}")
async def read_image_source_list(image_id: int, imgs: ImageService = Depends(get_image_service)):
    source_image_id_list = await imgs.get_image_source_ids(image_id)
    return {"source_image_id_list": source_image_id_list}


@app.post("/images/{image_id}/prompt")
async def update_image_prompt(image_id: int, prompt: str = Form(...), imgs: ImageService = Depends(get_image_service)):
    updated_image = await imgs.update_image(image_id, prompt)
    return updated_image


@app.delete("/images/{image_id}")
async def delete_image_endpoint(image_id: int, imgs: ImageService = Depends(get_image_service)):
    await imgs.delete_image(image_id)
    return {"message": "Image deleted"}


@app.post("/images/set-all-inactive")
async def set_all_images_inactive(imgs: ImageService = Depends(get_image_service)):
    print("Received request to set all images inactive.")
    await imgs.set_all_images_inactive()
    return {"message": "All images set to inactive"}


@app.get("/users/{user_id}")
async def get_user_by_id(user_id: int, us: UserService = Depends(get_user_service)):
    user = await us.get_user_by_id(user_id)
    print(user.id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_info = {
        "id": user.id,
        "wallet_address": user.wallet_address,
    }
    return user_info


@app.post("/images/{image_id}/like/increment")
async def increment_image_like_count(image_id: int, imgs: ImageService = Depends(get_image_service)):
    updated_image = await imgs.increment_like_count(image_id)
    if updated_image is None:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return updated_image


@app.post("/images/{image_id}/like/decrement")
async def decrement_image_like_count(image_id: int, imgs: ImageService = Depends(get_image_service)):
    updated_image = await imgs.decrement_like_count(image_id)
    if updated_image is None:
        raise HTTPException(status_code=404, detail="Image not found")

    return updated_image


@app.post("/images/{image_id}/reference/increment")
async def increment_image_reference_count(image_id: int, imgs: ImageService = Depends(get_image_service)):
    updated_image = await imgs.increment_reference_count(image_id)
    if updated_image is None:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return updated_image


@app.post("/users/{user_id}/stats")
async def update_user_stats_total_rewards(user_id: int, body: TotalRewardsUpdate, uss: UserStatsService = Depends(get_user_stats_service)):
    total_rewards = body.total_rewards
    result = await uss.update_user_stats_total_rewards(user_id, total_rewards)

    if result is None:
        raise HTTPException(status_code=404, detail="User stats not found")
    return result


@app.get("/users/{user_id}/stats")
async def get_user_stats(user_id: int, uss: UserStatsService = Depends(get_user_stats_service)):
    user_stats = await uss.get_user_stats(user_id)
    if user_stats is None:
        raise HTTPException(status_code=404, detail="User stats not found")
    return user_stats

import mimetypes
import os
from fastapi import FastAPI, Form, HTTPException, Response, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session
from models.model import Base, Image
from models.images_repository import ImageRepository
from models.users_repository import UserRepository
from watermark_test import ImageWatermarkProcessor
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from services.images_service import ImageService
from services.users_service import UserService

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


async def get_image_service(db: Session = Depends(get_db)) -> ImageService:
    repository = ImageRepository(db)
    return ImageService(repository)


@app.post("/upload/")
async def upload_image(
    file: UploadFile = File(...),
    wallet_address: str = Form(...),
    prompt: str = Form(""),
    name: str = Form(""),
    description: str = Form(""),
    source_image_id: int = Form(None),
    us: UserService = Depends(get_user_service),
    imgs: ImageService = Depends(get_image_service)
):
    target_directory = "test/"
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    unique_filename = f"{timestamp}_{file.filename}"
    target_filepath = os.path.join(target_directory, unique_filename)

    os.makedirs(target_directory, exist_ok=True)
    
    contents = await file.read()
    with open(target_filepath, "wb") as f:
        f.write(contents)
    
    processor = ImageWatermarkProcessor(
        image_path=target_filepath,
        watermark_text=str(datetime.now()),
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
        filename=file.filename,
        watermark=processor.watermark_text,
        user_id=user.id,
        image_path=target_filepath,
        prompt=prompt,
        source_image_id=source_image_id,
        name=name,
        description=description
    )
    return {"filename": file.filename, "watermark": processor.watermark_text}


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

    image_info = {
        "id": image.id,
        "user_id": image.user_id,
        "filename": image.filename,
        "prompt": image.prompt,
        "source_image_id": image.source_image_id,
        "watermark": image.watermark,
        "name": image.name,
        "description": image.description,
        "created_at": image.created_at,
        "updated_at": image.updated_at
    }

    return image_info


@app.put("/images/{image_id}")
async def update_image_endpoint(image_id: int, watermark: str, imgs: ImageService = Depends(get_image_service)):
    updated_image = await imgs.update_image(image_id, watermark)
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

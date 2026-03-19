from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv(Path(__file__).parent / "bd.env")  # looking for .env file in the same directory

client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db     = client[os.getenv("DB_NAME")]
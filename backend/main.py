from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient 
# import bcrypt

load_dotenv("api.env") 
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
app = FastAPI()
db = client.Users
collection = db.Students

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginData(BaseModel):
    username: str
    password: str

@app.get("/users")
async def get_users():
    users = []
    async for user in collection.find():
        user["_id"] = str(user["_id"])
        users.append(user)
    return users


@app.post("/login")
async def login(data: LoginData):
    username = await collection.find_one({"username": data.username})
    if not username:
        return {"status": "error", "message": "User not found"}

    if username["password"] == data.password:
        return {"status": "ok", "message": "Zalogowanie udane"}

    return {"status": "error", "message": "Nieprawidłowy login lub hasło"}


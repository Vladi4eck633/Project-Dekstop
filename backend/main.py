from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient 
from typing import Optional


load_dotenv("api.env") 
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
app = FastAPI()
db = client.university_db
users_collection = db.users


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
class ProfileUpdate(BaseModel):
    firstName: str
    lastName: str
    phone: str
    address: str
    avatar: Optional[str] = None
class PasswordChange(BaseModel):
    currentPassword: str
    newPassword: str


@app.get("/")
def root():
    return {"message": "API działa"}

 
@app.post("/login")
async def login(data: LoginData):
    try:
        
        user = await users_collection.find_one({"username": data.username})

        if user:
            
            if user.get("password") == data.password:
                return {
                    "status": "ok", 
                    "message": "Zalogowanie udane",
                    "user_full_name": user.get("full_name")
                }
            else:
                return {"status": "error", "message": "Nieprawidłowe hasło"}
        
        return {"status": "error", "message": "Użytkownik nie istnieje"}
    
    except Exception as e:
        return {"status": "error", "message": f"Błąd bazy danych: {str(e)}"}
    

@app.get("/grades/{username}")
async def get_grades(username: str):
    try:
        
        cursor = db.grades.find({"username": username})
        results = []
        
        async for doc in cursor:
            user_grades = doc.get("grades", [])
            
            avg = sum(user_grades) / len(user_grades) if user_grades else 0
            
            results.append({
                "id": str(doc["_id"]),
                "subject": doc.get("subject"),
                "teacher": doc.get("teacher"),
                "grades": user_grades,
                "average": round(avg, 2), 
                "status": doc.get("status")
            })
        return results
    except Exception as e:
        return {"status": "error", "message": str(e)}
    

@app.get("/timetable/{username}")
async def get_timetable(username: str):
    try:
        
        cursor = db.timetable.find({"username": username})
        results = []
        
        
        async for doc in cursor:
            results.append({
                "id": str(doc["_id"]),         
                "day": doc.get("day"),
                "time": doc.get("time"),
                "subject": doc.get("subject"),
                "room": doc.get("room"),
                "teacher": doc.get("teacher"),
                "type": doc.get("type")
            })
            
        
        return results
    except Exception as e:
        print(f"Ошибка: {e}")
        return {"status": "error", "message": str(e)}


@app.get("/attendance/{username}")
async def get_attendance(username: str):
    try:
        cursor = db.attendance.find({"username": username})
        results = []
        async for doc in cursor:
            attended = doc.get("attended", 0)
            total = doc.get("totalClasses", 1)
            percentage = (attended / total) * 100
            
            results.append({
                "id": str(doc["_id"]),
                "subject": doc.get("subject"),
                "totalClasses": total,
                "attended": attended,
                "excused": doc.get("excused", 0),
                "unexcused": doc.get("unexcused", 0),
                "percentage": round(percentage, 1)
            })
        return results
    except Exception as e:
        return {"status": "error", "message": str(e)}



@app.get("/profile/{username}")
async def get_profile(username: str):
    profile = await db.profiles.find_one({"username": username})
    if profile:
        profile["id"] = str(profile["_id"])
        del profile["_id"]
        return profile
    return {"error": "Profile not found"}


@app.post("/profile/{username}")
async def update_profile(username: str, data: ProfileUpdate):
    current = await db.profiles.find_one({"username": username})
    if not current:
        return {"error": "User not found"}

    update_dict = data.dict()

    
    if data.avatar and data.avatar != current.get("avatar"):
        if current.get("avatarChanged") is True:

            update_dict["avatar"] = current.get("avatar")
        else:
            
            update_dict["avatarChanged"] = True

    await db.profiles.update_one(
        {"username": username},
        {"$set": update_dict}
    )
    return {"status": "success"}


@app.post("/settings/change-password/{username}")
async def change_password(username: str, data: PasswordChange):
    user = await users_collection.find_one({"username": username})
    if not user:
        return JSONResponse(status_code=404, content={"error": "Użytkownik nie znaleziony"})

    if user.get("password") != data.currentPassword:
        return JSONResponse(status_code=400, content={"error": "Obecne hasło jest nieprawidłowe"})
    
    await users_collection.update_one(
        {"username": username}, 
        {"$set": {"password": data.newPassword}}
    )
    return {"message": "Hasło zostało zmienione"}


@app.post("/profile/{username}")
async def update_profile(username: str, data: ProfileUpdate):
    current = await db.profiles.find_one({"username": username})
    if not current:
        return {"error": "User not found"}

    update_dict = data.dict()

    
    if data.avatar and data.avatar != current.get("avatar"):
        if current.get("avatarChanged") is True:
            
            update_dict["avatar"] = current.get("avatar")
        else:
            
            update_dict["avatarChanged"] = True

    await db.profiles.update_one(
        {"username": username},
        {"$set": update_dict}
    )
    return {"status": "success"}



@app.post("/settings/change-password/{username}")
async def change_password(username: str, data: PasswordChange):
    
    user = await db.users.find_one({"username": username})
    
    if not user:
        return JSONResponse(status_code=404, content={"error": "Użytkownik nie znaleziony w systemie"})

    
    if user.get("password") != data.currentPassword:
        return JSONResponse(status_code=400, content={"error": "Obecne hasło jest nieprawidłowe"})
    
    
    await db.users.update_one(
        {"username": username}, 
        {"$set": {"password": data.newPassword}}
    )
    
    return {"message": "Hasło zostało zmienione в коллекции users"}@app.post("/settings/change-password/{username}")


@app.on_event("startup")
async def startup_event():
    try:
        await client.admin.command('ping')
        print("Sukces: Połączono z bazą MongoDB!")
    except Exception as e:
        print(f" Błąd połączenia z MongoDB: {e}")



@app.get("/users")
async def get_users():
    users = []
    async for user in users_collection.find():
        user["_id"] = str(user["_id"])
        users.append(user)
    return users




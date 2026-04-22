from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient 


load_dotenv("api.env") 
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)
app = FastAPI()
db = client.Users
users_collection = db.Students

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


@app.get("/")
def root():
    return {"message": "API działa"}

 

@app.post("/login")
async def login(data: LoginData):
    try:
        # Ищем пользователя в MongoDB по его email/username
        user = await users_collection.find_one({"username": data.username})

        if user:
            # Если пользователь найден, проверяем пароль
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
        # Находим ВСЕ документы, где совпадает username
        cursor = db.grades.find({"username": username})
        results = []
        
        async for doc in cursor:
            user_grades = doc.get("grades", [])
            # Считаем среднее: сумма оценок / количество
            avg = sum(user_grades) / len(user_grades) if user_grades else 0
            
            results.append({
                "id": str(doc["_id"]),
                "subject": doc.get("subject"),
                "teacher": doc.get("teacher"),
                "grades": user_grades,
                "average": round(avg, 2), # Округляем до 2 знаков
                "status": doc.get("status")
            })
        return results
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Проверка подключения при старте в терминале
@app.on_event("startup")
async def startup_event():
    try:
        await client.admin.command('ping')
        print("🚀 Успешно: База MongoDB подключена!")
    except Exception as e:
        print(f"❌ Ошибка подключения к MongoDB: {e}")



        

@app.get("/users")
async def get_users():
    users = []
    async for user in users_collection.find():
        user["_id"] = str(user["_id"])
        users.append(user)
    return users




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

# Твоя исправленная ссылка
MONGO_URL = "mongodb+srv://admin:fHTh3zDGkCt9jDlT@cluster0.tb8dyui.mongodb.net/?appName=Cluster0"

# Подключаемся к облаку
client = AsyncIOMotorClient(MONGO_URL)
db = client.university_db  # Выбираем нашу базу
users_collection = db.users  # Выбираем таблицу с юзерами

app = FastAPI()

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

# @app.post("/login")
# def login(data: LoginData):

#     if data.username == "test@gmail.com" and data.password == "1234":
#         return {"status": "ok", "message": "Zalogowanie udane"}

#     return {"status": "error", "message": "Nieprawidłowy login lub hasło"}




# @app.get("/grades/{user_id}")
# async def get_grades(user_id: str):
#     # Ищем все оценки в коллекции "grades", которые привязаны к конкретному user_id
#     grades_cursor = db.grades.find({"user_id": user_id})
#     grades = await grades_cursor.to_list(length=100)
    
#     # Конвертируем MongoDB _id (который объект) в строку (которую понимает React)
#     for grade in grades:
#         grade["id"] = str(grade.pop("_id"))
        
#     return grades
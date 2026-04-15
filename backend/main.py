from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
def login(data: LoginData):

    if data.username == "test@gmail.com" and data.password == "1234":
        return {"status": "ok", "message": "Zalogowanie udane"}

    return {"status": "error", "message": "Nieprawidłowy login lub hasło"}
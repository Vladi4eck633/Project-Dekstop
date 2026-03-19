import asyncio
from bd_konf import db

users = db["users"]

async def find_user():
    result = await db["users"].find_one({"name": "Alice"})
    print(result)

asyncio.run(find_user())
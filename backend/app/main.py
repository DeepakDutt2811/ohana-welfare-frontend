from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import CORS_ORIGINS
from app.routers import contacts, donations

app = FastAPI(title="Ohana Welfare Foundation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(donations.router)
app.include_router(contacts.router)


@app.get("/health")
def health():
    return {"status": "ok"}

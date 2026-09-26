from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.api import auth, incidents, ai

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Disaster Management Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(incidents.router)
app.include_router(ai.router)

@app.get("/")
def read_root():
    return {"status": "Backend Infrastructure Online", "version": "2.0.0"}

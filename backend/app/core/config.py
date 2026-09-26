from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Disaster Management API"
    DATABASE_URL: str = "postgresql://admin:password@localhost:5432/disaster_management"
    REDIS_URL: str = "redis://localhost:6379/0"
    RABBITMQ_URL: str = "amqp://admin:password@localhost:5672/"
    AI_CORE_URL: str = "http://localhost:8000"
    
    SECRET_KEY: str = "supersecret_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    class Config:
        env_file = ".env"

settings = Settings()

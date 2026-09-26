from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class IncidentCreate(BaseModel):
    id: str
    type: str
    description: str
    severity: str
    lat: float
    lng: float
    people_affected: int = 0
    is_simulated: bool = False

class IncidentUpdate(BaseModel):
    status: Optional[str]
    severity: Optional[str]
    description: Optional[str]

class IncidentResponse(IncidentCreate):
    status: str
    reported_at: datetime
    
    class Config:
        orm_mode = True

class UnitCreate(BaseModel):
    id: str
    type: str
    lat: float
    lng: float

class AssignmentCreate(BaseModel):
    incident_id: str
    unit_id: str

class AIClassifyRequest(BaseModel):
    id: str
    type: str
    type_code: int
    population: int
    damage_code: int
    weather_code: int
    required_unit: str

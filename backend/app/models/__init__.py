from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from geoalchemy2 import Geometry
from app.core.database import Base

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role_id = Column(Integer, ForeignKey("roles.id"))
    is_active = Column(Boolean, default=True)
    
    role = relationship("Role")

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String, primary_key=True, index=True)
    type = Column(String, index=True)
    description = Column(Text)
    severity = Column(String, index=True)
    status = Column(String, default="active")
    people_affected = Column(Integer, default=0)
    location = Column(Geometry('POINT', srid=4326))
    lat = Column(Float)
    lng = Column(Float)
    reported_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_simulated = Column(Boolean, default=False)

    assignments = relationship("ResourceAssignment", back_populates="incident")
    history = relationship("IncidentHistory", back_populates="incident")
    ai_recommendations = relationship("AIRecommendation", back_populates="incident")

class Unit(Base):
    __tablename__ = "units"
    id = Column(String, primary_key=True, index=True)
    type = Column(String)
    status = Column(String, default="available") # available, busy, maintenance
    location = Column(Geometry('POINT', srid=4326))
    lat = Column(Float)
    lng = Column(Float)

    assignments = relationship("ResourceAssignment", back_populates="unit")

class ResourceAssignment(Base):
    __tablename__ = "resource_assignments"
    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(String, ForeignKey("incidents.id"))
    unit_id = Column(String, ForeignKey("units.id"))
    assigned_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="en_route") # en_route, on_scene, resolved

    incident = relationship("Incident", back_populates="assignments")
    unit = relationship("Unit", back_populates="assignments")

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(String, ForeignKey("incidents.id"))
    agent_outputs = Column(JSON) # Store structured JSON output from 6 agents
    human_approved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    incident = relationship("Incident", back_populates="ai_recommendations")

class EmergencyAlert(Base):
    __tablename__ = "emergency_alerts"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(String)
    message = Column(Text)
    target_area = Column(String)
    status = Column(String, default="pending") # pending, broadcasted
    broadcasted_at = Column(DateTime(timezone=True), nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"))

class IncidentHistory(Base):
    __tablename__ = "incident_history"
    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(String, ForeignKey("incidents.id"))
    status_change = Column(String)
    notes = Column(Text)
    changed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    incident = relationship("Incident", back_populates="history")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String)
    details = Column(JSON)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

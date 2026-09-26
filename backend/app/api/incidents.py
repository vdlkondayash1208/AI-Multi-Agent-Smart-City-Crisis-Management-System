from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import Incident
from app.schemas import IncidentCreate, IncidentResponse, IncidentUpdate
from app.services.messaging import messenger

router = APIRouter(prefix="/api/incidents", tags=["incidents"])

@router.post("/", response_model=IncidentResponse)
def register_incident(incident: IncidentCreate, db: Session = Depends(get_db)):
    point = f'POINT({incident.lng} {incident.lat})'
    
    db_incident = Incident(
        id=incident.id,
        type=incident.type,
        description=incident.description,
        severity=incident.severity,
        lat=incident.lat,
        lng=incident.lng,
        location=point,
        people_affected=incident.people_affected,
        is_simulated=incident.is_simulated
    )
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    
    messenger.publish_event("incident.created", {
        "incident_id": db_incident.id,
        "incident_type": db_incident.type,
        "severity": db_incident.severity,
        "location": {"latitude": db_incident.lat, "longitude": db_incident.lng}
    })
    
    return db_incident

@router.get("/", response_model=list[IncidentResponse])
def get_incidents(db: Session = Depends(get_db)):
    return db.query(Incident).all()

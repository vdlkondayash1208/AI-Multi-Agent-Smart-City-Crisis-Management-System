import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.schemas import AIClassifyRequest
from app.models import AIRecommendation

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.post("/process-incident")
async def process_incident_with_ai(
    incident_req: AIClassifyRequest, 
    db: Session = Depends(get_db)
):
    """
    Connects to the AI Agents built by ram-shankar in ai_core service.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.AI_CORE_URL}/api/ai/process-incident", 
                json=incident_req.dict(), 
                timeout=15.0
            )
            response.raise_for_status()
            ai_data = response.json()
            
            # Store in DB
            recommendation = AIRecommendation(
                incident_id=ai_data["incident_id"],
                agent_outputs=ai_data
            )
            db.add(recommendation)
            db.commit()
            
            return ai_data
            
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"AI Service unavailable: {str(e)}")

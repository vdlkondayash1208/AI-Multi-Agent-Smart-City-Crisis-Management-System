from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from intelligent_agents import IntelligentOrchestrator

app = FastAPI(
    title="AI Core - Multi-Agent System",
    description="REST API endpoints for AI Multi-Agent orchestration."
)

# Initialize AI Orchestrator
ai_orchestrator = IntelligentOrchestrator()

class IncidentPayload(BaseModel):
    id: str
    type: str
    type_code: int
    population: int
    damage_code: int
    weather_code: int

@app.get("/")
def health_check():
    return {"status": "AI Multi-Agent Core is running"}

@app.post("/api/ai/process-incident")
def process_incident(incident: IncidentPayload):
    """
    Process an incoming incident through the full 6-agent AI pipeline.
    Agents: Detection -> Prediction -> Coordinator -> Resource Allocation -> Dispatch -> Human Approval -> Communication
    """
    try:
        # Run workflow
        result_state = ai_orchestrator.process(incident.dict())
        
        # Structure the response
        return {
            "incident_id": result_state["incident_data"]["id"],
            "detection": {
                "detected_type": result_state["detected_type"],
                "severity": result_state["severity"],
                "is_duplicate": result_state["is_duplicate"]
            },
            "prediction": {
                "risk_assessment": result_state["risk_assessment"]
            },
            "coordinator": {
                "plan": result_state["coordinator_plan"]
            },
            "resource_allocation": {
                "resources": result_state["allocated_resources"]
            },
            "dispatch": {
                "plan": result_state["dispatch_plan"]
            },
            "communication": {
                "drafts": result_state["communication_drafts"]
            },
            "safety_note": "Do not automatically dispatch emergency units. Human approval required."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

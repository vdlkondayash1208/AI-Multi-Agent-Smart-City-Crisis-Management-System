# AI Multi-Agent Smart City Crisis Management System

This directory contains the AI Core module orchestrating six specialized AI agents using LangGraph and FastAPI.

## Agents Implemented
1. **Detection Agent**: Classifies incidents and identifies severity using Scikit-learn models.
2. **Prediction Agent**: Estimates incident risk using Bayesian Networks.
3. **Coordinator Agent**: Consolidates predictions into strategic response plans.
4. **Resource Allocation Agent**: Analyzes capacity and recommends optimal resources.
5. **Dispatch Agent**: Tracks unit status and prepares dispatch sequences.
6. **Communication Agent**: Drafts emergency alerts and responder instructions.

## AI Workflow
Incident Report -> Detection -> Prediction -> Coordinator -> Allocation -> Dispatch -> Human Approval -> Communication

## Setup Instructions

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run tests:
   ```bash
   python -m unittest discover tests
   ```

3. Run API server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## REST API Integration
Endpoint: `POST /api/ai/process-incident`
Input format: JSON structured dictionary representing incident details.
Output format: JSON response detailing outputs from all 6 agents.

### Example Input
```json
{
    "id": "INC-001",
    "type": "Fire",
    "type_code": 1,
    "population": 500,
    "damage_code": 1,
    "weather_code": 1
}
```

### Safety Note
All AI decisions, specifically in the Dispatch Agent, halt at `pending_human_approval` as per safety requirements. Automated dispatch is strictly disabled. Predictions are flagged with appropriate disclaimers.

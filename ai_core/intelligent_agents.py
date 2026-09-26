import os
import json
from typing import Dict, TypedDict, Any
from langgraph.graph import StateGraph, END

# Import the existing models
from learning_agents import SeverityClassifier
from bayesian_network import RiskAssessmentBN

class AgentState(TypedDict):
    incident_data: Dict[str, Any]
    detected_type: str
    severity: str
    is_duplicate: bool
    risk_assessment: Dict[str, Any]
    coordinator_plan: str
    allocated_resources: list
    dispatch_plan: Dict[str, Any]
    human_approved: bool
    communication_drafts: Dict[str, str]

class IntelligentOrchestrator:
    """
    Intelligent Agents for Emergency Management using LangGraph.
    Implements 6 AI Agents as specified.
    """
    def __init__(self):
        self.classifier = SeverityClassifier()
        dataset = self.classifier.generate_simulated_dataset(100)
        self.classifier.train(dataset)
        self.bn_model = RiskAssessmentBN()
        self.workflow = StateGraph(AgentState)
        self._build_graph()

    def _build_graph(self):
        # 1. Detection Agent
        self.workflow.add_node("detection", self.detection_agent)
        # 2. Prediction Agent
        self.workflow.add_node("prediction", self.prediction_agent)
        # 3. Coordinator Agent
        self.workflow.add_node("coordinator", self.coordinator_agent)
        # 4. Resource Allocation Agent
        self.workflow.add_node("allocation", self.resource_allocation_agent)
        # 5. Dispatch Agent
        self.workflow.add_node("dispatch", self.dispatch_agent)
        # Human Approval (Mock)
        self.workflow.add_node("human_approval", self.human_approval_mock)
        # 6. Communication Agent
        self.workflow.add_node("communication", self.communication_agent)

        self.workflow.set_entry_point("detection")
        self.workflow.add_edge("detection", "prediction")
        self.workflow.add_edge("prediction", "coordinator")
        self.workflow.add_edge("coordinator", "allocation")
        self.workflow.add_edge("allocation", "dispatch")
        self.workflow.add_edge("dispatch", "human_approval")
        self.workflow.add_edge("human_approval", "communication")
        self.workflow.add_edge("communication", END)

        self.app = self.workflow.compile()

    def detection_agent(self, state: AgentState):
        """Analyze incoming reports, classify type, identify severity, detect duplicates."""
        incident = state["incident_data"]
        # Mock duplicate detection
        state["is_duplicate"] = False
        features = {
            'incident_type': incident.get('type_code', 0),
            'affected_population': incident.get('population', 100),
            'structural_damage': incident.get('damage_code', 0),
            'weather_condition': incident.get('weather_code', 0)
        }
        pred = self.classifier.predict(features)
        state["detected_type"] = incident.get("type", "Unknown")
        state["severity"] = pred["predicted_severity"]
        return state

    def prediction_agent(self, state: AgentState):
        """Estimate incident risk and analyze historical data."""
        incident = state["incident_data"]
        evidence = {
            'Weather': 1 if incident.get('weather_code', 0) > 0 else 0,
            'DamageReported': 1 if incident.get('damage_code', 0) > 0 else 0,
            'IncidentType': incident.get('type_code', 0)
        }
        assessment = self.bn_model.assess_risk(evidence)
        state["risk_assessment"] = assessment
        return state

    def coordinator_agent(self, state: AgentState):
        """Coordinate outputs, consolidate recommendations, generate plan."""
        sev = state["severity"]
        risk = state["risk_assessment"].get("estimated_risk_level", "Unknown")
        
        plan = f"Strategic Plan: Respond to {sev} severity incident with {risk} risk projection. "
        if sev == 'High' or risk == 'High':
            plan += "Escalate to regional command immediately."
            
        state["coordinator_plan"] = plan
        return state

    def resource_allocation_agent(self, state: AgentState):
        """Recommend suitable resources considering severity."""
        sev = state["severity"]
        if sev == "High":
            state["allocated_resources"] = [{"type": "FireEngine", "qty": 3}, {"type": "Ambulance", "qty": 2}]
        elif sev == "Medium":
            state["allocated_resources"] = [{"type": "FireEngine", "qty": 1}, {"type": "Ambulance", "qty": 1}]
        else:
            state["allocated_resources"] = [{"type": "Police", "qty": 1}]
        return state

    def dispatch_agent(self, state: AgentState):
        """Recommend units, generate dispatch plans (requires human approval)."""
        resources = state["allocated_resources"]
        units = [f"Unit-{r['type']}-{i+1}" for r in resources for i in range(r['qty'])]
        state["dispatch_plan"] = {
            "status": "pending_human_approval",
            "recommended_units": units,
            "note": "Awaiting human authorization before dispatch."
        }
        return state

    def human_approval_mock(self, state: AgentState):
        """In a real system, execution pauses here. We mock approval for demonstration."""
        state["human_approved"] = True
        return state

    def communication_agent(self, state: AgentState):
        """Generate emergency alert drafts and responder instructions."""
        type_ = state["detected_type"]
        sev = state["severity"]
        state["communication_drafts"] = {
            "public_alert": f"EMERGENCY ALERT: {sev} severity {type_} detected. Please stay clear of the affected area.",
            "responder_instructions": f"Proceed to location. Follow plan: {state['coordinator_plan']}"
        }
        return state

    def process(self, incident_data):
        """Process incident through the multi-agent workflow."""
        initial_state = {
            "incident_data": incident_data,
            "detected_type": "",
            "severity": "",
            "is_duplicate": False,
            "risk_assessment": {},
            "coordinator_plan": "",
            "allocated_resources": [],
            "dispatch_plan": {},
            "human_approved": False,
            "communication_drafts": {}
        }
        return self.app.invoke(initial_state)

if __name__ == "__main__":
    orchestrator = IntelligentOrchestrator()
    sample_incident = {
        "id": "INC-001",
        "type": "Fire",
        "type_code": 1,
        "population": 500,
        "damage_code": 1,
        "weather_code": 1
    }
    result = orchestrator.process(sample_incident)
    print(json.dumps(result, indent=2))

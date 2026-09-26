import unittest
from intelligent_agents import IntelligentOrchestrator

class TestIntelligentAgents(unittest.TestCase):
    def setUp(self):
        self.orchestrator = IntelligentOrchestrator()
        self.sample_incident = {
            "id": "INC-TEST",
            "type": "Fire",
            "type_code": 1,
            "population": 800,
            "damage_code": 2,
            "weather_code": 1
        }

    def test_full_agent_workflow(self):
        result = self.orchestrator.process(self.sample_incident)
        
        # Test 1. Detection Agent
        self.assertIn("severity", result)
        self.assertFalse(result["is_duplicate"])
        self.assertEqual(result["detected_type"], "Fire")
        
        # Test 2. Prediction Agent
        self.assertIn("risk_assessment", result)
        self.assertIn("estimated_risk_level", result["risk_assessment"])
        
        # Test 3. Coordinator Agent
        self.assertIn("coordinator_plan", result)
        self.assertTrue(len(result["coordinator_plan"]) > 0)
        
        # Test 4. Resource Allocation Agent
        self.assertIn("allocated_resources", result)
        self.assertTrue(isinstance(result["allocated_resources"], list))
        
        # Test 5. Dispatch Agent
        self.assertIn("dispatch_plan", result)
        self.assertEqual(result["dispatch_plan"]["status"], "pending_human_approval")
        
        # Test 6. Communication Agent
        self.assertIn("communication_drafts", result)
        self.assertIn("public_alert", result["communication_drafts"])

if __name__ == '__main__':
    unittest.main()

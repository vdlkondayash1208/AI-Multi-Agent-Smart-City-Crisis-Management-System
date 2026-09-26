import pandas as pd
from pgmpy.models import BayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

class RiskAssessmentBN:
    """
    Uncertainty and Bayesian Networks for Incident Risk Assessment
    Syllabus Module VIII
    """
    def __init__(self):
        self.model = BayesianNetwork([
            ('Weather', 'RiskLevel'),
            ('DamageReported', 'RiskLevel'),
            ('IncidentType', 'RiskLevel')
        ])
        
        self._define_cpds()
        self.inference = VariableElimination(self.model)

    def _define_cpds(self):
        # Weather: 0=Clear, 1=Storm
        cpd_weather = TabularCPD(variable='Weather', variable_card=2, values=[[0.8], [0.2]])
        
        # DamageReported: 0=Low, 1=High
        cpd_damage = TabularCPD(variable='DamageReported', variable_card=2, values=[[0.7], [0.3]])
        
        # IncidentType: 0=Medical, 1=Fire, 2=Flood
        cpd_incident = TabularCPD(variable='IncidentType', variable_card=3, values=[[0.5], [0.3], [0.2]])
        
        # RiskLevel: 0=Low, 1=Medium, 2=High
        # Depends on Weather, DamageReported, IncidentType
        # Shape must be (3, 2 * 2 * 3) = (3, 12)
        
        # Simplified probability matrix for demonstration
        # Weather (2), Damage (2), Incident (3)
        # We need 12 columns
        # W=0, D=0, I=0,1,2 | W=0, D=1, I=0,1,2 | W=1, D=0, I=0,1,2 | W=1, D=1, I=0,1,2
        
        cpd_risk = TabularCPD(
            variable='RiskLevel', 
            variable_card=3, 
            evidence=['Weather', 'DamageReported', 'IncidentType'],
            evidence_card=[2, 2, 3],
            values=[
                # Low Risk
                [0.8, 0.5, 0.4, 0.4, 0.2, 0.1, 0.5, 0.3, 0.2, 0.2, 0.1, 0.05],
                # Medium Risk
                [0.15, 0.4, 0.4, 0.4, 0.5, 0.4, 0.4, 0.5, 0.5, 0.4, 0.4, 0.15],
                # High Risk
                [0.05, 0.1, 0.2, 0.2, 0.3, 0.5, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8]
            ]
        )
        
        self.model.add_cpds(cpd_weather, cpd_damage, cpd_incident, cpd_risk)
        assert self.model.check_model()

    def assess_risk(self, evidence):
        """
        evidence dict mapping variables to observed states.
        e.g., {'Weather': 1, 'IncidentType': 1}
        Returns probability distribution for RiskLevel.
        """
        # Add safety check - we do not output this as absolute fact
        result = self.inference.query(variables=['RiskLevel'], evidence=evidence)
        
        probs = result.values
        estimated_level = result.state_names['RiskLevel'][probs.argmax()] if hasattr(result, 'state_names') else probs.argmax()
        
        labels = {0: 'Low', 1: 'Medium', 2: 'High'}
        
        return {
            "estimated_risk_level": labels.get(estimated_level, estimated_level),
            "probabilities": {labels[i]: p for i, p in enumerate(probs)},
            "disclaimer": "AI probabilistic assessment. Must be reviewed by a human."
        }


if __name__ == "__main__":
    bn = RiskAssessmentBN()
    
    # Observe Storm (1), Fire (1)
    evidence = {'Weather': 1, 'IncidentType': 1}
    assessment = bn.assess_risk(evidence)
    
    print(f"Evidence: {evidence}")
    print(f"Risk Assessment: {assessment}")

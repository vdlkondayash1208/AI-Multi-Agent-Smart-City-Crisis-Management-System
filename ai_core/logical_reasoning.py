class LogicalReasoningEngine:
    """
    Rule-based emergency assessment engine.
    Syllabus Module V
    """
    def __init__(self):
        self.rules = []
        self.facts = set()

    def add_rule(self, conditions, conclusion):
        """
        Add a logical implication rule.
        Conditions is a list of facts (AND logic). Conclusion is a fact.
        """
        self.rules.append({'conditions': set(conditions), 'conclusion': conclusion})

    def add_fact(self, fact):
        self.facts.add(fact)

    def forward_chaining(self):
        """
        Forward Chaining algorithm.
        Derive all possible conclusions from the current facts.
        """
        new_facts_derived = True
        derived_facts = set()
        
        while new_facts_derived:
            new_facts_derived = False
            for rule in self.rules:
                if rule['conclusion'] not in self.facts and rule['conclusion'] not in derived_facts:
                    # If all conditions are met
                    if rule['conditions'].issubset(self.facts.union(derived_facts)):
                        derived_facts.add(rule['conclusion'])
                        new_facts_derived = True
        
        self.facts.update(derived_facts)
        return derived_facts

    def backward_chaining(self, goal, visited=None):
        """
        Backward Chaining algorithm.
        Determine if a goal can be proven given the current rules and facts.
        """
        if visited is None:
            visited = set()
            
        if goal in self.facts:
            return True
            
        if goal in visited:
            return False # Avoid cycles
            
        visited.add(goal)
        
        for rule in self.rules:
            if rule['conclusion'] == goal:
                # Check if we can prove all conditions of this rule
                all_conditions_met = True
                for condition in rule['conditions']:
                    if not self.backward_chaining(condition, visited.copy()):
                        all_conditions_met = False
                        break
                if all_conditions_met:
                    return True
        return False


if __name__ == "__main__":
    engine = LogicalReasoningEngine()
    
    # Example Rules
    engine.add_rule(['incident_type:fire', 'people_trapped:true'], 'action:recommend_fire_rescue')
    engine.add_rule(['incident_type:flood', 'water_level:high'], 'action:recommend_evacuation')
    engine.add_rule(['action:recommend_evacuation', 'population:dense'], 'action:dispatch_multi_units')
    
    # Add initial facts
    engine.add_fact('incident_type:fire')
    engine.add_fact('people_trapped:true')
    
    print("Initial Facts:", engine.facts)
    derived = engine.forward_chaining()
    print("Derived via Forward Chaining:", derived)
    
    # Test Backward Chaining
    engine.add_fact('incident_type:flood')
    engine.add_fact('water_level:high')
    engine.add_fact('population:dense')
    
    print("Is multi-unit dispatch recommended?", engine.backward_chaining('action:dispatch_multi_units'))

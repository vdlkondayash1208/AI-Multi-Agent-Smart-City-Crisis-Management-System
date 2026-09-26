class Action:
    """Action representation for Planning"""
    def __init__(self, name, preconditions, effects):
        self.name = name
        self.preconditions = set(preconditions)
        self.effects = set(effects)

class PlanningEngine:
    """
    State Space Planning Engine
    Syllabus Module VII
    """
    def __init__(self):
        self.actions = self._define_actions()

    def _define_actions(self):
        return [
            Action("AssessSeverity", 
                   preconditions=["incident_received"], 
                   effects=["severity_assessed"]),
                   
            Action("IdentifyResources", 
                   preconditions=["severity_assessed"], 
                   effects=["resources_identified"]),
                   
            Action("RecommendAssignment", 
                   preconditions=["resources_identified"], 
                   effects=["assignment_recommended"]),
                   
            Action("AwaitHumanApproval", 
                   preconditions=["assignment_recommended"], 
                   effects=["human_approved"]),
                   
            Action("UpdateResponseStatus", 
                   preconditions=["human_approved"], 
                   effects=["status_updated", "response_active"])
        ]

    def generate_plan(self, initial_state, goal_state):
        """
        Simple Forward State-Space Search for planning.
        Finds a sequence of actions from initial state to goal state.
        """
        queue = [(set(initial_state), [])]
        visited = []

        while queue:
            current_state, plan = queue.pop(0)
            
            # Check if goal is met
            if set(goal_state).issubset(current_state):
                return plan

            if current_state in visited:
                continue
            visited.append(current_state)

            for action in self.actions:
                # If preconditions are met
                if action.preconditions.issubset(current_state):
                    new_state = current_state.copy()
                    new_state.update(action.effects)
                    # Simple negative effects handling could be added here (e.g., pop from set if prefixed with NOT_)
                    
                    queue.append((new_state, plan + [action.name]))
                    
        return None


if __name__ == "__main__":
    planner = PlanningEngine()
    
    initial = ["incident_received"]
    goal = ["response_active"]
    
    plan = planner.generate_plan(initial, goal)
    print("Emergency Response Plan:")
    for step, action in enumerate(plan):
        print(f"{step + 1}. {action}")

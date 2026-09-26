class EmergencyCSP:
    """
    Constraint Satisfaction Problem for Resource Allocation
    Syllabus Module IV
    """
    def __init__(self, units, incidents, constraints):
        self.units = units          # Domains
        self.incidents = incidents  # Variables
        self.constraints = constraints
        self.assignment = {}

    def is_consistent(self, incident, unit, assignment):
        """Check if assigning unit to incident violates any constraints."""
        # 1. Capacity / Type Constraint
        req_type = self.constraints.get(incident, {}).get('required_type')
        if req_type and unit['type'] != req_type:
            return False
            
        # 2. Availability Constraint
        if unit['status'] != 'available':
            return False
            
        # 3. Uniqueness Constraint (Unit can't be assigned to multiple incidents at once in this simple model)
        if unit['id'] in [u['id'] for u in assignment.values()]:
            return False
            
        return True

    def backtrack_search(self, assignment={}):
        """Backtracking search to find valid resource allocation."""
        if len(assignment) == len(self.incidents):
            return assignment

        unassigned = [inc for inc in self.incidents if inc not in assignment]
        incident = unassigned[0] # Select unassigned variable

        for unit in self.units:
            if self.is_consistent(incident, unit, assignment):
                assignment[incident] = unit
                result = self.backtrack_search(assignment)
                if result:
                    return result
                del assignment[incident] # backtrack
                
        return None

class MinimaxDecision:
    """
    Game-tree search with Alpha-Beta Pruning for decision making under adversarial conditions (e.g. disaster spreading)
    Syllabus Module IV
    """
    @staticmethod
    def minimax(state, depth, is_maximizing, alpha, beta, eval_func, generate_children):
        if depth == 0 or state.is_terminal():
            return eval_func(state), state

        best_state = None
        if is_maximizing:
            max_eval = float('-inf')
            for child in generate_children(state):
                eval, _ = MinimaxDecision.minimax(child, depth - 1, False, alpha, beta, eval_func, generate_children)
                if eval > max_eval:
                    max_eval = eval
                    best_state = child
                alpha = max(alpha, eval)
                if beta <= alpha:
                    break
            return max_eval, best_state
        else:
            min_eval = float('inf')
            for child in generate_children(state):
                eval, _ = MinimaxDecision.minimax(child, depth - 1, True, alpha, beta, eval_func, generate_children)
                if eval < min_eval:
                    min_eval = eval
                    best_state = child
                beta = min(beta, eval)
                if beta <= alpha:
                    break
            return min_eval, best_state


if __name__ == "__main__":
    units = [
        {'id': 'U1', 'type': 'Fire', 'status': 'available'},
        {'id': 'U2', 'type': 'Medical', 'status': 'available'},
        {'id': 'U3', 'type': 'Police', 'status': 'busy'}
    ]
    incidents = ['INC1', 'INC2']
    constraints = {
        'INC1': {'required_type': 'Fire'},
        'INC2': {'required_type': 'Medical'}
    }
    
    csp = EmergencyCSP(units, incidents, constraints)
    assignment = csp.backtrack_search()
    print("CSP Assignment:", {inc: u['id'] for inc, u in assignment.items()} if assignment else "No solution")

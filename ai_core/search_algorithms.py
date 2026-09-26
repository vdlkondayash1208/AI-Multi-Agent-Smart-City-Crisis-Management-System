import networkx as nx
import heapq
from collections import deque

class SearchAlgorithms:
    """
    Implements Uninformed and Informed Search Algorithms for Route Planning in Emergency Scenarios.
    Syllabus Modules II & III.
    """
    def __init__(self, graph_data=None):
        self.graph = nx.Graph()
        if graph_data:
            for u, v, data in graph_data:
                self.graph.add_edge(u, v, weight=data.get('weight', 1))

    # ==========================================
    # MODULE 2: UNINFORMED SEARCH
    # ==========================================
    
    def breadth_first_search(self, start, goal):
        """Blind Search: BFS to find shortest path in terms of number of edges."""
        if start not in self.graph or goal not in self.graph: return None
        queue = deque([[start]])
        visited = set([start])
        while queue:
            path = queue.popleft()
            node = path[-1]
            if node == goal: return path
            for neighbor in self.graph.neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_path = list(path)
                    new_path.append(neighbor)
                    queue.append(new_path)
        return None

    def uniform_cost_search(self, start, goal):
        """UCS to find shortest path by cost/weight."""
        if start not in self.graph or goal not in self.graph: return None
        pq = [(0, [start])]
        visited = set()
        while pq:
            cost, path = heapq.heappop(pq)
            node = path[-1]
            if node == goal: return path, cost
            if node not in visited:
                visited.add(node)
                for neighbor in self.graph.neighbors(node):
                    if neighbor not in visited:
                        edge_weight = self.graph[node][neighbor]['weight']
                        heapq.heappush(pq, (cost + edge_weight, path + [neighbor]))
        return None, float('inf')

    def depth_limited_search(self, start, goal, limit):
        """DLS implementation."""
        def recursive_dls(node, goal, limit, path):
            if node == goal: return path
            if limit == 0: return 'cutoff'
            cutoff_occurred = False
            for neighbor in self.graph.neighbors(node):
                if neighbor not in path: # Avoid cycles
                    result = recursive_dls(neighbor, goal, limit - 1, path + [neighbor])
                    if result == 'cutoff':
                        cutoff_occurred = True
                    elif result is not None:
                        return result
            return 'cutoff' if cutoff_occurred else None
        
        if start not in self.graph: return None
        return recursive_dls(start, goal, limit, [start])

    def iterative_deepening_dfs(self, start, goal, max_depth=100):
        """IDDFS implementation."""
        for depth in range(max_depth):
            result = self.depth_limited_search(start, goal, depth)
            if result != 'cutoff' and result is not None:
                return result
        return None

    # ==========================================
    # MODULE 3: INFORMED SEARCH
    # ==========================================
    
    def heuristic(self, node, goal):
        """Simple heuristic for A* / Best-First. In real scenario, use Haversine distance."""
        # Using a dummy heuristic for graph traversal without coordinates
        return 1

    def best_first_search(self, start, goal):
        """Greedy Best-First Search."""
        if start not in self.graph or goal not in self.graph: return None
        pq = [(self.heuristic(start, goal), [start])]
        visited = set([start])
        
        while pq:
            _, path = heapq.heappop(pq)
            node = path[-1]
            if node == goal: return path
            
            for neighbor in self.graph.neighbors(node):
                if neighbor not in visited:
                    visited.add(neighbor)
                    heapq.heappush(pq, (self.heuristic(neighbor, goal), path + [neighbor]))
        return None

    def a_star_search(self, start, goal):
        """A* Search implementation."""
        if start not in self.graph or goal not in self.graph: return None
        # Priority queue stores (f_score, g_score, path)
        pq = [(self.heuristic(start, goal), 0, [start])]
        visited = {} # Maps node to its best g_score
        
        while pq:
            f, g, path = heapq.heappop(pq)
            node = path[-1]
            
            if node == goal: return path, g
            
            if node in visited and visited[node] <= g:
                continue
            visited[node] = g
            
            for neighbor in self.graph.neighbors(node):
                weight = self.graph[node][neighbor]['weight']
                new_g = g + weight
                if neighbor not in visited or new_g < visited[neighbor]:
                    new_f = new_g + self.heuristic(neighbor, goal)
                    heapq.heappush(pq, (new_f, new_g, path + [neighbor]))
        return None, float('inf')


if __name__ == "__main__":
    # Test Graph
    edges = [
        ('FireStation', 'Downtown', {'weight': 5}),
        ('FireStation', 'SuburbA', {'weight': 8}),
        ('Downtown', 'Industrial', {'weight': 4}),
        ('SuburbA', 'Industrial', {'weight': 2}),
        ('Industrial', 'IncidentSite', {'weight': 3}),
        ('Downtown', 'IncidentSite', {'weight': 10})
    ]
    sa = SearchAlgorithms(edges)
    path, cost = sa.uniform_cost_search('FireStation', 'IncidentSite')
    print(f"UCS Path: {path}, Cost: {cost}")
    path, cost = sa.a_star_search('FireStation', 'IncidentSite')
    print(f"A* Path: {path}, Cost: {cost}")

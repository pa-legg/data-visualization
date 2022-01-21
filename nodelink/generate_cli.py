# generate graph without plotting

import json
import numpy as np
import networkx as nx

g = nx.karate_club_graph()

nodes = [{'name': str(i), 'club': g.nodes[i]['club']} for i in g.nodes()]
links = [{'source': u[0], 'target': u[1]} for u in g.edges()]
with open('graph.json', 'w') as f:
    json.dump({'nodes': nodes, 'links': links}, f, indent=4,)
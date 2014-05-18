function Dijkstra(graph, srcNode, dstNode) {
    this.graph = graph;
    this.srcNode = srcNode;
    this.dstNode = dstNode;
    this.dist = [];
    this.dist[srcNode] = 0; 
    this.previous = [];
    this.PQ = new MinHeap();

    for (var v = 1; v < graph.length; ++v) {
        if (v != srcNode) {
            this.dist[v] = Number.POSITIVE_INFINITY;
        }
        this.PQ.insert(v, this.dist[v]);
    }

    this.visited = {};
    this.u = undefined;
    this.v = undefined;
    this.complete = false;
}

Dijkstra.prototype = {
    constructor: Dijkstra,
    step: function() {
        //
        // Perform a single iteration of the inner loop of Dijkstra's algorithm.
        // Returns true if the algorithm has completed, false otherwise.
        //
        if (this.u === undefined) {
            //
            // Try to pull a new node from the priority queue.
            //
            if (this.PQ.size() === 0) {
                this.complete = true;
                return this.complete;
            }
            this.u = this.PQ.extractMin();
            this.v = undefined;
        }

        //
        // Examine the next neighbor of u.
        //
        if (this.v === undefined) {
            this.v = 1;
        } else {
            this.v += 1;
            if (this.v === this.graph.length) {
                //
                // We've looked at all the potential neighbors of u.
                // Move on to the next possible u.
                //
                this.visited[this.u] = true;
                this.u = undefined;
                this.v = undefined;
                return this.step();
            }
        }

        if (this.v in this.visited || this.v === this.u || this.graph[this.u][this.v] == Number.POSITIVE_INFINITY) {
            //
            // This isn't a neighbor we care about. Move on.
            //
            return this.step();
        }

        var alt = this.dist[this.u] + this.graph[this.u][this.v];
        if (alt < this.dist[this.v]) {
            this.dist[this.v] = alt;
            this.previous[this.v] = this.u;
            this.PQ.decreaseKey(this.v, alt);
        }

        return false;
    },
    shortestPath: function() {
        if (!this.complete) {
            throw new Error("Algorithm has not completed yet");
        }
        var total = 0;
        var tmpNode = this.dstNode;
        var nodes = [tmpNode];
        var edges = [];
        while (true) {
            var prevNode = this.previous[tmpNode];
            total += this.graph[tmpNode][prevNode];
            edges.push({src: tmpNode, dst: prevNode});

            tmpNode = prevNode;
            nodes.push(prevNode);
            if (tmpNode == this.srcNode) {
                break;
            }
        }
        return {edges: edges, nodes: nodes, distance: total}
    }
};

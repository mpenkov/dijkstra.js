function dijkstra(graph, srcNode, destNode) {
    var dist = [];
    dist[srcNode] = 0;
    var previous = [];
    PQ = new MinHeap();
    for (var v = 1; v < graph.length; ++v) {
        if (v != srcNode) {
            dist[v] = Number.POSITIVE_INFINITY;
        }
        PQ.insert(v, dist[v]);
    }

    while (PQ.size()) {
        var u = PQ.extractMin();
        for (v = 1; v < graph.length; ++v) {
            if (u == v || graph[u][v] == Number.POSITIVE_INFINITY) {
                continue;
            }
            var alt = dist[u] + graph[u][v];
            if (alt < dist[v]) {
                dist[v] = alt;
                previous[v] = u;
                PQ.decreaseKey(v, alt);
            }
        }
    }

    var result = 0;
    while (true) {
        var prevNode = previous[destNode];
        result += graph[destNode][prevNode];
        destNode = prevNode;
        if (destNode == srcNode) {
            break;
        }
    }
    return result;
}

function dijkstra(G, P, Q) {
    var dist = [];
    var previous = [];
    B = new MinHeap();
    for (var R = 0; R < G.length; ++R) {
        if (R == P) {
            dist[R] = 0;
        } else {
            dist[R] = Number.POSITIVE_INFINITY;
        }
        B.insert(R, dist[R]);
    }
    while (B.size()) {
        var JT = B.extractMin().value;
        for (var R = 0; R < G.length; ++R) {
            if (JT == R || G[JT][R] == Number.POSITIVE_INFINITY) {
                continue;
            }
            var alt = dist[JT] + G[JT][R];
            if (alt < dist[R]) {
                dist[R] = alt;
                previous[R] = JT;
                B.decreaseKey(R, alt);
            }
        }
    }
    return dist[Q];
}

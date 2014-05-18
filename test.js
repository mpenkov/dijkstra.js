test("constructor", function() {
    var minHeap = new MinHeap();
    equal(minHeap.size(), 0, "A new heap must be empty");
});

test("insert", function() {
    var minHeap = new MinHeap();
    minHeap.insert(new Object(), 1);
    equal(minHeap.size(), 1, "The size of the heap must increase");
    minHeap.insert(new Object(), 2);
    equal(minHeap.size(), 2, "The size of the heap must increase");
});

test("heap property", function() {
    var badHeap = new MinHeap();
    badHeap.nodes[1] = {key: 5}
    badHeap.nodes[2] = {key: 4}
    equal(badHeap.obeysHeapProperty(), false, "This heap should not obey the heap property");

    var minHeap = new MinHeap();
    for (var i = 10; i >= 0; --i) {
        minHeap.insert(new Object(), i);
    }
    equal(minHeap.obeysHeapProperty(), true, "Heap must obey the heap property");
});

test("extract minimum", function() {
    var minHeap = new MinHeap();
    throws(function() {minHeap.extractMin()}, Error, "Heap should throw error on empty extract");
    for (var i = 1; i < 4; ++i) {
        minHeap.insert(i, i);
    }
    equal(minHeap.extractMin(), 1);
    equal(minHeap.extractMin(), 2);
    equal(minHeap.extractMin(), 3);

    var minHeap = new MinHeap();
    for (var i = 3; i > 0; --i) {
        minHeap.insert(i, i);
    }
    equal(minHeap.extractMin(), 1);
    equal(minHeap.extractMin(), 2);
    equal(minHeap.extractMin(), 3);
});

test("decrease key", function() {
    var minHeap = new MinHeap();
    throws(function() {minHeap.decreaseKey(3, 0)}, Error, "Heap should throw error on non-existing value");
    for (var i = 1; i < 4; ++i) {
        minHeap.insert(i, i);
    }
    minHeap.decreaseKey(3, 0);
    equal(minHeap.extractMin(), 3);
});

test("dijkstra", function() {
    var g = [];
    for (var i = 1; i <= 6; ++i) {
        g[i] = [];
        g[i][i] = 0;
    }
    g[1][2] = 7;
    g[1][3] = 9;
    g[1][4] = Number.POSITIVE_INFINITY;
    g[1][5] = Number.POSITIVE_INFINITY;
    g[1][6] = 14;

    g[2][3] = 10;
    g[2][4] = 15;
    g[2][5] = Number.POSITIVE_INFINITY;
    g[2][6] = Number.POSITIVE_INFINITY;

    g[3][4] = 11;
    g[3][5] = Number.POSITIVE_INFINITY;
    g[3][6] = 2;

    g[4][5] = 6;
    g[4][6] = Number.POSITIVE_INFINITY;

    g[5][6] = 9;

    for (var i = 1; i <= 6; ++i) {
        for (var j = 1; j < i; ++j) {
            g[i][j] = g[j][i];
        }
    }

    equal(dijkstra(g, 1, 5), 20);
});

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
    equal(minHeap.extractMin().value, 1);
    equal(minHeap.extractMin().value, 2);
    equal(minHeap.extractMin().value, 3);

    var minHeap = new MinHeap();
    for (var i = 3; i > 0; --i) {
        minHeap.insert(i, i);
    }
    equal(minHeap.extractMin().value, 1);
    equal(minHeap.extractMin().value, 2);
    equal(minHeap.extractMin().value, 3);
});

test("decrease key", function() {
    var minHeap = new MinHeap();
    throws(function() {minHeap.decreaseKey(3, 0)}, Error, "Heap should throw error on non-existing value");
    for (var i = 1; i < 4; ++i) {
        minHeap.insert(i, i);
    }
    minHeap.decreaseKey(3, 0);
    equal(minHeap.extractMin().value, 3);
});

test("dijkstra", function() {
    g = createGraph1();
    equal(dijkstra(g, 0, 4), 20);
});

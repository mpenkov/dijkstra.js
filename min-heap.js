// http://www.cs.cmu.edu/~adamchik/15-121/lectures/Binary%20Heaps/heaps.html
function MinHeap() {
    this.nodes = [];
}

MinHeap.prototype = {
    constructor: MinHeap,
    size: function() {
        var result = 0;
        for (var i = 0; i < this.nodes.length; ++i) {
            if (this.nodes[i]) {
                ++result;
            }
        }
        return result;
    },
    insert: function(value, key) {
        var insertIndex = 0;
        for (var i = 1; i < this.nodes.length; ++i) {
            if (this.nodes[i] === undefined) {
                insertIndex = i;
                break;
            }
        }
        if (insertIndex === 0) {
            insertIndex = this.nodes.length;
            this.nodes.length = this.nodes.length*2;
        }
        this.nodes[i] = {value: value, key: key};
        this.percolateUpwards(insertIndex);
    },
    decreaseKey: function(value, newKey) {
        var currentIndex = this.indexOf(value);
        var currentNode = this.nodes[currentIndex];
        if (currentNode.key <= newKey) {
            throw new Error("New key must be less than old key");
        }
        currentNode.key = newKey;
        this.percolateUpwards(currentIndex);
    },
    extractMin: function() {
        var minNode = this.nodes[1];
        if (minNode === undefined) {
            throw new Error("Empty heap");
        }
        var i = 1;
        while (true) {
            this.nodes[i] = undefined;

            var leftNode = this.nodes[i*2];
            var rightNode = this.nodes[i*2+1];
            if (leftNode === undefined && rightNode == undefined) {
                break;
            }

            var next_i;
            if (leftNode && rightNode) {
                next_i = leftNode.key < rightNode.key ? i*2 : i*2+1;
            } else {
                next_i = leftNode ? i*2 : i*2+1;
            }
            this.nodes[i] = this.nodes[next_i];
            i = next_i;
        }
        return minNode.value;
    },
    percolateUpwards: function(i) {
        while (true) {
            var parentIndex = Math.floor(i/2);
            if (parentIndex === 0) {
                break;
            }
            var currentNode = this.nodes[i];
            var parentNode = this.nodes[parentIndex];
            if (currentNode.key > parentNode.key) {
                break;
            }
            this.nodes[i] = parentNode;
            this.nodes[parentIndex] = currentNode;
            i = parentIndex;
        }
    },
    obeysHeapProperty: function() {
        for (var i = 1; i < this.nodes.length; ++i) {
            var currentNode = this.nodes[i];
            var leftNode = this.nodes[2*i];
            var rightNode = this.nodes[2*i+1];
            if (leftNode && leftNode.key < currentNode.key) {
                return false;
            } else if (rightNode && rightNode.key < currentNode.key) {
                return false;
            }
        }
        return true;
    },
    indexOf: function(value) {
        for (var i = 1; i < this.nodes.length; ++i) {
            if (this.nodes[i] && this.nodes[i].value == value) {
                return i;
            }
        }
        throw new Error("Value is not in the heap");
    }
};

function makeSymmetric(matrix) {
    for (var i = 0; i < matrix.length; ++i) {
        for (var j = 0; j < i; ++j) {
            g[i][j] = g[j][i];
        }
    }
}
function createMatrix(numNodes) {
    var g = [];
    for (var i = 0; i < numNodes; ++i) {
        g[i] = [];
        for (var j = 0; j < numNodes; ++j) {
            g[i][j] = Number.POSITIVE_INFINITY;
        }
        g[i][i] = 0;
    }
    return g;
}

function createGraph1() {
    //
    // Return the graph at http://en.wikipedia.org/wiki/File:Dijkstra_Animation.gif
    // as a adjacency matrix.
    //
    g = createMatrix(6);
    g[0][1] = 7;
    g[0][2] = 9;
    g[0][5] = 14;
    g[1][2] = 10;
    g[1][3] = 15;
    g[2][3] = 11;
    g[2][5] = 2;
    g[3][4] = 6;
    g[4][5] = 9;
    makeSymmetric(g);
    return g;
}

function createGraph2() {
    g = createMatrix(6);
    g[0][1] = 1;
    g[1][2] = 1;
    g[1][5] = 2;
    g[2][3] = 1;
    g[3][4] = 1;
    g[4][5] = 2;
    makeSymmetric(g);
    return g;
}

function createGraph3() {
    g = createMatrix(6);
    g[0][1] = g[1][2] = g[2][3] = g[3][4] = 1;
    g[0][5] = 5;
    g[4][5] = 2;
    makeSymmetric(g);
    return g;
}

function createRandomGraph(numNodes, edgeProbability, maxWeight) {
    var g = [];
    for (var i = 0; i < numNodes; ++i) {
        g[i] = [];
    }
    for (var i = 0; i < numNodes; ++i) {
        for (var j = i+1; j < numNodes; ++j) {
            var randomNumber = Math.random();
            var length = Number.POSITIVE_INFINITY;
            if (randomNumber > edgeProbability) {
                length = Math.floor(Math.random()*maxWeight);
            }
            g[i][j] = g[j][i] = length;
        }
    }
    return g;
}

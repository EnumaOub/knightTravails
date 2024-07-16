class knightNode {
    constructor(coordinate) {
        this.coord = coordinate;
        this.path = [coordinate];
    }

    updateNode(coordinate) {
        this.coord = coordinate;
        this.path.concat(coordinate);
    }
};
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

function knightTravails () {
    const forbiddenMovement = function(coord) {
        return coord[0] < 8 && coord[1] < 8;
    };

    const knightMovement = function(coord) {
        const movesPossible = [ 
            [coord[0] + 2, coord[1] + 1],
            [coord[0] + 2, coord[1] + -1],
            [coord[0] + -2, coord[1] + 1],
            [coord[0] + -2, coord[1] + -1],
            [coord[0] + 1, coord[1] + 2],
            [coord[0] + 1, coord[1] + -2],
            [coord[0] + -1, coord[1] + 2],
            [coord[0] + -1, coord[1] + -2],
        ]
        return movesPossible.filter((c) => forbiddenMovement(c));

    };

    const getPath = function(coordInit, coordFin) {

    }

    return {
        knightMovement
    }
}

const knightMvt = knightTravails()
console.log(knightMvt.knightMovement([5,6]))
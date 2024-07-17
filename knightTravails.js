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
        return coord[0] < 8 && coord[1] < 8 && coord[0] >= 0 && coord[1]  >= 0;
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

    const checkCoordinate = function(coord) {
        if (!forbiddenMovement(coord)) {
            console.log(`The Coordinates: ${coord} are not right`);
            return false;
        };
        return true;
    };

    const getPath = function(coordInit, coordFin) {
        if (!checkCoordinate(coordInit) || !checkCoordinate(coordFin)) {
            return null;
        }
        else {
            return knightMovement(coordInit);
        }


    }

    return {
        getPath
    }
}

const knightMvt = knightTravails()
console.log(knightMvt.getPath([5,6], [9,6]))
console.log(knightMvt.getPath([5,15], [4,1]))
console.log(knightMvt.getPath([5,15], [9,6]))
console.log(knightMvt.getPath([5,6], [4,1]))
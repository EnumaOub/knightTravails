class KnightNode {
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
            console.log(`The Coordinates: ${coord} are out of range`);
            return false;
        };
        return true;
    };

    const getPath = function(coordInit, coordFin) {
        if (!checkCoordinate(coordInit) || !checkCoordinate(coordFin)) {
            return null;
        }
        else {
            let currentKnightNode = new KnightNode(coordInit);
            const queue = [currentKnightNode];
            let actualMove;
            while (queue.length > 0) {
                actualMove = queue.pop();
                if (actualMove.coord.toString() === coordFin.toString()) {
                    console.log(`You made it in ${actualMove.path.length} moves!  Here's your path:`)
                    actualMove.path.forEach((coord) => console.log(coord));
                }
                else {
                    knightMovement(actualMove.coord).forEach((move) => {
                        console.log(move)
                    })
                };
            }
            return actualMove;
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
console.log(knightMvt.getPath([5,6], [5,6]))
console.log(knightMvt.getPath([5,6], [4,1]))
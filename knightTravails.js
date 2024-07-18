class KnightNode {
    constructor(coordinate, oldPath = [] ) {
        this.coord = coordinate;
        this.path = [...oldPath, coordinate.toString()];
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

    const showBoard = function(node) {
        const board = Array.from({length: 8}, () => new Array(8).fill('.'))
        let i = 0;
        node.path.forEach((coord) => {
            const [x, y] = JSON.parse(`[${coord}]`)
            board[x][y] = i;
            i++;
        })
        i = 0;
        console.log([' '].concat(Array.from(Array(8).keys())).toString().replace(/,/g,' '));
        board.forEach((line) => {
            console.log(`${i} ${line.toString().replace(/,/g,' ')}`)
            i++;
        }
        )
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
                actualMove = queue.shift();
                if (actualMove.coord.toString() === coordFin.toString()) {
                    console.log(`You made it in ${actualMove.path.length - 1 } moves!  Here's your path:`)
                    actualMove.path.forEach((coord) => {
                        if (coord === coordInit.toString()){
                            process.stdout.write(`Starting coordinates: [${coord}] ->`);
                        }
                        else if (coord === coordFin.toString()){
                            process.stdout.write(`Ending coordinate: [${coord}]`);
                        }
                        else {
                            process.stdout.write(` [${coord}] -> `);
                        }
                    });
                    console.log("\nBoard\n")
                    showBoard(actualMove);
                    console.log("\n\n")
                    return actualMove;
                }
                else {
                    knightMovement(actualMove.coord).forEach((move) => {
                        if (!(actualMove.path.includes(move.toString()))){
                            const newKnightNode = new KnightNode(move, actualMove.path);
                            queue.push(newKnightNode);
                        }
                        
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
knightMvt.getPath([5,6], [5,6])
knightMvt.getPath([5,6], [4,1])
knightMvt.getPath([3,3],[4,3])
knightMvt.getPath([0,0],[3,3])
knightMvt.getPath([3,3],[0,0])
knightMvt.getPath([0,0],[7,7])
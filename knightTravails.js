//Node of Adjency list following the knight movements
class KnightNode {
    constructor(coordinate, oldPath = [] ) {
        // Last coordinate of node
        this.coord = coordinate;
        // Complete path followed 
        this.path = [...oldPath, coordinate.toString()];
    }

};

function knightTravails () {
    // Function which check the coordinate are inside the board
    const forbiddenMovement = function(coord) {
        return coord[0] < 8 && coord[1] < 8 && coord[0] >= 0 && coord[1]  >= 0;
    };

    // Get list of possible movement of the knight starting from given coordinate
    const knightMovement = function(coord) {
        // Get complete list of knight movements
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
        // filter these movements by checking that they are still inside the board
        return movesPossible.filter((c) => forbiddenMovement(c));

    };

    // Function called if initial or final coordinate are not inside the board
    const checkCoordinate = function(coord) {
        if (!forbiddenMovement(coord)) {
            console.log(`The Coordinates: ${coord} are out of range`);
            return false;
        };
        return true;
    };

    // Function which show the board with the resulting path
    const showBoard = function(node) {
        // Build Board 8x8 with "."
        const board = Array.from({length: 8}, () => new Array(8).fill('.'))
        let i = 0;
        // Populate board with the position of the coordinate in the path
        node.path.forEach((coord) => {
            const [x, y] = JSON.parse(`[${coord}]`)
            board[x][y] = i;
            i++;
        })
        i = 0;
        // Show the board
        console.log([' '].concat(Array.from(Array(8).keys())).toString().replace(/,/g,' '));
        board.forEach((line) => {
            console.log(`${i} ${line.toString().replace(/,/g,' ')}`)
            i++;
        }
        )
    };

    // Main function allowing to get shortest knight path to final coordinate from initial coordinate
    const getPath = function(coordInit, coordFin) {
        // Check that the initial and final coordinate are in board
        if (!checkCoordinate(coordInit) || !checkCoordinate(coordFin)) {
            return null;
        }
        else {
            // Create first node of the knight with initial coordinate
            let currentKnightNode = new KnightNode(coordInit);
            // We use an array queu which will be populated with the node and emptied in loop
            const queue = [currentKnightNode];
            let actualMove;
            while (queue.length > 0) {
                // Get first element stored in queue corresponding to actual position studied
                actualMove = queue.shift();
                // If the this move coordinate correspond to the final coordinate we finish and show the path
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
                    // We get all possible movement from the current coordinate and we store them in queue
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

// TEST 
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
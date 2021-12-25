import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");

    const inputArr: string[][] = [];
    input.forEach((row) => {
        inputArr.push(row.split(""));
    });

    console.log(findLandingSpot(inputArr));
}

interface tracker {
    stillMovingRight: boolean;
    stillMovingDown: boolean;
}

function findLandingSpot(input: string[][]) {
    let turn = 0;
    let previousInput: string[][];
    let stillMoving = true;
    const changeTracker: tracker = { stillMovingRight: true, stillMovingDown: true };

    while (stillMoving) {
        previousInput = JSON.parse(JSON.stringify(input));
        input = stepRight(input, changeTracker);
        input = stepDown(input, changeTracker);
        if (!changeTracker.stillMovingDown && !changeTracker.stillMovingRight) {
            stillMoving = false;
        }
        turn++;
    }

    return turn;
}

function stepRight(input: string[][], changeTracker: tracker) {
    const movers: number[][] = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] === ">") {
                if (input[y][x + 1] && input[y][x + 1] === ".") {
                    movers.push([x, y]);
                } else if (input[y][x + 1] === undefined && input[y][0] === ".") {
                    movers.push([x, y]);
                }
            }
        }
    }

    if (movers.length > 0) {
        changeTracker.stillMovingRight = true;
    } else {
        changeTracker.stillMovingRight = false;
    }

    movers.forEach((mover: number[]) => {
        if (input[mover[1]][mover[0] + 1]) {
            input[mover[1]][mover[0] + 1] = ">";
        } else {
            input[mover[1]][0] = ">";
        }
        input[mover[1]][mover[0]] = ".";
    });

    return input;
}

function stepDown(input: string[][], changeTracker: tracker) {
    const movers: number[][] = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] === "v") {
                if (input[y + 1] && input[y + 1][x] === ".") {
                    movers.push([x, y]);
                    // console.log(`I think I can move down from y: ${y} and x: ${x}`);
                } else if (input[y + 1] === undefined && input[0][x] === ".") {
                    movers.push([x, y]);
                }
            }
        }
    }

    if (movers.length > 0) {
        changeTracker.stillMovingDown = true;
    } else {
        changeTracker.stillMovingDown = false;
    }

    movers.forEach((mover: number[]) => {
        if (input[mover[1] + 1]) {
            input[mover[1] + 1][mover[0]] = "v";
        } else {
            input[0][mover[0]] = "v";
        }
        input[mover[1]][mover[0]] = ".";
    });

    return input;
}

// function testPrint(input: string[][]) {
//     input.forEach((row: string[]) => {
//         console.log(...row);
//     });
//     console.log("------------");
// }

advent();

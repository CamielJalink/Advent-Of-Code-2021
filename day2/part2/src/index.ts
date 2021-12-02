import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const inputArray = stringInput.split("\r\n");
    const movesArray: string[][] = [];

    inputArray.forEach((stringMove) => {
        movesArray.push(stringMove.split(" "));
    });

    moveSub(movesArray);
}

function moveSub(movesArray: string[][]) {
    let xPos = 0;
    let depth = 0;
    let aim = 0;

    movesArray.forEach((move) => {
        switch (move[0]) {
            case "forward":
                xPos += Number(move[1]);
                depth += aim * Number(move[1]);
                break;
            case "down":
                aim += Number(move[1]);
                break;
            case "up":
                aim -= Number(move[1]);
                break;
            default:
                console.error("Something is wrong with my input!");
                break;
        }
    });

    console.log(`Sub is at xPos ${xPos}, depth ${depth} which results in score ${xPos * depth}`);
}

advent();

import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    const numInput = input.map((stringNum) => Number(stringNum));
    determineChange(numInput);
}

function determineChange(depthsList: number[]) {
    let increaseCount = 0;
    let decreaseCount = 0;
    let staysSame = 0;

    for (let i = 1; i < depthsList.length; i++) {
        if (depthsList[i] > depthsList[i - 1]) {
            increaseCount++;
        } else if (depthsList[i] < depthsList[i - 1]) {
            decreaseCount++;
        } else if (depthsList[i] === depthsList[i - 1]) {
            staysSame++;
        }
    }

    console.log(`Depth increases ${increaseCount} times`);
    console.log(`Depth decreases ${decreaseCount} times`);
    console.log(`Depth stayed the same ${staysSame} times`);
}

advent();

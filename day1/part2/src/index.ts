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
        const slope1 = depthsList[i - 1] + depthsList[i] + depthsList[i + 1];
        const slope2 = depthsList[i] + depthsList[i + 1] + depthsList[i + 2];

        if (slope2 > slope1) {
            increaseCount++;
        } else if (slope2 < slope1) {
            decreaseCount++;
        } else if (slope2 === slope1) {
            staysSame++;
        }
    }

    console.log(`Depth increases ${increaseCount} times`);
    console.log(`Depth decreases ${decreaseCount} times`);
    console.log(`Depth stayed the same ${staysSame} times`);
}

advent();

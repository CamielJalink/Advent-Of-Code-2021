import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    lifeSupport(input);
}

function lifeSupport(input: string[]) {
    // Count the ammount of ones at each position.
    const sums: number[] = [];
    for (let i = 0; i < input[0].length; i++) {
        sums[i] = 0;
    }

    // determine the average for each position (between 0 and 1)
    input.forEach((binary) => {
        for (let i = 0; i < binary.length; i++) {
            sums[i] += parseInt(binary[i]);
        }
    });

    // determine the most found digit, 1 or 0, at each position
    const rounded: number[] = [];
    sums.forEach((sum) => {
        rounded.push(Math.round(sum / input.length));
    });

    const oxygenBinary = findBinary(input, rounded, 1);
    const scrubberBinary = findBinary(input, rounded, 0);
    console.log(`life support rating is ${oxygenBinary} * ${scrubberBinary} = ${oxygenBinary * scrubberBinary}`);
}

function findBinary(input: string[], rounded: number[], tieBreaker: number) {
    let inputCopy: string[] = JSON.parse(JSON.stringify(input));
    let targetBinary = "";

    for (let i = 0; i < rounded.length; i++) {
        const zeroInputs: string[] = [];
        const oneInputs: string[] = [];

        // Determine the amount of binaries with a 1 or a 0 at this position.
        for (let j = 0; j < inputCopy.length; j++) {
            if (inputCopy[j][i] === String(1)) {
                oneInputs.push(inputCopy[j]);
            } else {
                zeroInputs.push(inputCopy[j]);
            }
        }

        // Depending on whether we are tracking oxygen (1) or CO2 scrubbing (0), use a different bit criterium.
        if (tieBreaker === 1) {
            if (oneInputs.length >= zeroInputs.length) {
                inputCopy = oneInputs;
            } else {
                inputCopy = zeroInputs;
            }
        }

        if (tieBreaker === 0) {
            if (zeroInputs.length <= oneInputs.length) {
                inputCopy = zeroInputs;
            } else {
                inputCopy = oneInputs;
            }
        }

        if (inputCopy.length === 1) {
            targetBinary = inputCopy[0];
            break;
        }
    }

    return parseInt(targetBinary, 2);
}

advent();

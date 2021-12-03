import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    pwrCons(input);
}

function pwrCons(input: string[]) {
    const sums: number[] = [];
    for (let i = 0; i < input[0].length; i++) {
        sums[i] = 0;
    }

    input.forEach((binary) => {
        for (let i = 0; i < binary.length; i++) {
            sums[i] += parseInt(binary[i]);
        }
    });

    const averages = sums.map((sum) => {
        return sum / input.length;
    });

    let gammaString = "";
    let epsilonString = "";
    averages.forEach((average) => {
        gammaString += String(Math.round(average));
        epsilonString += String(Math.round(1 - average));
    });

    const gamma = parseInt(gammaString, 2);
    const epsilon = parseInt(epsilonString, 2);
    console.log(`Gamma is: ${gamma}`);
    console.log(`Epsilon is: ${epsilon}`);
    console.log(`Power consumption is ${gamma * epsilon}`);
}

advent();

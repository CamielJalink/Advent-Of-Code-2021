import { readFileSync } from "fs";
import doExplode from "./explode";
import doSplit from "./split";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(addAllNumbers(input));
}

function addAllNumbers(input: string[]) {
    let sum: string = input[0];
    for (let i = 1; i < input.length; i++) {
        sum = addNumbers(sum, input[i]);
    }
    return sum;
}

function addNumbers(num1: string, num2: string) {
    let sum = "[" + num1 + "," + num2 + "]";

    let stillExploding = true;
    let stillSplitting = true;

    while (stillExploding || stillSplitting) {
        if (stillExploding) {
            const explodedString = doExplode(sum);
            if (explodedString === sum) {
                stillExploding = false;
            } else {
                sum = explodedString;
            }
        }

        // Only start splitting if we are done exploding.
        if (!stillExploding && stillSplitting) {
            const splitString = doSplit(sum);
            // If splitting changed something, start exploding again.
            if (splitString !== sum) {
                stillExploding = true;
            }
            stillSplitting = false;
        }
    }

    console.log(sum);
    return sum;
}

advent();

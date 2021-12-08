import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(countOutputDigits(input));
}

function countOutputDigits(input: string[]) {
    const outputs: string[] = [];

    for (let i = 0; i < input.length; i++) {
        const output = input[i].split(" | ")[1];
        outputs.push(output);
    }

    let outputWords: string[] = [];
    outputs.forEach((output: string) => {
        outputWords = [...outputWords, ...output.split(" ")];
    });

    let numUniqueDigits = 0;
    outputWords.forEach((word) => {
        if (word.length === 2 || word.length === 3 || word.length === 4 || word.length === 7) {
            numUniqueDigits++;
        }
    });
    return numUniqueDigits;
}

advent();

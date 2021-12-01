import { readFileSync } from "fs";

export function getNumberArray() {
    const input = readFileSync("input/1.txt", "utf-8");
    const numberStrings = input.split("\n");
    return numberStrings.map((string) => parseInt(string));
}

export function getIncreases(numbers: number[]) {
    let increases = 0;
    numbers.forEach((string, i) => {
        if (i > 0 && string > numbers[i - 1]) {
            increases++;
        }
    });

    return increases;
}

export const part1 = getIncreases(getNumberArray());

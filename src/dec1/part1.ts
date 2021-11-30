import { readFileSync } from "fs";

function getStringInput() {
    return readFileSync("input/0.txt", "utf-8");
}

export const part1 = getStringInput();

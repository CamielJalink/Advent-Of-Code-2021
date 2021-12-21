import { readFileSync } from "fs";
import { Cave, createCaves } from "./cave";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(findAllPaths(input));
}

function findAllPaths(input: string[]) {
    const caves: Cave[] = createCaves(input);
    console.log(caves);
    return 0;
}

advent();

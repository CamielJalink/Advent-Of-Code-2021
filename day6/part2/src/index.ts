import { readFileSync } from "fs";
import Fish from "./fish";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    const fish = input[0].split(",").map((stringFish) => parseInt(stringFish));
    console.log(countFish(fish));
}

function countFish(initialFish: number[]) {
    const lookupTable: number[][] = fillInitialLookupTable();
    const daysLeft = 256;
    const allFish: Fish[] = [];
    initialFish.forEach((fish) => {
        allFish.push(new Fish(daysLeft, fish, lookupTable));
    });
    let totalFish = 0;
    allFish.forEach((fish: Fish) => {
        totalFish += fish.countFish();
    });

    return totalFish;
}

function fillInitialLookupTable() {
    const lookupTable: number[][] = [];

    for (let i = 0; i < 257; i++) {
        const newRow: number[] = [];
        for (let j = 0; j < 9; j++) {
            newRow.push(-1);
        }
        lookupTable.push(newRow);
    }

    return lookupTable;
}

advent();

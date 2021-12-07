import { readFileSync } from "fs";
import Fish from "./fish";
import keyValue from "./keyValue";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    const fish = input[0].split(",").map((stringFish) => parseInt(stringFish));
    console.log(oldApproach(fish));
    console.log(countFish(fish));
}

function countFish(initialFish: number[]) {
    const lookupTable: keyValue[] = fillInitialLookupTable();
    const daysLeft = 16;
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
    const lookupTable: keyValue[] = [];
    lookupTable.push({ key: "0-8", value: 0 });
    lookupTable.push({ key: "0-7", value: 0 });
    lookupTable.push({ key: "0-6", value: 0 });
    lookupTable.push({ key: "0-5", value: 0 });
    lookupTable.push({ key: "0-4", value: 0 });
    lookupTable.push({ key: "0-3", value: 0 });
    lookupTable.push({ key: "0-2", value: 0 });
    lookupTable.push({ key: "0-1", value: 0 });
    lookupTable.push({ key: "0-0", value: 0 });
    lookupTable.push({ key: "1-8", value: 0 });
    lookupTable.push({ key: "1-7", value: 0 });
    lookupTable.push({ key: "1-6", value: 0 });
    lookupTable.push({ key: "1-5", value: 0 });
    lookupTable.push({ key: "1-4", value: 0 });
    lookupTable.push({ key: "1-3", value: 0 });
    lookupTable.push({ key: "1-2", value: 0 });
    lookupTable.push({ key: "1-1", value: 0 });
    lookupTable.push({ key: "2-8", value: 0 });
    lookupTable.push({ key: "2-7", value: 0 });
    lookupTable.push({ key: "2-6", value: 0 });
    lookupTable.push({ key: "2-5", value: 0 });
    lookupTable.push({ key: "2-4", value: 0 });
    lookupTable.push({ key: "2-3", value: 0 });
    lookupTable.push({ key: "2-2", value: 0 });
    lookupTable.push({ key: "3-8", value: 0 });
    lookupTable.push({ key: "3-7", value: 0 });
    lookupTable.push({ key: "3-6", value: 0 });
    lookupTable.push({ key: "3-5", value: 0 });
    lookupTable.push({ key: "3-4", value: 0 });
    lookupTable.push({ key: "3-3", value: 0 });
    lookupTable.push({ key: "4-8", value: 0 });
    lookupTable.push({ key: "4-7", value: 0 });
    lookupTable.push({ key: "4-6", value: 0 });
    lookupTable.push({ key: "4-5", value: 0 });
    lookupTable.push({ key: "4-4", value: 0 });
    lookupTable.push({ key: "5-8", value: 0 });
    lookupTable.push({ key: "5-7", value: 0 });
    lookupTable.push({ key: "5-6", value: 0 });
    lookupTable.push({ key: "5-5", value: 0 });
    lookupTable.push({ key: "6-8", value: 0 });
    lookupTable.push({ key: "6-7", value: 0 });
    lookupTable.push({ key: "6-6", value: 0 });
    lookupTable.push({ key: "7-8", value: 0 });
    lookupTable.push({ key: "7-7", value: 0 });
    lookupTable.push({ key: "8-8", value: 0 });

    return lookupTable;
}

function oldApproach(allFish: number[]) {
    // Er zijn zeven opties in mn initiele vislijst: 0 t/m 6.
    // Daar komt nog een speciale case 8 bij.
    // Stel, ik heb 1 vis die over 6 dagen bevalt. We hebben het over 256 dagen.

    for (let day = 1; day <= 16; day++) {
        const prevFish: number[] = [];
        const newFish: number[] = [];

        allFish.forEach((fish) => {
            if (fish === 0) {
                fish = 6;
                newFish.push(8);
            } else {
                fish--;
            }
            prevFish.push(fish);
        });
        allFish = [...prevFish, ...newFish];
    }
    return allFish.length;
}

advent();

import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    const crabLocations = input[0].split(",").map((stringLoc) => parseInt(stringLoc));
    countLeastFuel(crabLocations);
}

function countLeastFuel(crabLocations: number[]) {
    const gatherLoc = determineLocation(crabLocations);

    let fuelNeeded = 0;
    crabLocations.forEach((crabLoc) => {
        const distance = Math.abs(crabLoc - gatherLoc);
        for (let i = 1; i <= distance; i++) {
            fuelNeeded += i;
        }
    });

    console.log(fuelNeeded);
}

function determineLocation(crabLocations: number[]) {
    let sum = 0;
    crabLocations.forEach((loc) => {
        sum += loc;
    });

    const averageLoc = Math.round(sum / crabLocations.length) - 1; // What is this -1?!
    return averageLoc;
}

advent();

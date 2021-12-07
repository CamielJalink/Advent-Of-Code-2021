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
        fuelNeeded += Math.abs(crabLoc - gatherLoc);
    });

    console.log(fuelNeeded);
}

function determineLocation(crabLocations: number[]) {
    crabLocations.sort((locA, locB) => {
        return locA - locB;
    });
    let medianLoc: number;

    // median is middle crab
    if (crabLocations.length % 2 === 1) {
        medianLoc = crabLocations[Math.floor(crabLocations.length / 2)];
    }
    // median is average of middle two crabs.
    else {
        const loc1 = crabLocations[Math.floor(crabLocations.length / 2) - 1];
        const loc2 = crabLocations[Math.floor(crabLocations.length / 2)];
        medianLoc = (loc1 + loc2) / 2;
    }

    return medianLoc;
}

advent();

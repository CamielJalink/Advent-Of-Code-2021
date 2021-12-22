export class Location {
    name: string;
    x: number;
    y: number;
    riskLevel: number;
    pathRiskFirstVisit = -1;
    neighbors: Location[] = [];
    isExit = false;
    constructor(x: number, y: number, riskLevel: number) {
        this.x = x;
        this.y = y;
        this.riskLevel = riskLevel;
        this.name = x.toString() + "," + y.toString();
    }
}

export interface Path {
    nextLoc: Location;
    sumRisk: number;
}

export function parseInput(input: string[]) {
    input = enhanceInput(input);

    const locations: Location[] = [];

    // Build an array of all locations
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            locations.push(new Location(x, y, parseInt(input[y][x])));
        }
    }

    // Map neighbors for each location!
    locations.forEach((loc: Location) => {
        locations.forEach((loc2: Location) => {
            if (Math.abs(loc.x - loc2.x) === 1 && Math.abs(loc.y - loc2.y) === 0) {
                loc.neighbors.push(loc2);
            } else if (Math.abs(loc.x - loc2.x) === 0 && Math.abs(loc.y - loc2.y) === 1) {
                loc.neighbors.push(loc2);
            }
        });
    });

    locations[locations.length - 1].isExit = true;
    return locations;
}

function enhanceInput(input: string[]) {
    const newInput: string[] = [];

    for (let y = 0; y < 5; y++) {
        input.forEach((stringRow: string) => {
            let newStringRow = "";
            for (let x = 0; x < 5; x++) {
                for (const char of stringRow) {
                    let charNum = parseInt(char) + x + y;
                    while (charNum > 9) {
                        charNum = charNum - 9;
                    }
                    newStringRow += charNum.toString();
                }
            }
            newInput.push(newStringRow);
        });
    }

    return newInput;
}

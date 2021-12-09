import { readFileSync } from "fs";
import Location from "./location";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(determineThreeLargestBasins(input));
}

advent();

function determineThreeLargestBasins(input: string[]) {
    const map: string[][] = buildMap(input);
    const locations: Location[] = findLowpoints(map);
    return determineBasins(locations);
}

function buildMap(stringMap: string[]) {
    const map: string[][] = [];
    stringMap.forEach((mapLine: string) => {
        const row: string[] = [];
        for (const c of mapLine) {
            row.push(c);
        }
        map.push(row);
    });
    return map;
}

// Find the lowpoints using the part 1 solution.
// Also creates 'location' objects to track basin sizes and the direction of flow to the basins lowpoint.
function findLowpoints(map: string[][]) {
    const lowpoints: number[] = [];
    const locations: Location[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let isLowpoint = true;
            const myHeight = parseInt(map[y][x]);

            let lowestNeighborHeight = 10;
            let lowestNeighborX = -1;
            let lowestNeighborY = -1;

            if (map[y] && map[y][x - 1] && parseInt(map[y][x - 1]) <= myHeight) {
                isLowpoint = false;
                if (parseInt(map[y][x - 1]) < lowestNeighborHeight) {
                    lowestNeighborHeight = parseInt(map[y][x - 1]);
                    lowestNeighborX = x - 1;
                    lowestNeighborY = y;
                }
            }
            if (map[y] && map[y][x + 1] && parseInt(map[y][x + 1]) <= myHeight) {
                isLowpoint = false;
                if (parseInt(map[y][x + 1]) < lowestNeighborHeight) {
                    lowestNeighborHeight = parseInt(map[y][x + 1]);
                    lowestNeighborX = x + 1;
                    lowestNeighborY = y;
                }
            }
            if (map[y - 1] && map[y - 1][x] && parseInt(map[y - 1][x]) <= myHeight) {
                isLowpoint = false;
                if (parseInt(map[y - 1][x]) < lowestNeighborHeight) {
                    lowestNeighborHeight = parseInt(map[y - 1][x]);
                    lowestNeighborX = x;
                    lowestNeighborY = y - 1;
                }
            }
            if (map[y + 1] && map[y + 1][x] && parseInt(map[y + 1][x]) <= myHeight) {
                isLowpoint = false;
                if (parseInt(map[y + 1][x]) < lowestNeighborHeight) {
                    lowestNeighborHeight = parseInt(map[y + 1][x]);
                    lowestNeighborX = x;
                    lowestNeighborY = y + 1;
                }
            }
            const location = new Location(x, y, myHeight, lowestNeighborX, lowestNeighborY);
            if (isLowpoint) {
                lowpoints.push(myHeight);
                location.isLowpoint = true;
            }
            locations.push(location);
        }
    }

    // connect each location object with the neighbor it would flow to
    locations.forEach((location: Location) => {
        const targetX = location.flowtoNeighborX;
        const targetY = location.flowtoNeighborY;

        for (let i = 0; i < locations.length; i++) {
            const neighbor: Location = locations[i];
            if (neighbor.x === targetX && neighbor.y === targetY) {
                location.flowtoNeighbor = neighbor;
                break;
            }
        }
    });
    return locations;
}

// ask each location to add a 1 to the location containing the lowpoint of its basin.
// also add the lowpoint locations to a smaller array for easier access
function determineBasins(locations: Location[]) {
    const lowpointLocations: Location[] = [];
    locations.forEach((location: Location) => {
        location.determineBasinSize();
        if (location.isLowpoint) {
            lowpointLocations.push(location);
        }
    });

    // Now that each lowpoint basin knows how large its basin is, add those sizes to an array.
    const basinSizes: number[] = [];
    lowpointLocations.forEach((location: Location) => {
        basinSizes.push(location.basinSize);
    });
    // sort the sizes so that the biggest three come first.
    basinSizes.sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

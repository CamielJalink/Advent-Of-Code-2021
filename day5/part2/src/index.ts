import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    determineOverlappingLines(input);
}

advent();

function determineOverlappingLines(input: string[]) {
    const coords = parseCoordinates(input);
    const map = buildMap(coords);

    let stackedCoords = 0;
    map.forEach((column) => {
        column.forEach((coord) => {
            if (coord > 1) {
                stackedCoords++;
            }
        });
    });
    console.log(stackedCoords);
}

function parseCoordinates(input: string[]): number[][] {
    const coords: number[][] = [];

    input.forEach((line) => {
        const lineCoordsStr = line.split(" -> ");
        const start = lineCoordsStr[0].split(",").map((char) => parseInt(char));
        const end = lineCoordsStr[1].split(",").map((char) => parseInt(char));

        // If x coord is the same, we are looking at a vertical line!
        if (start[0] === end[0]) {
            // Lines can go forward or backward!
            let startY = start[1];
            let endY = end[1];
            if (start[1] >= end[1]) {
                startY = end[1];
                endY = start[1];
            }
            // determine coords in the line and add them to the array
            for (let y = startY; y <= endY; y++) {
                coords.push([start[0], y]);
            }
        }
        // If y coords are the same, it's a horizontal line!
        else if (start[1] === end[1]) {
            // Lines can go forward or backward!
            let startX = start[0];
            let endX = end[0];
            if (start[0] >= end[0]) {
                startX = end[0];
                endX = start[0];
            }
            // determine coords in the line and add them to the array
            for (let x = startX; x <= endX; x++) {
                coords.push([x, start[1]]);
            }
        }
    });
    return coords;
}

function buildMap(coords: number[][]) {
    let highestX = 0;
    let highestY = 0;
    coords.forEach((coord) => {
        if (coord[0] > highestX) {
            highestX = coord[0];
        }
        if (coord[1] > highestY) {
            highestY = coord[1];
        }
    });

    const map: number[][] = [];
    for (let x = 0; x <= highestX; x++) {
        map.push([]);
        for (let y = 0; y <= highestY; y++) {
            map[x].push(0);
        }
    }

    coords.forEach((coord) => {
        const x = coord[0];
        const y = coord[1];
        map[x][y] += 1;
    });

    return map;
}

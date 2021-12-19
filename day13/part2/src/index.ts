import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    console.log(countDots(input));
}

function countDots(input: string[]) {
    const map: string[][] = buildMap(input);

    let numberOfDots = 0;
    map.forEach((row: string[]) => {
        row.forEach((coord: string) => {
            if (coord === "#") {
                numberOfDots++;
            }
        });
    });

    return numberOfDots;
}

function buildMap(input: string[]) {
    const coordsStrings: string[] = input[0].split("\r\n");
    const coords: number[][] = [];
    let maxX = 0;
    let maxY = 0;

    // Determine the coords where we'll be drawing a #, and determine map dimensions.
    coordsStrings.forEach((stringCoord: string) => {
        const coord: number[] = stringCoord.split(",").map((stringNum) => parseInt(stringNum));
        if (coord[0] > maxX) {
            maxX = coord[0];
        }
        if (coord[1] > maxY) {
            maxY = coord[1];
        }
        coords.push(coord);
    });

    // Build the map based on the dimensions, and draw a . in every coordinate.
    let map: string[][] = [];
    for (let y = 0; y <= maxY; y++) {
        const row: string[] = [];
        for (let x = 0; x <= maxX; x++) {
            row.push(".");
        }
        map.push(row);
    }

    // For all the coordinates in the input, draw a #
    map = drawDots(map, coords);

    const drawInstruction: string[] = input[1].split("\r\n")[0].split(" ")[2].split("=");

    if (drawInstruction[0] === "y") {
        console.log("now folding up");
        map = foldUp(map, coords, parseInt(drawInstruction[1])); // Hardcoded y-axis foldline, will fix this later.
    } else if (drawInstruction[0] === "x") {
        console.log("now folding left");
        map = foldLeft(map, coords, parseInt(drawInstruction[1]));
    }

    return map;
}

function foldLeft(map: string[][], coords: number[][], foldLine: number) {
    let foldedMap: string[][] = [];

    // Throw away the columns we no longer need: the part we folded away.
    for (let y = 0; y < map.length; y++) {
        const newRow: string[] = [];
        for (let x = 0; x < foldLine; x++) {
            newRow.push(map[y][x]);
        }
        foldedMap.push(newRow);
    }

    // Determine which coords were on the folded-away part, and determine their new x-coordinate.
    const foldedCoords: number[][] = [];
    coords.forEach((coord: number[]) => {
        if (coord[0] > foldLine) {
            const foldedCoord: number[] = [];
            foldedCoord[1] = coord[1]; // the coord keeps the same y-coordinate
            const lineAfterFold = coord[0] - foldLine;
            foldedCoord[0] = foldLine - lineAfterFold;
            foldedCoords.push(foldedCoord);
        }
    });

    // draw the folded coords on the smaller foldedmap.
    foldedMap = drawDots(foldedMap, foldedCoords);
    return foldedMap;
}

function foldUp(map: string[][], coords: number[][], foldLine: number) {
    let foldedMap: string[][] = [];
    // Throw away the lines we no longer need: the part we folded away.
    for (let i = 0; i < foldLine; i++) {
        foldedMap.push(map[i]);
    }

    // Determine which coords were on the folded-away part, and determine their new y-coordinate.
    const foldedCoords: number[][] = [];
    coords.forEach((coord: number[]) => {
        if (coord[1] > foldLine) {
            const foldedCoord: number[] = [];
            foldedCoord[0] = coord[0]; // the coord keeps the same x-coordinate
            const lineAfterFold = coord[1] - foldLine;
            foldedCoord[1] = foldLine - lineAfterFold;
            foldedCoords.push(foldedCoord);
        }
    });

    // draw the folded coords on the smaller foldedmap.
    foldedMap = drawDots(foldedMap, foldedCoords);
    return foldedMap;
}

function drawDots(map: string[][], coords: number[][]) {
    coords.forEach((coord: number[]) => {
        map[coord[1]][coord[0]] = "#";
    });
    return map;
}

advent();

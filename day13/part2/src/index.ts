import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    foldInstructions(input);
}

function foldInstructions(input: string[]) {
    const map: string[][] = buildMap(input);

    map.forEach((row: string[]) => {
        let drawRow = "";
        row.forEach((coord: string) => {
            drawRow += coord;
        });
        console.log(drawRow);
    });
}

function buildMap(input: string[]) {
    const coordsStrings: string[] = input[0].split("\r\n");
    let coords: number[][] = [];
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
    const instructionLines: string[] = input[1].split("\r\n");
    const drawInstructions: string[][] = instructionLines.map((instructionLine: string) => {
        return instructionLine.split(" ")[2].split("=");
    });

    drawInstructions.forEach((drawInstruction: string[]) => {
        if (drawInstruction[0] === "y") {
            map = foldUp(map, parseInt(drawInstruction[1]));
            coords = fixCoordsFoldUp(coords, parseInt(drawInstruction[1]));
        } else if (drawInstruction[0] === "x") {
            map = foldLeft(map, parseInt(drawInstruction[1]));
            coords = fixCoordsLeftFold(coords, parseInt(drawInstruction[1]));
        }
        map = drawDots(map, coords);
    });

    return map;
}

function foldUp(map: string[][], foldLine: number) {
    const foldedMap: string[][] = [];
    // Throw away the lines we no longer need: the part we folded away.
    for (let i = 0; i < foldLine; i++) {
        foldedMap.push(map[i]);
    }

    return foldedMap;
}

function fixCoordsFoldUp(coords: number[][], foldLine: number) {
    // Determine which coords were on the folded-away part, and determine their new y-coordinate.
    const newCoords: number[][] = [];
    coords.forEach((coord: number[]) => {
        if (coord[1] > foldLine) {
            const foldedCoord: number[] = [];
            foldedCoord[0] = coord[0]; // the coord keeps the same x-coordinate
            const lineAfterFold = coord[1] - foldLine;
            foldedCoord[1] = foldLine - lineAfterFold;
            newCoords.push(foldedCoord);
        } else {
            newCoords.push(coord);
        }
    });

    return newCoords;
}

// Fold the map left, halving it in size.
function foldLeft(map: string[][], foldLine: number) {
    const foldedMap: string[][] = [];

    // Throw away the columns we no longer need: the part we folded away.
    for (let y = 0; y < map.length; y++) {
        const newRow: string[] = [];
        for (let x = 0; x < foldLine; x++) {
            newRow.push(map[y][x]);
        }
        foldedMap.push(newRow);
    }

    return foldedMap;
}

// determine the new set of coords we have
function fixCoordsLeftFold(coords: number[][], foldLine: number) {
    // Determine which coords were on the folded-away part, and determine their new x-coordinate.
    const newCoords: number[][] = [];
    coords.forEach((coord: number[]) => {
        if (coord[0] > foldLine) {
            const foldedCoord: number[] = [];
            foldedCoord[1] = coord[1]; // the coord keeps the same y-coordinate
            const lineAfterFold = coord[0] - foldLine;
            foldedCoord[0] = foldLine - lineAfterFold;
            newCoords.push(foldedCoord);
        } else {
            newCoords.push(coord);
        }
    });

    return newCoords;
}

function drawDots(map: string[][], coords: number[][]) {
    coords.forEach((coord: number[]) => {
        map[coord[1]][coord[0]] = "#";
    });
    return map;
}

advent();

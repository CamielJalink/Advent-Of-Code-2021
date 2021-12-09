import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(determineRiskLevels(input));
}

advent();

function determineRiskLevels(input: string[]) {
    const map: string[][] = buildMap(input);
    const lowpoints: number[] = findLowpoints(map);
    return lowpointsToRisklevel(lowpoints);
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

function findLowpoints(map: string[][]) {
    const lowpoints: number[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let isLowpoint = true;
            const myHeight = parseInt(map[y][x]);
            if (map[y] && map[y][x - 1] && parseInt(map[y][x - 1]) <= myHeight) {
                isLowpoint = false;
            }
            if (map[y] && map[y][x + 1] && parseInt(map[y][x + 1]) <= myHeight) {
                isLowpoint = false;
            }
            if (map[y - 1] && map[y - 1][x] && parseInt(map[y - 1][x]) <= myHeight) {
                isLowpoint = false;
            }
            if (map[y + 1] && map[y + 1][x] && parseInt(map[y + 1][x]) <= myHeight) {
                isLowpoint = false;
            }
            if (isLowpoint) {
                lowpoints.push(myHeight);
            }
        }
    }
    return lowpoints;
}

function lowpointsToRisklevel(lowpoints: number[]) {
    const riskLevel: number =
        lowpoints.reduce((num, prev) => {
            return num + prev + 1;
        }) + 1;
    return riskLevel;
}

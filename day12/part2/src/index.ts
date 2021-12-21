import { readFileSync } from "fs";
import { Cave, createCaves } from "./cave";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(findAllPaths(input));
}

function findAllPaths(input: string[]) {
    const caves: Cave[] = createCaves(input);
    const queue: string[][] = [["start"]];
    const validPaths: string[][] = [];

    while (queue.length > 0) {
        const nextPathToConsider = queue.shift() || [];
        const nextCaveName = nextPathToConsider[nextPathToConsider.length - 1];
        let nextCave = caves[0]; // instantiate as the start cave, but will be overwritten in the next loop.
        for (let i = 0; i < caves.length; i++) {
            if (caves[i].name === nextCaveName) {
                nextCave = caves[i];
                break;
            }
        }

        const smallCaveTwice = checkDuplicateSmallCaves(nextPathToConsider);

        if (smallCaveTwice) {
            nextCave.neighbors.forEach((cave: Cave) => {
                if (cave.name === "end") {
                    validPaths.push([...nextPathToConsider, cave.name]);
                }
                // If the next cave is a small cave, but isn't on the current path yet, add it.
                else if (!nextPathToConsider.includes(cave.name) && cave.isSmall) {
                    queue.push([...nextPathToConsider, cave.name]);
                }
                // if the next cave is a large cave, then it doesn't matter if we've been there yet!
                else if (!cave.isSmall) {
                    queue.push([...nextPathToConsider, cave.name]);
                }
            });
        } else {
            nextCave.neighbors.forEach((cave: Cave) => {
                if (cave.name === "end") {
                    validPaths.push([...nextPathToConsider, cave.name]);
                }
                // if the next cave is a large cave, then it doesn't matter if we've been there yet!
                else if (cave.name !== "start") {
                    queue.push([...nextPathToConsider, cave.name]);
                }
            });
        }
    }

    return validPaths.length;
}

function checkDuplicateSmallCaves(nextPathToConsider: string[]) {
    const nextPathCopy: string[] = JSON.parse(JSON.stringify(nextPathToConsider));
    nextPathCopy.sort();

    let smallCaveTwice = false;
    for (let i = 1; i < nextPathCopy.length; i++) {
        if (nextPathCopy[i].toLowerCase() === nextPathCopy[i]) {
            if (nextPathCopy[i] === nextPathCopy[i - 1]) {
                smallCaveTwice = true;
            }
        }
    }

    return smallCaveTwice;
}

advent();

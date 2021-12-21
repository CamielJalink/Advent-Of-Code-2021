import { readFileSync } from "fs";
import { Location, Path, parseInput } from "./location";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    determineLowestRisk(input);
}

function determineLowestRisk(input: string[]) {
    const locations: Location[] = parseInput(input);
    const priorityQueue: Path[] = [];
    const startPath: Path = {
        nextLoc: locations[0],
        sumRisk: 0,
    };

    priorityQueue.push(startPath);
    // We never want to go back to the starting location.
    startPath.nextLoc.pathRiskFirstVisit = 0;

    let shortestPathFound = false;
    while (!shortestPathFound) {
        // eslint-disable-next-line
        const nextPath = priorityQueue.shift()!;

        nextPath.nextLoc.neighbors.forEach((loc: Location) => {
            // If one of the neighbors is our endpoint, then we must have found the shortest path!
            if (loc.isExit) {
                console.log(`Found the shortest path, it's risk is: ${nextPath.sumRisk + loc.riskLevel}`);
                shortestPathFound = true;
            }

            // this new location is only of interest if we haven't been here on a less risky path before.
            const pathRisk = nextPath.sumRisk + loc.riskLevel;
            if (loc.pathRiskFirstVisit === -1 || loc.pathRiskFirstVisit > pathRisk) {
                loc.pathRiskFirstVisit = pathRisk;
                // Insert the new path into the queue.
                insertIntoQueue(priorityQueue, loc, pathRisk);
            }
        });
    }
}

function insertIntoQueue(priorityQueue: Path[], loc: Location, pathRisk: number) {
    const nextPath: Path = { nextLoc: loc, sumRisk: pathRisk };

    if (priorityQueue.length === 0) {
        priorityQueue.push(nextPath);
    } else {
        let pathInserted = false;
        for (let i = 0; i < priorityQueue.length; i++) {
            if (priorityQueue[i].sumRisk >= pathRisk) {
                priorityQueue.splice(i, 0, nextPath);
                pathInserted = true;
                break;
            }
        }
        // if the path wasn't inserted succesfully, it must be the path with the highest risk so far.
        if (!pathInserted) {
            priorityQueue.push(nextPath);
        }
    }
}

advent();

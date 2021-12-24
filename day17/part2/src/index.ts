import { readFileSync } from "fs";
import { parseInput, determineVelocities } from "./helpers";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(determineHighestY(input[0]));
}

function determineHighestY(input: string) {
    const dimensions: number[] = parseInput(input);
    const relevantVelocities: number[][] = determineVelocities(dimensions);
    let numValidVelocities = 0;
    relevantVelocities.forEach((velocity: number[]) => {
        if (testShot(velocity, dimensions)) {
            numValidVelocities++;
        }
    });
    return numValidVelocities;
}

function testShot(velocity: number[], dimensions: number[]) {
    let velX = velocity[0];
    let velY = velocity[1];
    const minX = dimensions[0];
    const maxX = dimensions[1];
    const maxY = dimensions[2]; // lowest Y is max Y... right?
    const minY = dimensions[3];

    let x = 0;
    let y = 0;
    let highestY = 0;
    let shotValid = false;
    let stillChecking = true;

    while (stillChecking) {
        if (y > highestY) {
            highestY = y;
        }

        // If the probe is in the target zone, this is a succesfull shot!
        if (x >= minX && x <= maxX && y <= minY && y >= maxY) {
            shotValid = true;
            stillChecking = false;
        }

        // determine our next location based on current velocity.
        x += velX;
        y += velY;

        // detect whether we've overshot the target.
        if (x > maxX || y < maxY) {
            stillChecking = false;
        }

        // Horizontal velocity is dampened by water pressure.
        if (velX > 0) {
            velX--;
        }
        // y-velocity always feels gravity.
        velY--;
    }

    return shotValid;
}

advent();

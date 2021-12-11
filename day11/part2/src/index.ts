import { readFileSync } from "fs";
import Octopus from "./octopus";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(countFlashes(input));
}

function countFlashes(input: string[]) {
    const octopi: Octopus[] = initOctopi(input);
    const numSteps = 100;
    let numFlashes = 0;
    for (let i = 0; i < numSteps; i++) {
        numFlashes += countFlashesNextStep(octopi);
    }
    return numFlashes;
}

function countFlashesNextStep(octopi: Octopus[]) {
    let numFlashes = 0;
    // First, add 1 to the charge of each octopus for the day.
    octopi.forEach((octopus: Octopus) => {
        octopus.charge++;
    });

    let stillFlashing = true;
    // Keep checking for flashing octopi until none are flashing anymore this step.
    while (stillFlashing) {
        stillFlashing = false;

        octopi.forEach((octopus: Octopus) => {
            if (octopus.charge > 9) {
                numFlashes++;
                octopus.charge = 0;
                stillFlashing = true;
                octopus.neighbors.forEach((nb: Octopus) => {
                    if (nb.charge !== 0) {
                        nb.charge++;
                    }
                });
            }
        });
    }

    return numFlashes;
}

function initOctopi(input: string[]) {
    const octopi: Octopus[] = [];
    for (let y = 0; y < input.length; y++) {
        const stringOctopi = input[y].split("");
        for (let x = 0; x < input[0].length; x++) {
            octopi.push(new Octopus(x, y, parseInt(stringOctopi[x])));
        }
    }
    octopi.forEach((oct: Octopus) => {
        const x = oct.x;
        const y = oct.y;
        octopi.forEach((oct2: Octopus) => {
            const x2 = oct2.x;
            const y2 = oct2.y;
            if (Math.abs(x2 - x) <= 1 && Math.abs(y2 - y) <= 1 && !(x === x2 && y === y2)) {
                oct.neighbors.push(oct2);
            }
        });
    });
    return octopi;
}

advent();

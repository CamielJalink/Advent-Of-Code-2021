export function parseInput(input: string) {
    const instructions: string[] = input.split(": ")[1].split(", ");
    const xInstructions: number[] = instructions[0]
        .substring(2)
        .split("..")
        .map((stringX) => parseInt(stringX));
    const yInstructions: number[] = instructions[1]
        .substring(2)
        .split("..")
        .map((stringY) => parseInt(stringY));

    return [...xInstructions, ...yInstructions];
}

export function determineVelocities(dimensions: number[]) {
    const maxX = dimensions[1];
    const maxY = dimensions[2]; // I guess I mean minY, but i'm stubborn...
    const relevantVelocities: number[][] = [];

    for (let y = 0; y <= Math.abs(maxY); y++) {
        for (let x = 0; x <= maxX; x++) {
            relevantVelocities.push([x, y]);
        }
    }

    return relevantVelocities;
}

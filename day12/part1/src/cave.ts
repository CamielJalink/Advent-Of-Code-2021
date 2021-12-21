export class Cave {
    name: string;
    neighbors: Cave[] = [];
    isSmall = false;
    constructor(name: string) {
        this.name = name;
        // if your name is lowercase, you are a small cave
        if (name !== name.toUpperCase()) {
            this.isSmall = true;
        }
    }
}

export function createCaves(input: string[]) {
    const letters = new Set<string>();
    // Each path is between two caves. Add those caves to a set to get all unique caves.
    input.forEach((path: string) => {
        letters.add(path.split("-")[0]);
        letters.add(path.split("-")[1]);
    });

    // Create an array of caves for each unique letter.
    const caves: Cave[] = [];
    letters.forEach((letter: string) => {
        caves.push(new Cave(letter));
    });

    // have caves know their direct neighbor!
    caves.forEach((cave: Cave) => {
        input.forEach((path: string) => {
            if (path.split("-")[0] === cave.name) {
                caves.forEach((neighborCave) => {
                    if (neighborCave.name === path.split("-")[1]) {
                        cave.neighbors.push(neighborCave);
                    }
                });
            } else if (path.split("-")[1] === cave.name) {
                caves.forEach((neighborCave) => {
                    if (neighborCave.name === path.split("-")[0]) {
                        cave.neighbors.push(neighborCave);
                    }
                });
            }
        });
    });
    return caves;
}

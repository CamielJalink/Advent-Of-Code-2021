export default class Location {
    x: number;
    y: number;
    riskLevel: number;
    neighbors: Location[] = [];
    isStart = false;
    isExit = false;
    constructor(x: number, y: number, riskLevel: number) {
        this.x = x;
        this.y = y;
        this.riskLevel = riskLevel;
    }

    findShortestPath() {
        if (this.isExit) {
            return this.riskLevel;
        } else {
            // Bekijk welk van mijn neighbors het kortste pad heeft, en tel daar mijn riskLevel bij op.
            // ...maaaaarrrr hoe voorkom ik loops!
            // Een neighbor met hoog eigen risklevel kan toch het kortste pad zijn.
            //
        }

        return 0;
    }
}

export default class Octopus {
    x: number;
    y: number;
    charge: number;
    neighbors: Octopus[] = [];
    constructor(x: number, y: number, charge: number) {
        this.x = x;
        this.y = y;
        this.charge = charge;
    }

    // flash() {
    //     this.hasFlashed = true;
    //     this.charge = 0;
    //     this.neighbors.forEach((nb: Octopus) => {
    //         if( !nb.hasFlashed ) {
    //             nb.charge++;

    //         }
    //     });
    // }
}

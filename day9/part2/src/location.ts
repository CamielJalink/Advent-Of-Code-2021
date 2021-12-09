export default class Location {
    x: number;
    y: number;
    flowtoNeighborX: number; // -1 if no flowToNeighbor exists
    flowtoNeighborY: number; // -1 if no flowToNeighbor exists
    height: number;
    isLowpoint = false;
    basinSize = 0;
    flowtoNeighbor: Location | undefined = undefined;

    constructor(x: number, y: number, height: number, flowtoNeighborX: number, flowtoNeighborY: number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.flowtoNeighborX = flowtoNeighborX;
        this.flowtoNeighborY = flowtoNeighborY;
    }

    determineBasinSize() {
        if (this.height === 9) {
            // locations with height 9 don't count toward a basins size
            return;
        } else if (this.isLowpoint) {
            // If this location is the lowpoint, then add itself to the basin size.
            this.basinSize++;
        } else if (this.flowtoNeighbor && this.flowtoNeighbor.isLowpoint) {
            // if the neighbor I will flow to is the lowpoint, add my point to that basin size.
            this.flowtoNeighbor.basinSize++;
        } else {
            // my basin will be the same one as my neighbor, who is closer to it's low point.
            this.flowtoNeighbor?.determineBasinSize();
        }
    }
}

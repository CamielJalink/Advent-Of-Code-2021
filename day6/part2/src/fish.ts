export default class Fish {
    lookupKey: number[];
    lookupTable: number[][];
    numOffspring = 1; // count yourself!
    children: Fish[] = [];
    daysLeft: number;
    daysTilDelivery: number;

    constructor(daysLeft: number, daysTilDelivery: number, lookupTable: number[][]) {
        this.lookupKey = [daysLeft, daysTilDelivery];
        this.lookupTable = lookupTable;
        daysLeft = daysLeft - daysTilDelivery; // time stamp the first child will be born.
        this.daysLeft = daysLeft;
        this.daysTilDelivery = daysTilDelivery;
    }

    countFish() {
        let numFish: number = this.lookupTable[this.lookupKey[0]][this.lookupKey[1]];
        if (numFish !== -1) {
            return numFish;
        } else {
            this.determineChildren();
            // If this fish doesn't have any children, write a 1 to the lookup table.
            if (this.children.length === 0) {
                this.lookupTable[this.lookupKey[0]][this.lookupKey[1]] = 1;
                return 1;
            } else {
                numFish = 1;
                this.children.forEach((childFish: Fish) => {
                    numFish += childFish.countFish();
                });
                this.lookupTable[this.lookupKey[0]][this.lookupKey[1]] = numFish;
                return numFish;
            }
        }
    }

    lookup(lookupKey: number[]) {
        return this.lookupTable[lookupKey[0]][lookupKey[1]];
    }

    determineChildren() {
        while (this.daysLeft > 0) {
            this.children.push(new Fish(this.daysLeft - 1, 8, this.lookupTable));
            this.daysLeft -= 7;
        }
    }
}

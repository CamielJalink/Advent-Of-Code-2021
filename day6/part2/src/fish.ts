import keyValue from "./keyValue";
export default class Fish {
    lookupKey: string;
    lookupTable: keyValue[];
    numOffspring = 0;
    children: Fish[] = [];

    constructor(daysLeft: number, daysTilDelivery: number, lookupTable: keyValue[]) {
        this.lookupKey = `${String(daysLeft)}-${String(daysTilDelivery)}`;
        this.lookupTable = lookupTable;
        this.lookupTable.push({ key: this.lookupKey, value: daysTilDelivery });

        daysLeft = daysLeft - daysTilDelivery; // time stamp the first child will be born.
        while (daysLeft > 0) {
            this.children.push(new Fish(daysLeft, 8, lookupTable));
            daysLeft -= 7;
        }

        console.log(this.children);
    }

    countFish() {
        return this.numOffspring;
    }
}

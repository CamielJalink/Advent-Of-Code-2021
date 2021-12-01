// Your goal now is to count the number of times the sum of measurements in this sliding window increases from the previous sum. So, compare A with B, then compare B with C, then C with D, and so on. Stop when there aren't enough measurements left to create a new three-measurement sum.

import { getIncreases, getNumberArray } from "./part1";

function getWindowIncreases() {
    const numbers = getNumberArray();
    let windowTotals: number[] = [];

    numbers.forEach((number, i) => {
        windowTotals = [...windowTotals, number + numbers[i + 1] + numbers[i + 2]];
    });

    return getIncreases(windowTotals);
}

export const part2 = getWindowIncreases();

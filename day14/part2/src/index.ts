import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    console.log(buildPolymer(input));
}

function buildPolymer(input: string[]) {
    const firstLetter = input[0][0];
    const lastLetter = input[0][input[0].length - 1];
    let build = fillInitialMap(input[0]);
    const rules: string[][] = parseRules(input[1]);

    for (let day = 0; day < 40; day++) {
        build = applyRules(build, rules);
    }

    return determineOuput(build, firstLetter, lastLetter);
}

function determineOuput(build: Map<string, bigint>, firstLetter: string, lastLetter: string) {
    const amountOfLetters = new Map<string, bigint>();

    // Count each letter in the keys of build.
    build.forEach((value: bigint, key: string) => {
        const letterValue1: bigint = amountOfLetters.get(key[0]) || BigInt(0);
        const newValue = letterValue1 + value;
        amountOfLetters.set(key[0], newValue);

        const letterValue2: bigint = amountOfLetters.get(key[1]) || BigInt(0);
        const newValue2 = letterValue2 + value;
        amountOfLetters.set(key[1], newValue2);
    });

    // Since almost each letter was just counted twice, halve the values!
    amountOfLetters.forEach((value: bigint, key: string) => {
        amountOfLetters.set(key, value / BigInt(2));
    });

    // The first letter was only counted once, but still divided for, so add one.
    let amountFirstLetter = amountOfLetters.get(firstLetter) || BigInt(0);
    amountFirstLetter = amountFirstLetter + BigInt(1);
    amountOfLetters.set(firstLetter, amountFirstLetter);
    // Same for the last letter
    let amountLastLetter = amountOfLetters.get(lastLetter) || BigInt(0);
    amountLastLetter = amountLastLetter + BigInt(1);
    amountOfLetters.set(lastLetter, amountLastLetter);

    let mostOccurringAmount = BigInt(0);
    let leastOccurringAmount = BigInt(-1);
    amountOfLetters.forEach((value: bigint) => {
        if (value > mostOccurringAmount) {
            mostOccurringAmount = value;
        }
        if (leastOccurringAmount === BigInt(-1) || value < leastOccurringAmount) {
            leastOccurringAmount = value;
        }
    });

    return mostOccurringAmount - leastOccurringAmount;
}

function applyRules(build: Map<string, bigint>, rules: string[][]) {
    const newBuild: Map<string, bigint> = new Map();

    // We'll fill a new map by mapping the current key's into new keys using the rules.
    build.forEach((oldValue: bigint, key: string) => {
        rules.forEach((rule: string[]) => {
            if (key === rule[0]) {
                const nextKey1: string = rule[0][0] + rule[1];
                const value1 = newBuild.get(nextKey1) || BigInt(0);
                newBuild.set(nextKey1, value1 + BigInt(oldValue));

                // Other rules may result in the same keys, so check for their value before setting it
                const nextKey2: string = rule[1] + rule[0][1];
                const value2 = newBuild.get(nextKey2) || BigInt(0);
                newBuild.set(nextKey2, value2 + BigInt(oldValue));
            }
        });
    });
    return newBuild;
}

function fillInitialMap(buildString: string) {
    const build = new Map<string, bigint>();
    for (let i = 1; i < buildString.length; i++) {
        const key = buildString[i - 1] + buildString[i];
        const prevValue = build.get(key) || BigInt(0);
        build.set(key, prevValue + BigInt(1));
    }
    return build;
}

function parseRules(input: string) {
    const rules: string[][] = input.split("\r\n").map((stringRule) => {
        return stringRule.split(" -> ");
    });
    return rules;
}

advent();

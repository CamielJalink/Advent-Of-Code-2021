import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    console.log(buildPolymer(input));
}

function buildPolymer(input: string[]) {
    let build = fillInitialMap(input[0]);
    const rules: string[][] = parseRules(input[1]);

    for (let day = 0; day < 10; day++) {
        build = applyRules(build, rules);
    }
    return determineOuput(build);
}

function determineOuput(build: Map<string, bigint>) {
    const amountOfLettersFirst = new Map<string, bigint>();
    const amountOfLettersLast = new Map<string, bigint>();
    const amountOfLetters = new Map<string, bigint>();

    build.forEach((value: bigint, key: string) => {
        const letterValue1: bigint = amountOfLettersFirst.get(key[0]) || BigInt(0);
        const newValue = letterValue1 + value;
        amountOfLettersFirst.set(key[0], newValue);

        const letterValue2: bigint = amountOfLettersLast.get(key[1]) || BigInt(0);
        const newValue2 = letterValue2 + value;
        amountOfLettersLast.set(key[1], newValue2);
    });

    amountOfLettersFirst.forEach((value: bigint, key: string) => {
        const lastValue: bigint = amountOfLettersLast.get(key) || BigInt(0);
        if (value > lastValue) {
            amountOfLetters.set(key, value);
        } else {
            amountOfLetters.set(key, lastValue);
        }
    });

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

    // Part 1 code zegt dat het dit moe tzijn voor 10 loops:
    // 3573
    // 515;
    // 3058;
    console.log(mostOccurringAmount);
    console.log(leastOccurringAmount);
    return mostOccurringAmount - leastOccurringAmount;
}

function applyRules(build: Map<string, bigint>, rules: string[][]) {
    const newBuild: Map<string, bigint> = new Map();

    // We'll fill a new map by mapping the current key's into new keys using the rules.
    build.forEach((oldValue: bigint, key: string) => {
        rules.forEach((rule: string[]) => {
            if (key === rule[0]) {
                const nextKey1: string = rule[0][0] + rule[1];
                const nextKey2: string = rule[1] + rule[0][1];
                // Other rules may result in the same keys, so check for their value before setting it
                const value1 = newBuild.get(nextKey1) || BigInt(0);
                const value2 = newBuild.get(nextKey2) || BigInt(0);
                newBuild.set(nextKey1, value1 + BigInt(oldValue));
                newBuild.set(nextKey2, value2 + BigInt(oldValue));
            }
        });
    });
    return newBuild;
}

function fillInitialMap(buildString: string) {
    const build = new Map();
    for (let i = 1; i < buildString.length; i++) {
        build.set(buildString[i - 1] + buildString[i], 1);
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

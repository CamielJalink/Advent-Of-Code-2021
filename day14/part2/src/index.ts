import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    console.log(buildPolymer(input));
}

function buildPolymer(input: string[]) {
    let build = input[0];
    const rules: string[][] = parseRules(input[1]);

    // For part 1, we only loop 10 days.
    for (let day = 0; day < 10; day++) {
        build = applyRules(build, rules);
    }

    return determineOutput(build, rules);
}

// Not my proudest moment...
function determineOutput(build: string, rules: string[][]) {
    // Determine all the unique characters that can be found in the output.
    const uniqueChars: string[] = [];
    rules.forEach((rule: string[]) => {
        const chars: string[] = [rule[0][0], rule[0][1], rule[1]];
        for (let i = 0; i < chars.length; i++) {
            if (!uniqueChars.includes(chars[i])) {
                uniqueChars.push(chars[i]);
            }
        }
    });

    const charCounter: number[] = [];
    for (let i = 0; i < uniqueChars.length; i++) {
        charCounter.push(0);
    }

    for (let i = 0; i < build.length; i++) {
        for (let j = 0; j < uniqueChars.length; j++) {
            if (build[i] === uniqueChars[j]) {
                charCounter[j]++;
            }
        }
    }

    const leastOccuring: number = Math.min(...charCounter);
    const mostOccuring: number = Math.max(...charCounter);
    return mostOccuring - leastOccuring;
}

function applyRules(build: string, rules: string[][]) {
    let nextBuild = build;
    for (let i = 1; i < build.length; i++) {
        const compare: string = build[i - 1] + build[i];

        rules.forEach((rule: string[]) => {
            if (rule[0] === compare) {
                // place rule[1] between the first and second character of rule[0]
                nextBuild = nextBuild.replace(rule[0], rule[0][0] + rule[1] + rule[0][1]);
            }
        });
    }

    return nextBuild;
}

function parseRules(input: string) {
    const rules: string[][] = input.split("\r\n").map((stringRule) => {
        return stringRule.split(" -> ");
    });
    return rules;
}

advent();

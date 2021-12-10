import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(findCompletionStringScore(input));
}

advent();

function findCompletionStringScore(input: string[]) {
    const remainingOpeningLines: string[][] = [];
    input.forEach((line: string) => {
        const remainingOpenings: string[] = parseLine(line);
        if (remainingOpenings.length > 0) {
            remainingOpeningLines.push(remainingOpenings);
        }
    });
    const completionStringScores: number[] = [];
    remainingOpeningLines.forEach((openings: string[]) => {
        completionStringScores.push(determineCompletionScore(openings));
    });
    completionStringScores.sort((a, b) => a - b);
    return completionStringScores[Math.ceil(completionStringScores.length / 2) - 1];
}

// the openings contain all the remaining openings of a line that was incomplete.
function determineCompletionScore(openings: string[]) {
    const closingBrackets: string[] = [];
    openings.forEach((opening: string) => {
        switch (opening) {
            case "(":
                closingBrackets.unshift(")");
                break;
            case "[":
                closingBrackets.unshift("]");
                break;
            case "{":
                closingBrackets.unshift("}");
                break;
            case "<":
                closingBrackets.unshift(">");
                break;
            default:
                console.error("parsing closing brackets broke!");
        }
    });

    let completionScore = 0;
    closingBrackets.forEach((closing: string) => {
        completionScore *= 5;
        switch (closing) {
            case ")":
                completionScore += 1;
                break;
            case "]":
                completionScore += 2;
                break;
            case "}":
                completionScore += 3;
                break;
            case ">":
                completionScore += 4;
                break;
            default:
                console.error("calculating completion score broke!");
        }
    });
    return completionScore;
}

function parseLine(line: string) {
    const openingBrackets: string[] = [];
    let wrongClosingBracket = "error";

    for (const c of line) {
        if (c === "(" || c === "[" || c === "{" || c === "<") {
            openingBrackets.push(c);
        } else {
            const prev = openingBrackets[openingBrackets.length - 1];
            if (c === ")") {
                if (prev === "(") {
                    openingBrackets.pop();
                } else {
                    wrongClosingBracket = c;
                    break;
                }
            } else if (c === "]") {
                if (prev === "[") {
                    openingBrackets.pop();
                } else {
                    wrongClosingBracket = c;
                    break;
                }
            } else if (c === "}") {
                if (prev === "{") {
                    openingBrackets.pop();
                } else {
                    wrongClosingBracket = c;
                    break;
                }
            } else if (c === ">") {
                if (prev === "<") {
                    openingBrackets.pop();
                } else {
                    wrongClosingBracket = c;
                    break;
                }
            }
        }
    }

    // If this is the case, then we have an incomplete line.
    if (wrongClosingBracket === "error") {
        // return the remaining openingbrackets!
        return openingBrackets;
    } else {
        return [];
    }
}

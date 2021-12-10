import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    console.log(findSyntaxErrorScore(input));
}

advent();

function findSyntaxErrorScore(input: string[]) {
    let syntaxErrorScore = 0;
    input.forEach((line: string) => {
        syntaxErrorScore += parseLine(line);
    });
    return syntaxErrorScore;
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

    if (wrongClosingBracket === ")") {
        return 3;
    } else if (wrongClosingBracket === "]") {
        return 57;
    } else if (wrongClosingBracket === "}") {
        return 1197;
    } else if (wrongClosingBracket === ">") {
        return 25137;
    } else {
        return 0;
    }
}

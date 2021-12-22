import { readFileSync } from "fs";
import { parseHexToBinary, removeTrailingZeroes, findLiteral } from "./helpers";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    parseInput(input);
}

function parseInput(input: string[]) {
    let packet = parseHexToBinary(input[0]);
    packet = removeTrailingZeroes(packet);

    // header = version and then typeId. The rest is the body.
    const version = parseInt(packet.substring(0, 3), 2);
    const typeId = parseInt(packet.substring(3, 6), 2);
    const packetBody = packet.substring(6);

    // typeId = 4 means: find the literal number hidden in the body.
    if (typeId === 4) {
        const literalValue = findLiteral(packetBody);
        console.log(literalValue);
    }
}

advent();

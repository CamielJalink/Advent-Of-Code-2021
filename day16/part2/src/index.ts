import { readFileSync } from "fs";
import { parseHexToBinary, removeTrailingZeroes } from "./helpers";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");

    const packet = parseHexToBinary(input[0]);
    const values: number[] = [];
    parsePacket(packet, values, -1);
    console.log(values);
}

function parsePacket(packet: string, values: number[], subPacketsUntilReturn: number) {
    // header = version and then typeId. The rest is the body.
    const version = parseInt(packet.substring(0, 3), 2);
    const typeId = parseInt(packet.substring(3, 6), 2);
    packet = packet.substring(6);

    // typeId = 4 means: find the literal number hidden in the body.
    if (typeId === 4) {
        let remainingPacket = packet;
        let binaryLiteralString = "";
        for (let i = 5; i <= packet.length; i += 5) {
            if (packet[i - 5] === "1") {
                binaryLiteralString += packet.substring(i - 4, i);
                remainingPacket = packet.substring(i);
            } else if (packet[i - 5] === "0") {
                binaryLiteralString += packet.substring(i - 4, i);
                remainingPacket = packet.substring(i);
                break;
            }
        }
        const literalValue = parseInt(binaryLiteralString, 2);
        values.push(literalValue);
        packet = remainingPacket;
    }
    // else, we're an operator!
    else {
        const lengthTypeId = packet[0];
        packet = packet.substring(1);
        const subPacketsValues: number[] = [];

        if (lengthTypeId === "0") {
            // This number tells us how many of the upcoming bits are relevant (the rest will be 0s to be ignored)
            const lengthOfSubPackets = parseInt(packet.substring(0, 15), 2);
            packet = packet.substring(15);
            const subPackets = packet.substring(0, lengthOfSubPackets);
            packet = packet.substring(lengthOfSubPackets);
            parsePacket(subPackets, subPacketsValues, -1);
        } else if (lengthTypeId === "1") {
            const numSubpacketsContained = parseInt(packet.substring(0, 11), 2);
            packet = packet.substring(11);
            packet = parsePacket(packet, subPacketsValues, numSubpacketsContained);
        } else {
            console.error("This isn't allowed to happen!");
        }

        // type 0 is sum
        if (typeId === 0) {
            const sum = subPacketsValues.reduce((sum: number, next: number) => sum + next);
            values.push(sum);
        }
        // type 1 is product
        else if (typeId === 1) {
            const product = subPacketsValues.reduce((product: number, next: number) => product * next);
            values.push(product);
        }
        // type 2 is minimum
        else if (typeId === 2) {
            const min = Math.min(...subPacketsValues);
            values.push(min);
        }
        // type 3 is maximum
        else if (typeId === 3) {
            const max = Math.max(...subPacketsValues);
            values.push(max);
        }
        // type 5 is greater than: value is one if the first value is greater than the second
        else if (typeId === 5) {
            let greaterThan: number;
            subPacketsValues[0] > subPacketsValues[1] ? (greaterThan = 1) : (greaterThan = 0);
            values.push(greaterThan);
        }
        // type 6 is less than
        else if (typeId === 6) {
            let lesserThan: number;
            subPacketsValues[0] < subPacketsValues[1] ? (lesserThan = 1) : (lesserThan = 0);
            values.push(lesserThan);
        }
        // type 7 is equals
        else if (typeId === 7) {
            let equals: number;
            subPacketsValues[0] === subPacketsValues[1] ? (equals = 1) : (equals = 0);
            values.push(equals);
        }
    }

    // Als hij hier nog lengte heeft, doe het met wat overblijft,
    // als niet,
    if (packet.length > 0 && removeTrailingZeroes(packet).length > 0) {
        subPacketsUntilReturn--;
        if (subPacketsUntilReturn > 0) {
            packet = parsePacket(packet, values, subPacketsUntilReturn);
        } else if (subPacketsUntilReturn === 0) {
            return packet;
        } else {
            packet = parsePacket(packet, values, -1);
        }
    }

    return packet;
}

advent();

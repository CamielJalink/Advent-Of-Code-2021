import { readFileSync } from "fs";
import { parseHexToBinary, removeTrailingZeroes } from "./helpers";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");

    const packet = parseHexToBinary(input[0]);
    const versionValues: number[] = [];
    parsePacket(packet, versionValues, -1);
    console.log(versionValues.reduce((prev: number, next: number) => prev + next));
}

function parsePacket(packet: string, versionValues: number[], subPacketsUntilReturn: number) {
    // header = version and then typeId. The rest is the body.
    const version = parseInt(packet.substring(0, 3), 2);
    versionValues.push(version);
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
        packet = remainingPacket;
    }
    // else, we're an operator!
    else {
        const lengthTypeId = packet[0];
        packet = packet.substring(1);

        if (lengthTypeId === "0") {
            // This number tells us how many of the upcoming bits are relevant (the rest will be 0s to be ignored)
            const lengthOfSubPackets = parseInt(packet.substring(0, 15), 2);
            packet = packet.substring(15);
            const subPackets = packet.substring(0, lengthOfSubPackets);
            packet = packet.substring(lengthOfSubPackets);
            parsePacket(subPackets, versionValues, -1);
        } else if (lengthTypeId === "1") {
            const numSubpacketsContained = parseInt(packet.substring(0, 11), 2);
            packet = packet.substring(11);
            packet = parsePacket(packet, versionValues, numSubpacketsContained);
        } else {
            console.error("This isn't allowed to happen!");
        }
    }

    // Als hij hier nog lengte heeft, doe het met wat overblijft,
    // als niet,
    if (packet.length > 0 && removeTrailingZeroes(packet).length > 0) {
        subPacketsUntilReturn--;
        if (subPacketsUntilReturn > 0) {
            packet = parsePacket(packet, versionValues, subPacketsUntilReturn);
        } else if (subPacketsUntilReturn === 0) {
            return packet;
        } else {
            packet = parsePacket(packet, versionValues, -1);
        }
    }

    return packet;
}

advent();

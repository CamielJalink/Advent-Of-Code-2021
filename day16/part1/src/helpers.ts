export function parseHexToBinary(input: string) {
    let bitInput = "";
    for (const char of input) {
        switch (char) {
            case "0":
                bitInput += "0000";
                break;
            case "1":
                bitInput += "0001";
                break;
            case "2":
                bitInput += "0010";
                break;
            case "3":
                bitInput += "0011";
                break;
            case "4":
                bitInput += "0100";
                break;
            case "5":
                bitInput += "0101";
                break;
            case "6":
                bitInput += "0110";
                break;
            case "7":
                bitInput += "0111";
                break;
            case "8":
                bitInput += "1000";
                break;
            case "9":
                bitInput += "1001";
                break;
            case "A":
                bitInput += "1010";
                break;
            case "B":
                bitInput += "1011";
                break;
            case "C":
                bitInput += "1100";
                break;
            case "D":
                bitInput += "1101";
                break;
            case "E":
                bitInput += "1110";
                break;
            case "F":
                bitInput += "1111";
                break;
            default:
                break;
        }
    }

    return bitInput;
}

export function removeTrailingZeroes(packet: string) {
    let cleanedPacket = packet;
    for (let i = 0; i <= packet.length; i++) {
        if (packet[i] === "0") {
            cleanedPacket = packet.substring(i + 1);
        } else {
            break;
        }
    }
    return cleanedPacket;
}

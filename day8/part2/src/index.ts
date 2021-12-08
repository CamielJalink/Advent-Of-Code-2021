import { readFileSync } from "fs";

interface keyValue {
    key: string;
    value: number;
}

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");

    let outputValuesSum = 0;
    input.forEach((input) => {
        outputValuesSum += determineNumber(input);
    });
    console.log(outputValuesSum);
}

function determineNumber(input: string) {
    const digitCodes: string[] = input.split(" | ")[0].split(" ");
    const numberCode: string[] = input.split(" | ")[1].split(" ");
    // Dont forget to sort letters in everycode for ease!
    // Can I sort() a string?
    console.log(digitCodes);
    console.log(numberCode);

    const translatedDigits: keyValue[] = initTranslatedDigits(digitCodes);
    // translatedDigits vast vullen met de gesorteerde keys, maar met lege values.

    return translateNumberCode(translatedDigits, numberCode);
}

function initTranslatedDigits(digitCodes: string[]) {
    const translatedDigits: keyValue[] = [];
    // First, sort the strings before we use them as keys.

    digitCodes.forEach((code: string) => {
        translatedDigits.push({ key: code, value: -1 }); // init with a not-allowed -1 value
    });
    return translatedDigits;
}

function translateNumberCode(translatedDigits, numberCode: string[]) {
    return 1;
}

advent();

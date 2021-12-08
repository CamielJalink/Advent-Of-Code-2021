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
    let digitCodes: string[] = input.split(" | ")[0].split(" ");
    let numberCodes: string[] = input.split(" | ")[1].split(" ");
    // change the strings to be on alphabetical order.
    digitCodes = stringSort(digitCodes);
    numberCodes = stringSort(numberCodes);

    // Initialize our translatedDigits array for simplicity.
    let translatedDigits: keyValue[] = initTranslatedDigits(digitCodes);
    translatedDigits = decipherDigits(translatedDigits);
    return translateNumberCode(translatedDigits, numberCodes);
}

function decipherDigits(digits: keyValue[]) {
    const fiveLengthCodes: string[] = [];
    const sixLengthCodes: string[] = [];

    let stringOne = "";
    let stringFour = "";

    // The 1, 4, 7 and 8 digits are easy to determine by their length. Fix these first!
    digits.forEach((digit) => {
        if (digit.key.length === 2) {
            digit.value = 1;
            stringOne = digit.key;
        } else if (digit.key.length === 3) {
            digit.value = 7;
        } else if (digit.key.length === 4) {
            digit.value = 4;
            stringFour = digit.key;
        } else if (digit.key.length === 7) {
            digit.value = 8;
        } else if (digit.key.length === 5) {
            fiveLengthCodes.push(digit.key);
        } else if (digit.key.length === 6) {
            sixLengthCodes.push(digit.key);
        }
    });

    // Of the 3 5-length numbers, the code corresponding to the number 5 is the ONLY one that contains
    // the two symbols found in 4 but not found in 1.
    // The code corresponding to the number 1 is the ONLY one that contains the two segments found in the 1
    // And the code corresponding to the number 2 is last one.
    let searchString = stringFour;
    for (let i = 0; i < stringOne.length; i++) {
        searchString = searchString.replace(stringOne[i], "");
    }

    let stringCodeFive = "";
    let stringCodeThree = "";
    let stringCodeTwo = "";
    fiveLengthCodes.forEach((code: string) => {
        if (code.includes(searchString[0]) && code.includes(searchString[1])) {
            stringCodeFive = code;
        } else if (code.includes(stringOne[0]) && code.includes(stringOne[1])) {
            stringCodeThree = code;
        } else {
            stringCodeTwo = code;
        }
    });

    // Of the three six length numbers (0, 6 and 9), only the 6 does not contain the 1.
    // Of the remaining two, ONLY the 9 contains the 4.
    // Which leaves the last remaining code: the 0
    let stringCodeSix = "";
    let stringCodeNine = "";
    let stringCodeZero = "";
    sixLengthCodes.forEach((code: string) => {
        if (code.includes(stringOne[0]) === false || code.includes(stringOne[1]) === false) {
            stringCodeSix = code;
        } else if (
            code.includes(stringFour[0]) &&
            code.includes(stringFour[1]) &&
            code.includes(stringFour[2]) &&
            code.includes(stringFour[3])
        ) {
            stringCodeNine = code;
        } else {
            stringCodeZero = code;
        }
    });

    digits.forEach((digit: keyValue) => {
        if (digit.key === stringCodeZero) {
            digit.value = 0;
        } else if (digit.key === stringCodeTwo) {
            digit.value = 2;
        } else if (digit.key === stringCodeThree) {
            digit.value = 3;
        } else if (digit.key === stringCodeFive) {
            digit.value = 5;
        } else if (digit.key === stringCodeSix) {
            digit.value = 6;
        } else if (digit.key === stringCodeNine) {
            digit.value = 9;
        }
    });

    return digits;
}

// Using the deciphered digits, translate the number hidden in the codes.
function translateNumberCode(translatedDigits: keyValue[], numberCodes: string[]) {
    let targetStringNumber = "";

    numberCodes.forEach((code: string) => {
        translatedDigits.forEach((digit: keyValue) => {
            if (code === digit.key) {
                targetStringNumber += String(digit.value);
            }
        });
    });

    return parseInt(targetStringNumber);
}

// sort strings in inputarrays alphabetically for easier comparison.
function stringSort(stringCodes: string[]) {
    const newStringCodes: string[] = stringCodes.map((stringCode: string) => {
        return stringCode
            .split("")
            .sort()
            .reduce((prev, curr) => prev + curr);
    });
    return newStringCodes;
}

function initTranslatedDigits(digitCodes: string[]) {
    const translatedDigits: keyValue[] = [];
    digitCodes.forEach((code: string) => {
        translatedDigits.push({ key: code, value: -1 }); // init with a not-allowed -1 value
    });
    return translatedDigits;
}

advent();

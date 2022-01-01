export default function doExplode(num: string) {
    let explodedString = num;
    let depth = 0;

    for (let i = 0; i < num.length; i++) {
        if (num[i] === "[") {
            depth++;
        }
        if (num[i] === "]") {
            depth--;
        }
        if (depth >= 5) {
            explodedString = explodeHere(i, num);
            break;
        }
    }

    return explodedString;
}

function explodeHere(i: number, num: string) {
    const explodedString = num;

    const partToExplode = num.substring(i, i + 5);
    const leftExplodedNum = parseInt(num[i + 1]);
    const explodedStringLeftPart = explodeLeft(i, num, leftExplodedNum);
    const rightExplodedNum = parseInt(num[i + 3]);
    const explodedStringRightPart = explodeRight(i, num, rightExplodedNum);

    console.log(explodedStringLeftPart + explodedStringRightPart);

    return explodedString;
}

// This function rebuilds the number string part left of the exploded number.
function explodeLeft(i: number, num: string, leftExplodedNum: number) {
    let leftNumLoc = -1;
    let leftNum = -1;

    for (let j = 0; j < i; j++) {
        if (!isNaN(parseInt(num[j]))) {
            leftNum = parseInt(num[j]);
            leftNumLoc = j;
        }
    }

    let explodedStringLeftPart = "";
    if (leftNum !== -1) {
        const leftPart = num.substring(0, leftNumLoc);
        const rightPart = num.substring(leftNumLoc + 1, i);
        explodedStringLeftPart = leftPart + String(leftNum + leftExplodedNum) + rightPart; // leftExplodedNum = linker van tuple
    } else {
        explodedStringLeftPart = num.substring(0, i); // might be off by one
    }

    return explodedStringLeftPart;
}

// This function rebuilds the number string part left of the exploded number.
function explodeRight(i: number, num: string, rightExplodedNum: number) {
    let rightNumLoc = -1;
    let rightNum = -1;

    for (let j = i + 4; j < num.length; j++) {
        if (!isNaN(parseInt(num[j]))) {
            rightNum = parseInt(num[j]);
            rightNumLoc = j;
            break;
        }
    }

    let explodedStringRightPart = "";
    if (rightNum !== -1) {
        const leftPart = num.substring(i + 5, rightNumLoc); // oef dat klopt misschien nog niet...
        const rightPart = num.substring(rightNumLoc + 1, num.length);
        explodedStringRightPart = leftPart + String(rightNum + rightExplodedNum) + rightPart;
    } else {
        explodedStringRightPart = num.substring(i + 5, num.length);
    }

    return explodedStringRightPart;
}

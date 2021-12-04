import { readFileSync } from "fs";
import BingoBoard from "./bingoBoard";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n\r\n");
    playBingo(input);
}

function playBingo(input: string[]) {
    const chosenNumbers = (input.shift() || "").split(",").map((stringNumber) => parseInt(stringNumber));

    const bingoBoards: BingoBoard[] = [];
    input.forEach((stringBoard: string) => {
        bingoBoards.push(new BingoBoard(stringBoard, chosenNumbers));
    });

    bingoBoards.forEach((bingoBoard) => {
        bingoBoard.playBingo();
    });

    // Check which bingoBoard finished first. That boards score is the winning score!
    let fastestWin = chosenNumbers.length;
    let winningScore;
    bingoBoards.forEach((bingoBoard) => {
        if (bingoBoard.winningTurn < fastestWin) {
            fastestWin = bingoBoard.winningTurn;
            winningScore = bingoBoard.score;
        }
    });

    console.log(`The highest score found is: ${winningScore}`);
}

advent();

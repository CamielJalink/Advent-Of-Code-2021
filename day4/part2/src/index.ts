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

    // Check which bingoBoard finished last. That boards score is the puzzel output!
    let slowestWin = 0;
    let losingScore;
    bingoBoards.forEach((bingoBoard) => {
        if (bingoBoard.winningTurn > slowestWin) {
            slowestWin = bingoBoard.winningTurn;
            losingScore = bingoBoard.score;
        }
    });

    console.log(`The highest score found is: ${losingScore}`);
}

advent();

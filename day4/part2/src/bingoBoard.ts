export default class BingoBoard {
    chosenNumbers: number[];
    winningNumber = -1;
    rows: number[][] = [];
    columns: number[][] = [];
    winningTurn = -1;
    score = 0;

    constructor(stringBoard: string, chosenNumbers: number[]) {
        this.chosenNumbers = chosenNumbers;

        const stringRows = stringBoard.split("\r\n");
        const stringRowsChars: string[][] = [];
        stringRows.forEach((stringRow) => {
            stringRowsChars.push(stringRow.split(" ").filter((char) => char !== ""));
        });

        stringRowsChars.forEach((stringRow) => {
            this.rows.push(stringRow.map((char) => parseInt(char)));
        });

        // determine columns by looking at the rows.
        for (let i = 0; i < 5; i++) {
            const column: number[] = [];
            this.rows.forEach((row) => {
                column.push(row[i]);
            });
            this.columns.push(column);
        }
    }

    playBingo(): number {
        for (let i = 0; i < this.chosenNumbers.length; i++) {
            const num = this.chosenNumbers[i];
            this.strikeNumber(num);
            if (this.checkWin() === true) {
                this.winningNumber = num;
                this.winningTurn = i;
                this.determineScore();
                break;
            }
        }
        return this.score;
    }

    // Strikes the number from the rows and columns.
    strikeNumber(num: number) {
        const newRows: number[][] = [];
        this.rows.forEach((row) => {
            const newRow: number[] = [];
            row.forEach((rowNum) => {
                if (rowNum !== num) {
                    newRow.push(rowNum);
                }
            });
            newRows.push(newRow);
        });

        const newColumns: number[][] = [];
        this.columns.forEach((column) => {
            const newColumn: number[] = [];
            column.forEach((columnNum) => {
                if (columnNum !== num) {
                    newColumn.push(columnNum);
                }
            });
            newColumns.push(newColumn);
        });

        this.rows = newRows;
        this.columns = newColumns;
    }

    // Check if any row or column has no more numbers left. If so, then we have a Bingo!
    checkWin(): boolean {
        let gameWon = false;

        this.rows.forEach((row) => {
            if (row.length === 0) {
                gameWon = true;
            }
        });

        this.columns.forEach((column) => {
            if (column.length === 0) {
                gameWon = true;
            }
        });

        return gameWon;
    }

    // Add together all remaining numbers
    determineScore() {
        let remainingNumberSum = 0;
        this.rows.forEach((row) => {
            row.forEach((num) => {
                remainingNumberSum += num;
            });
        });

        this.score = remainingNumberSum * this.winningNumber;
    }
}

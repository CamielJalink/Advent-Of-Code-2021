import { readFileSync } from "fs";

function advent() {
    const stringInput = readFileSync("input.txt", "utf-8");
    const input = stringInput.split("\r\n");
    const fish = input[0].split(",").map((stringFish) => parseInt(stringFish));
    console.log(simulateFish(fish));
}

function simulateFish(allFish: number[]) {
    for (let day = 1; day <= 80; day++) {
        const prevFish: number[] = [];
        const newFish: number[] = [];

        allFish.forEach((fish) => {
            if (fish === 0) {
                fish = 6;
                newFish.push(8);
            } else {
                fish--;
            }
            prevFish.push(fish);
        });
        allFish = [...prevFish, ...newFish];
    }
    return allFish.length;
}

advent();

import { readFileSync } from "fs";

function advent() {
  const stringInput = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  console.log(input);
}

advent();
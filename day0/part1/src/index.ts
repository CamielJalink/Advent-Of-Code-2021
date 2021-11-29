import { readFileSync } from 'fs';

function advent() {
  const stringInput = readFileSync('input.txt', 'utf-8');
  const input = stringInput.split('\r\n');
  console.log(input);
}

advent();
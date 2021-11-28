"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = (0, fs_1.readFileSync)("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    console.log(input);
}
advent();

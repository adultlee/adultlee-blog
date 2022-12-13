const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "백준/input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

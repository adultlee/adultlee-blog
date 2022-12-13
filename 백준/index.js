const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "백준/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const inputZero = input[0].split(" ");
const N = Number(inputZero[0]); //처음에 입력받아서 보관하고 있는 문자열 S
const M = Number(inputZero[1]); //그 후 비교해야할 문자열의 개수

const S = new Map();

for (let i = 1; i < N + 1; i++) {
  // 1 ~ N번째 까지
  S.set(input[i], true);
}

let count = 0;

for (let i = N + 1; i < input.length; i++) {
  // N ~ 끝까지
  if (S.get(input[i])) count++;
}

console.log(count);

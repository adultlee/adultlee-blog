---
emoji: 📖
title: 문자열 집합 [실버 3]
date: "2022-12-12 16:05:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[문자열 집합](https://www.acmicpc.net/problem/14425)

총 N개의 문자열로 이루어진 집합 S가 주어진다.

입력으로 주어지는 M개의 문자열 중에서 집합 S에 포함되어 있는 것이 총 몇 개인지 구하는 프로그램을 작성하시오.

# 2. 문제풀이

앞서 풀었던 나는야 포켓몬 마스터 문제와 같이 입력받은 문자열을 바탕으로 hash map을 만들면 쉽게 풀수 있을것이라 기대할 수 있다.

문제에서 특별하게 처리해야할 예외는 보이지 않으므로 바로 시도한다.

하지만

```js
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "백준/input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const inputZero = input[0].split(" ");
const N = Number(inputZero[0]); //처음에 입력받아서 보관하고 있는 문자열 S
const M = Number(inputZero[1]); //그 후 비교해야할 문자열의 개수

const S = new Map();

for (let i = 1; i < N + 1; i++) {
  // 1 ~ N번째 까지
  S.set(input[i], true);
}

let count = 0;

for (let i = N; i < input.length; i++) {
  // N ~ 끝까지
  if (S.has(input[i])) count++;
}

console.log(count);
```

이렇게 작성했을대 문제가 발생했다. 예제는 통과하지만 백준에서 4%에서 막히는것을 확인할 수 있었는데 그 이유를 확인해보자

답을 알았다.. 알고 보니 아래 for문에서 N부터 시작했기 떄문이다;;
N+1부터라면 큰 무리 없이 문제를 풀 수 있다.

# 3. 코드

```js
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
```

# 4. 배운 점

1. for문의 시작지점을 잘보다

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

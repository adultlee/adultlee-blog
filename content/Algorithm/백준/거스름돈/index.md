---
emoji: 📖
title: 거스름돈 [실버 5]
date: "2022-12-15 13:05:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[문자열 집합](https://www.acmicpc.net/problem/14916)

춘향이는 편의점 카운터에서 일한다.

손님이 2원짜리와 5원짜리로만 거스름돈을 달라고 한다. 2원짜리 동전과 5원짜리 동전은 무한정 많이 가지고 있다. 동전의 개수가 최소가 되도록 거슬러 주어야 한다. 거스름돈이 n인 경우, 최소 동전의 개수가 몇 개인지 알려주는 프로그램을 작성하시오.

예를 들어, 거스름돈이 15원이면 5원짜리 3개를, 거스름돈이 14원이면 5원짜리 2개와 2원짜리 2개로 총 4개를, 거스름돈이 13원이면 5원짜리 1개와 2원짜리 4개로 총 5개를 주어야 동전의 개수가 최소가 된다.

# 2. 문제풀이

그리디로 문제를 풀게 되면 문제가 생김을 바로 확인할 수 있다.
마지막에 거스름돈이 13원일때 , 5 _ 2 + 1 _ 3 이 되면 동전이 5개가 된다.
하지만 5 * 1 + 2 *3 이 된다.

--> 알고보니 1원짜리 거스름돈은 불가능하다고 한다.

--> 풀이가 몇번 실패했었는데 그 이유는 자료형 때문이었다. 1 이거나 3일 때 예외처리를 해주어야 하는데 === 을 통해 타입을 확실하게 확인하지 않았기 때문에 발생한 문제였다.

# 3. 코드

```js
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "백준/input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = input[0];
let count = 0;

if (n == 1 || n == 3) {
  console.log(-1);
} else if ((n % 5) % 2 === 0) {
  count += Math.floor(n / 5) + (n % 5) / 2;
  console.log(count);
} else {
  count += Math.floor(n / 5) + Math.floor(((n % 5) + 5) / 2) - 1;
  console.log(count);
}
```

# 4. 배운 점

자료형을 잘 확인하자...

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

---
emoji: 😊
title: 110 옮기기 [Lv3]
date: "2023-03-21 11:10:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 110 옮기기](https://school.programmers.co.kr/learn/courses/30/lessons/77886)

# 2. 문제풀이

문제를 보자마자 생각한 풀이 입니다! 하지만 풀지는 못했는데 다음과 같은 코드에서는
예외처리가 잘 안됩니다. 예시 2번에서 나온 방식은 110을 제일 뒤로 옮기는 방식이었는데 이걸 좀 다르게 이해한것이 문제였습니다.

```js
function solution(s) {
	var answer = [];

	for (let i = 0; i < s.length; i++) {
		let curString = s[i];
		while (!isAnswer(curString)) {
			// 답이 아닌 경우 무한 회귀

			// 110을 찾기
			// 110을 찾은 curString에서 110을 제거 한 부분과 110 덩어리를 모으기
			// 마지막으로 확인된 0의 뒤에다가 110을 넣기 || 0이 없는경우 제일 앞으로 모두 넣기
			let preString = "";
			let stack110 = [];
			let hasZero = false;
			for (let i = 0; i < curString.length; ) {
				if (
					curString[i] === "1" &&
					curString[i + 1] === "1" &&
					curString[i + 2] === "0"
				) {
					stack110.push("110");
					i += 3;
				} else {
					if (curString[i] === "0") {
						hasZero = true;
					}
					preString += curString[i];
					i++;
				}
			}
			let curAnswerString = "";
			let isFirstZeroIndex = 0;
			if (hasZero) {
				// 0이 있는 경우
				for (let i = 0; i < preString.length; i++) {
					if (preString[i] === "0" && i !== preString.length - 1) {
						if (preString[i + 1] === "0") {
						} else {
							isFirstZeroIndex = i;
							break;
						}
					} else if (
						i === preString.length - 1 &&
						preString[preString.length - 1] === "0"
					) {
						isFirstZeroIndex = i;
						break;
					}
				}
				let frontString = "";
				let backString = "";
				for (let i = 0; i < preString.length; i++) {
					if (i <= isFirstZeroIndex) {
						frontString += preString[i];
					} else {
						backString += preString[i];
					}
				}

				curAnswerString += frontString;
				curAnswerString += stack110.join("");
				curAnswerString += backString;
			} else {
				curAnswerString += stack110.join("");
				curAnswerString += preString;
			}

			curString = curAnswerString;
		}
		answer.push(curString);
	}

	// 모든 110을 찾고 더 찾은 후 첫번째로 발견된 0의 바로 뒤에 모두 더해준다.
	return answer;
}

function isAnswer(string) {
	// s 가 더이상 110을 옮길 필요 없는지 확인한다.
	for (let i = 0; i < string.length - 2; i++) {
		if (
			string[i] === "1" &&
			string[i + 1] === "1" &&
			string[i + 2] === "0"
		) {
			// 110이 있다면?
			if (i === 0) {
				// 이때는 괜찮아
			} else {
				if (string[i - 1] === "1") {
					return false;
				}
			}
		}
	}

	return true;
}
```

# 3. 코드

```js

```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

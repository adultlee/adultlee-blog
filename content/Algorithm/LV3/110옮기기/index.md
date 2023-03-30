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

테케는 모두 통과했지만 결국 실패하고 말았다.
시간초과가 뜬것으로 보아 알고리즘 상 문제가 발생한것이라 추축할 수 있다.
결국 해결책을 찾지 못하고 아래의 코드를 참고하게 되었다.

# 3. 코드

```js
const answer = [];
function solution(s) {
	for (let t = 0; t < s.length; t++) {
		let str = s[t];
		let stack = [];
		let tmp = find110(str, stack);
		if (tmp == "") answer.push(str);
		else {
			const tmpStr = stack.join("");
			const idx = tmpStr.lastIndexOf("0") + 1;
			answer.push(tmpStr.substring(0, idx) + tmp + tmpStr.substring(idx));
		}
	}
	return answer;
}
function find110(str, stack) {
	let tmp = "";
	for (let i = 0; i < str.length; i++) {
		const c = str.charAt(i);
		if (stack.length >= 2) {
			const b = stack.pop();
			const a = stack.pop();
			if (a == "1" && b == "1" && c == "0") {
				tmp += "110";
				continue;
			}
			stack.push(a);
			stack.push(b);
		}
		stack.push(c);
	}
	return tmp;
}
```

# 정리

생각보다 간단하게 풀수 있었을지도 모를 문제였다는 생각이 들었다.
저 풀이에서 볼 수 있듯이 stack을 통해 잠재적으로 발생할 수 있는 110에 대해서 모두 예외처리를 진행해 주었는데,
아쉽게도 문제를 풀 당시에는 전혀 생각지도 못했던 부분이다.
또한 본문에서 stack을 재활용하는 부분이 있었는데 이또한 신기했다.
단순히 지역변수로서 사용된것이 아니라 더 복합적으로 사용된것에 감탄이 나온다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

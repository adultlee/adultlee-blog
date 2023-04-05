---
emoji: 😊
title: 연속 펄스 부분수열의 합 [Lv3]
date: "2023-04-05 20:50:00"
author: 이성인
tags: DP
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 연속 펄스 부분수열의 합](https://school.programmers.co.kr/learn/courses/30/lessons/161988#)

# 2. 문제풀이

처음 생각은 이렇다.
[-1 ,1 , -1, ... ]과 [1,-1,1 , ...] 로 이루어진 두 수열을 가지고 곱하여 만들어진 두 수열의 가장 큰 부분수열의 합을 구하는 것이다.  
대략적인 계획은 세웠으나 완전탐색은 말이 안되는 방법이다. 당연히 시간초과가 발생할 것이라 예상했다.
이중포인터를 사용하되 음의 정수의 누적을 체크하기로 하였다.

# 3. 코드

```js
function solution(sequence) {
	const dp1 = [sequence[0]];
	const dp2 = [-sequence[0]];
	var answer = Math.max(sequence[0], -sequence[0]);
	for (let i = 1; i < sequence.length; i++) {
		if (i % 2 === 1) {
			//dp1 이 - , dp 2 가 +
			dp1[i] = Math.max(-sequence[i], dp1[i - 1] - sequence[i]);
			dp2[i] = Math.max(sequence[i], dp2[i - 1] + sequence[i]);
		} else {
			dp1[i] = Math.max(sequence[i], dp1[i - 1] + sequence[i]);
			dp2[i] = Math.max(-sequence[i], dp2[i - 1] - sequence[i]);
		}

		answer = Math.max(answer, dp1[i], dp2[i]);
	}

	return answer;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

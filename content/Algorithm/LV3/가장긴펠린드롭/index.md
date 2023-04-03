---
emoji: 😊
title: 가장 긴 펠린드롭 [Lv3]
date: "2023-03-31 11:10:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 가장 긴 펠린드롭](https://school.programmers.co.kr/learn/courses/30/lessons/12904)

# 2. 문제풀이

다소 애를 먹었던 문제이다.  
제한조건을 고려했을때, 모두 탐색을 사용하게 된다면 문제가 발생할 것이라 생각했다.
그에 따라 생각이 나는 알고리즘은 사실 dp였다.
dp로 이 문제를 풀때 중요한 것은, 일반적으로 i , j 인덱스가 함께 양의 방향으로 이동하는 경우지만
이번 문제에서는 그게 아니라 양쪽 방향으로 이동하며, 포함하는 문자열을의 펠린드롭 여부를 닮게 된다.

# 3. 코드

```js
function solution(s) {
	let answer = 1;
	const len = s.length;
	const dp = new Array(len).fill().map((_) => new Array(len).fill(false));

	for (let i = 0; i < len; i++) {
		dp[i][i] = true;
	}

	// 길이가 2인 팰린드롬이 있는지 검사한다
	// 판단조건은 s[i] == s[i+1]이 일치하면
	// 길이가 2인 팰린드롬이 성립한다.
	// 성립할 경우 answer도 2로 갱신한다.
	// dp[i][i+1]의 범위를 탐색하므로
	// 반복문을 0부터 len-1 까지 하는것에 주의하자.
	for (let i = 0; i < len - 1; i++) {
		if (s[i] === s[i + 1]) {
			dp[i][i + 1] = true;
			answer = 2;
		}
	}
	// 길이가 3인 팰린드롬이 있는지 검사할 것이다
	// 최대 팰린드롬 길이는 주어진 문자열과 동일할 수 있기에(예제1번)
	// len과 일치할 때 까지 반복문을 돌린다는 것을 주의하자
	for (let i = 3; i <= len; i++) {
		// 시작문자는 항상 0부터 시작할 것이다.
		// 시작문자가 가질 수 있는 최대 index값은 len - i와 같다.
		// 이는 현재 팰린드롬의 길이가 i인 상황이기 때문에
		// 이 길이보다 짧아지는 index는 필요없기 때문이다.
		for (let start = 0; start <= len - i; start++) {
			// 종료문자의 index는 시작문자 index + 현재 팰린드롬 길이 i - 1 이다.
			// 즉 i 크기만큼 떨어져있는 곳의 index이다.
			const end = start + i - 1;
			if (s[start] === s[end] && dp[start + 1][end - 1]) {
				dp[start][end] = true;
				// answer 의 값은 항상 최대값으로 갱신되어야 한다.
				answer = Math.max(answer, i);
			}
		}
	}

	return answer;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

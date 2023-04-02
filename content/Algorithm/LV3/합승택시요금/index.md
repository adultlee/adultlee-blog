---
emoji: 😊
title: 합승택시요금 [Lv3]
date: "2023-03-31 11:10:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 합승택시요금](https://school.programmers.co.kr/learn/courses/30/lessons/72413)

# 2. 문제풀이

문제를 보자마자 일반적으로 사용하던 dfs, dp 등의 방식으로는 풀수 없음을 깨닫고
다른 방식의 풀이를 해야겠다는 생각이 들었습니다. 빠르게 그래프 관련풀이를 공부하고 풀게 되었습니다.

# 3. 코드

```js
function solution(n, s, a, b, fares) {
	var answer = Infinity;

	let graph = new Array(n + 1)
		.fill()
		.map(() => new Array(n + 1).fill(Infinity));

	fares.map((v) => {
		const [start, end, cost] = v;
		graph[start][end] = cost;
		graph[end][start] = cost;
		graph[start][start] = 0;
		graph[end][end] = 0;
	});

	for (let mid = 1; mid <= n; mid++) {
		for (let start = 1; start <= n; start++) {
			for (let end = 1; end <= n; end++) {
				graph[start][end] = Math.min(
					graph[start][end],
					graph[start][mid] + graph[mid][end]
				);
			}
		}
	}

	for (let mid = 1; mid <= n; mid++) {
		answer = Math.min(
			answer,
			graph[s][mid] + graph[mid][a] + graph[mid][b]
		);
	}

	return answer;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

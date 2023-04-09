---
emoji: 😊
title: 부대복귀 [Lv3]
date: "2023-04-09 11:40:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 부대복귀](https://school.programmers.co.kr/learn/courses/30/lessons/132266)

# 2. 문제풀이

bfs 를 중첩해서 상용하면서 sources에 따른 시행을 저장해 두었습니다.

# 3. 코드

```js
function solution(n, roads, sources, destination) {
	// 방문 기록을 확인할 배열 생성
	const visited = new Array(n + 1).fill(Infinity);

	// 연결된 길 생성
	const connect = new Array(n + 1).fill(0).map((_) => []);
	roads.forEach(([from, to]) => {
		connect[from].push(to);
		connect[to].push(from);
	});

	// BFS 알고리즘
	// 목적지로 부터 부대원의 위치까지의 거리를 표시
	const q = [destination];
	visited[destination] = 0;
	while (q.length) {
		const cur = q.shift();
		// 갈 수 있는 다음 길
		for (const next of connect[cur]) {
			// 가보지 않은 길이라면, 그렇기에 초기에 모든 값을 Infinity로 설정
			if (visited[cur] + 1 < visited[next]) {
				visited[next] = visited[cur] + 1;
				q.push(next);
			}
		}
	}
	return sources.map((a) => (visited[a] !== Infinity ? visited[a] : -1));
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

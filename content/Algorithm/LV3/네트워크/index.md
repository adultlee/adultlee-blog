---
emoji: 😊
title: 네트워크 [Lv3]
date: "2022-3-03 12:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 네트워크](https://school.programmers.co.kr/learn/courses/30/lessons/43162)

네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

# 2. 문제풀이

대표적인 dfs 문제이다.

DFS 문제 풀이에는 다음과 같은 요소에 집중하는 것이 중요하다.

1. 대부분의 문제가 DFS로 풀리긴 하지만 막대한 시간이 소요 된다.
2. 따라서 다음과 같이 graph를 순회하거나 Node를 경유해야하는 경우에 제한하여 사용하는 것이 중요하다.
3. DFS 의 대표적인 특징은 제귀함수에서 기인하다. 그렇기 때문에 다음 두가지 특징을 기억하는 것이 중요하다.

-   DFS는 종료 조건과, 다음 조건이 중요하다.
-   방문했던 경우에 대해서 예외처리를 해 주어야 한다.

# 3. 코드

```js
function solution(n, computers) {
	var answer = 0;
	let visited = new Array(n).fill(false);

	const dfs = (curNode) => {
		//특별한 종료조건이 없다

		//다음 조건

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				if (computers[curNode][j] === 1 && !visited[j]) {
					visited[j] = true;
					dfs(j);
				} else if (computers[i][curNode] === 1 && !visited[i]) {
					visited[i] = true;
					dfs(i);
				}
			}
		}
	};

	for (let i = 0; i < n; i++) {
		if (!visited[i]) {
			visited[i] = true;
			dfs(i);
			answer++;
		}
	}

	return answer;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

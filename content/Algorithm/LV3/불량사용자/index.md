---
emoji: 😊
title: 불량 사용자 [Lv3]
date: "2023-03-07 11:10:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 네트워크](https://school.programmers.co.kr/learn/courses/30/lessons/64064)

# 2. 문제풀이

생각보다 까다로운 문제였으며 DFS로 문제를 해결하는 경우
"**\*\*\*\***"이 존재할 때가 최대의 시간복잡도를 가지게 된다. 해당 경우에 대한 예외처리가 필요하다.
우선 문제에 대한 조각을 나눠야 한다.

1. 두개의 문자열에 대한 banned 여부를 파악
2. 파악된 결과를 바탕으로 possible_banned_list를 작성해야 한다.
3. possible_banned_list를 이용하여 dfs를 통해 answer_array 를 생성한다.
4. 3번의 경우 복잡도가 크게 증가 할 수 있으며, 중복을 제거하며 앞서서 언급된 string은 제거한다.

# 3. 코드

```js
function solution(user_id, banned_id) {
	var answer = [];

	const possible_banned_list = [];
	// [[ ... , ... , ] , [ .... , ... , ...] , [ .... , ...]]
	for (let i = 0; i < banned_id.length; i++) {
		possible_banned_list.push([]);
		for (let j = 0; j < user_id.length; j++) {
			if (isBannedId(user_id[j], banned_id[i])) {
				possible_banned_list[i].push(user_id[j]);
			}
		}
	}
	// 	[ [ 'frodo', 'crodo' ], [ 'frodo', 'crodo' ], [ 'abc123', 'frodoc' ] ]
	// 위와 같이 만들어진다.
	const dfs = (curId, index, curArray) => {
		// 종료 조건
		if (index === banned_id.length - 1) {
			answer.push(curArray.sort().join(","));

			return;
		}

		// 다음 조건
		// includes를 이용하면 배열내부의 요소를 손쉽게 찾을 수 있다.
		// 같은 기능으로 indexOf를 통해 -1의 요소를 확인하는것 또한 방법이다.
		for (let i = 0; i < possible_banned_list[index + 1].length; i++) {
			if (!curArray.includes(possible_banned_list[index + 1][i])) {
				// 포함하고 있지 않다면
				dfs(possible_banned_list[index + 1][i], index + 1, [
					...curArray,
					possible_banned_list[index + 1][i],
				]);
			}
		}
	};

	for (let i = 0; i < possible_banned_list[0].length; i++) {
		dfs(possible_banned_list[0][i], 0, [possible_banned_list[0][i]]);
	}
	return [...new Set(answer)].length; // 여기서 중복을 제거하고 그 개수를 확인한다.
}

function isBannedId(userId, bannedId) {
	// 두개의 문자열이 bannedId가 될수 있는지 확인한다.
	if (userId.length !== bannedId.length) {
		return false;
	}
	for (let i = 0; i < userId.length; i++) {
		if (userId[i] !== bannedId[i] && bannedId[i] !== "*") {
			return false;
		}
	}

	return true;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

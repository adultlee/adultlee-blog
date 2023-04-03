---
emoji: 😊
title: 풍선 터트리기 [Lv3]
date: "2023-04-02 11:50:00"
author: 이성인
tags: 이중포인터
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 풍선 터트리기](https://school.programmers.co.kr/learn/courses/30/lessons/68646)

# 2. 문제풀이

처음 보자마자 dfs 로 완전탐색으로 풀려고 했던 문제다.
하지만 문제 조건의 a의 길이를 본후 당연히 시간초과가 날것이라 생각했다.
그다음 생각했던 방식은 dp 로 문제 풀이를 진행하는 것이다.
dp[i][j] 에서 dp[i][j]는 i 번째부터 j 번째까지의 수 중에서 발생할 수 있는 수를 의미한다.
하지만 이 방식도 결국 기각되었는데 이때, 반환하는 배열에 대해서 작은 값을 터트린 경우를 모두 닮는것은 결국 완전탐색과 다를것이 없다.
그래서 다음과 같은 방법을 생각하게 되었다.
작성한 테스트 코드는 다음과 같다.
[-16,27,65,-2,58,-92,-71,-68,-61,-33] 6  
[27, 65, -2, -16, -92, -71, -68, -61, -33] 7  
단순히 -16과 -2의 위치에 따라서 갯수가 추가가 되는것을 확인할 수 있었는데,
규칙은 바로 해당 수의 배열에서 가장 작은 수 와 두번째로 작은 수에 대해서 정렬을 진행한 후 그 위치 관계에 따라서 결정하는 것이다.
가장 작은 수와 두번째로 작은 수는 는 언제나 살아남을 수 있기 때문, 그럼에 따라 다음과 같은 규칙에 따라 제거가 된다.

1. 가장 작은 수와 두번째로 작은 수의 사이에 있는 수는 어떤 방식으로도 살아남을 수 없다.
2. 1번의 범위의 밖에 있는 경우 이때, 가장 작은 수와 두번째로 작은수를 key 값이라고 할때, Key값에서 멀어지는 방향으로 해당 값이 가장 작은 경우에는 살아남을 수 있다.
   그리고 다음과 같이 코드를 작성했다.

```js
function solution(a) {
	var answer = 2;
	// 가장 작은 값과 두번째로 작은 값을 찾는다.

	let smallest_number = Number.POSITIVE_INFINITY;
	let smallest_number_index = -1;
	let second_smallest_number = Number.POSITIVE_INFINITY;
	let second_smallest_number_index = -1;

	// 가장 작은 값 찾기
	for (let i = 0; i < a.length; i++) {
		if (a[i] < smallest_number) {
			smallest_number = a[i];
			smallest_number_index = i;
		}
	}

	//두번째로 작은 값 찾기
	for (let i = 0; i < a.length; i++) {
		if (smallest_number < a[i] && a[i] < second_smallest_number) {
			second_smallest_number = a[i];
			second_smallest_number_index = i;
		}
	}
	// 비교

	const [key1, key2] = [
		second_smallest_number_index,
		smallest_number_index,
	].sort((a, b) => a - b);

	// 좌측 확인
	for (let i = key1 - 1; i >= 0; i--) {
		if (isSmallInLeft(a, i)) {
			answer++;
		}
	}
	// 우측 확인
	for (let i = key2 + 1; i < a.length; i++) {
		if (isSmallInRight(a, i)) {
			answer++;
		}
	}

	return answer;
}

function isSmallInLeft(arr, endIndex) {
	const curNumber = arr[endIndex];
	for (let i = endIndex - 1; i >= 0; i--) {
		if (arr[i] < curNumber) {
			return false;
		}
	}
	return true;
}

function isSmallInRight(arr, startIndex) {
	const curNumber = arr[startIndex];
	for (let i = startIndex + 1; i < arr.length; i++) {
		if (arr[i] < curNumber) {
			return false;
		}
	}
	return true;
}
```

하지만 시간초과가 발생하게 되는데... 아마도 양 측에서 가장 작은 값을 찾는 방식에서 더 최적화가 가능한 것으로 보인다.

```js
let leftMin = Number.POSITIVE_INFINITY;

for (let i = 0; i < key1; i++) {
	if (a[i] < leftMin) {
		answer++;
		leftMin = a[i];
	}
}
// 우측 확인
let rightMin = Number.POSITIVE_INFINITY;
for (let i = a.length - 1; i > key2; i--) {
	if (a[i] < rightMin) {
		answer++;
		rightMin = a[i];
	}
}
```

결국은 다음과 같이 양쪽 끝에서 진행시키면서 최소값을 갱신해가며 문제를 해결했습니다.

# 3. 코드

```js
function solution(a) {
	var answer = 2;
	// 가장 작은 값과 두번째로 작은 값을 찾는다.

	let smallest_number = Number.POSITIVE_INFINITY;
	let smallest_number_index = -1;
	let second_smallest_number = Number.POSITIVE_INFINITY;
	let second_smallest_number_index = -1;

	// 가장 작은 값 찾기
	for (let i = 0; i < a.length; i++) {
		if (a[i] < smallest_number) {
			smallest_number = a[i];
			smallest_number_index = i;
		}
	}

	//두번째로 작은 값 찾기
	for (let i = 0; i < a.length; i++) {
		if (smallest_number < a[i] && a[i] < second_smallest_number) {
			second_smallest_number = a[i];
			second_smallest_number_index = i;
		}
	}
	// 비교

	const [key1, key2] = [
		second_smallest_number_index,
		smallest_number_index,
	].sort((a, b) => a - b);

	// 좌측 확인
	let leftMin = Number.POSITIVE_INFINITY;

	for (let i = 0; i < key1; i++) {
		if (a[i] < leftMin) {
			answer++;
			leftMin = a[i];
		}
	}
	// 우측 확인
	let rightMin = Number.POSITIVE_INFINITY;
	for (let i = a.length - 1; i > key2; i--) {
		if (a[i] < rightMin) {
			answer++;
			rightMin = a[i];
		}
	}

	return answer;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

---
emoji: 😊
title: 다단계 칫솔 판매하기 [Lv3]
date: "2023-04-02 14:50:00"
author: 이성인
tags: 이중포인터
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 다단계 칫솔 판매하기](https://school.programmers.co.kr/learn/courses/30/lessons/77486)

# 2. 문제풀이

처음 보자마자 그래프를 생성한 후 dfs로 풀어준다면 쉽게 풀수 있으리라 생각했다.
생성한 그래프는 다음과 같다.

![](https://velog.velcdn.com/images/adultlee/post/07c4d827-ae05-46ea-a83c-73457e3c2dba/image.png)

```js
function solution(enroll, referral, seller, amount) {
	var answer = [];
	const tree = makeTree(enroll, referral);

	const dfs = (curNode, price) => {
		if (curNode === "-") {
			// curNode에 돈 계산
			return;
		}
		// curNode에 돈 계산
		const nextPrice = Math.floor(price * 0.1);
		tree[curNode].price += price - nextPrice;
		const parentNode = tree[curNode].parent;

		dfs(parentNode, nextPrice);
	};

	for (let i = 0; i < seller.length; i++) {
		dfs(seller[i], amount[i] * 100);
	}

	console.log(tree);
	for (let val in tree) {
		answer.push(tree[val].price);
	}

	return answer;
}

function makeTree(enroll, referral) {
	const tree = {};
	for (let i = 0; i < enroll.length; i++) {
		tree[enroll[i]] = {
			parent: referral[i],
			price: 0,
		};
	}

	return tree;
}
```

다음과 같이 테스트케이스는 전부 통과하지만 일부 런타임에러와 시간초과가 발생했다.  
![](https://velog.velcdn.com/images/adultlee/post/2f334858-c0e5-4ad7-b6c4-2bc4cda13797/image.png)

시간초과가 발생한다는 점에서 알고리즘이 잘못되었을지 모른다는 의심이 들었다

하지만 알고보니 문제의 원인은 크게 멀지 않은 곳에 있었는데,  
다름이 아니라 종료조건을 부족하게 적은 탓이었다.
만약 다음 인자로 넘겨줄 원소가 0원이라면 이때, 더이상 dfs 가 돌지 않아야 하는데 더 돌기 때문이다.

# 3. 코드

```js
function solution(enroll, referral, seller, amount) {
	var answer = [];
	const tree = makeTree(enroll, referral);

	const dfs = (curNode, price) => {
		if (curNode === "-") {
			// curNode에 돈 계산
			return;
		}
		// curNode에 돈 계산
		const nextPrice = Math.floor(price * 0.1);
		tree[curNode].price += price - nextPrice;
		const parentNode = tree[curNode].parent;

		if (nextPrice >= 1) dfs(parentNode, nextPrice); // 이 부분을 추가해주었다.
	};

	for (let i = 0; i < seller.length; i++) {
		dfs(seller[i], amount[i] * 100);
	}

	for (let val in tree) {
		answer.push(tree[val].price);
	}

	return answer;
}

function makeTree(enroll, referral) {
	const tree = {};
	for (let i = 0; i < enroll.length; i++) {
		tree[enroll[i]] = {
			parent: referral[i],
			price: 0,
		};
	}

	return tree;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

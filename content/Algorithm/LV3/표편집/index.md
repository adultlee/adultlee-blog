---
emoji: 😊
title: 표편집 [Lv3]
date: "2023-04-06 11:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 표편집](https://school.programmers.co.kr/learn/courses/30/lessons/81303)

# 2. 문제풀이

## 첫시도

처음에는 정직하게 모든 시도에 따라 움직이며 제거 하고 제거한 index를 stack에 보관하려고 했다.
하지만 이 때 저장되는 index는 원래의 index를 저장하지 못했는데, 예를 들어 stack에 [00000] 만 저장되는 경우 였다.
이 경우를 해결하기 위해서, node의 개념을 도입하였고, 제거된 경우 deleted 속성을 부여하기로 하였다.

아래의 코드는 시간초과로 인해 실패한 코드입니다.

```js
function solution(n, k, cmd) {
	var answer = "";
	const DATA = [];
	const stack = [];
	for (let i = 0; i < n; i++) {
		DATA.push({
			index: i,
			deleted: false,
		});
	}
	let curIndex = k;

	cmd.map((cmdLine) => {
		const [command, number] = cmdLine.split(" ");

		if (command === "U") {
			//console.log("지금은 올라갑니다." ,number,"만큼, 현재위치는",k  )

			let count = 0;
			for (let i = k - 1; i > -1; i--) {
				if (DATA[i].deleted) {
				} else {
					count++;
					if (count === Number(number)) {
						k = i;
						break;
					}
				}
			}
			//console.log("만큼, 현재위치는",k  )
		} else if (command === "D") {
			let count = 0;
			for (let i = k + 1; i < DATA.length; i++) {
				if (DATA[i].deleted) {
				} else {
					count++;
					if (count === Number(number)) {
						k = i;
						break;
					}
				}
			}
			//console.log("지금은 내려갔습니다. 현재위치는",k  )
		} else if (command === "C") {
			DATA[k].deleted = true;
			stack.push(DATA[k].index);
			let isEnd = true;
			for (let i = k + 1; i < DATA.length; ) {
				if (DATA[i].deleted) {
					i++;
				} else {
					k = i;
					//console.log("아래로 내려갔습니다. 현재위치는",k  )
					isEnd = false;
					break;
				}
			}
			if (isEnd) {
				for (let i = k - 1; i > 0; ) {
					if (DATA[i].deleted) {
						i--;
					} else {
						k = i;
						//console.log("위로 올라갔습니다. 현재위치는",k  )
						break;
					}
				}
			}
		} else if (command === "Z") {
			const zNumber = stack.pop();
			DATA[zNumber].deleted = false;
		}
	});

	for (let i = 0; i < DATA.length; i++) {
		if (DATA[i].deleted) {
			answer += "X";
		} else {
			answer += "O";
		}
	}

	return answer;
}
```

아마도 원래의 위치를 찾기 위해서 하나씩 이동해야한다는 점이 크게 작용한것으로 예측할 수 있습니다. hashmap을 사용하는것을 검토할 필요가 있을것으로 생각합니다.
결국 hashmap으로도 실패를 경험하고 다른 풀이를 보게 되었습니다.
다른 풀이에서는 node를 사용하였는데 앞선 풀이와 같았으나, prev, next 를 사용한 방식을 통해서 up , down에 압도적인 시간 차를 줄일 수 있었다는 점이 가장 큰 차이인것 같습니다.

# 3. 코드

```js
const Node = function (index, prevNode) {
	this.index = index;
	this.prev = prevNode;
	this.next;
};

function solution(n, k, cmd) {
	let answer = Array(n).fill("O");
	let root = new Node(0);
	let currentNode = root;
	let prevNode = root;

	for (let i = 1; i < n; i++) {
		const newNode = new Node(i, prevNode);
		prevNode.next = newNode;
		prevNode = newNode;

		if (i === k) {
			currentNode = newNode;
		}
	}

	const history = [];
	cmd.map((current) => {
		const [command, count] = current.split(" ");
		let i = 0;
		switch (command) {
			case "U":
				while (i < count && currentNode.prev) {
					currentNode = currentNode.prev;
					i++;
				}
				break;
			case "D":
				while (i < count && currentNode.next) {
					currentNode = currentNode.next;
					i++;
				}
				break;
			case "C":
				history.push(currentNode);
				const prev = currentNode.prev;
				const next = currentNode.next;
				if (prev && next) {
					prev.next = next;
					next.prev = prev;
					currentNode = next;
				} else if (prev) {
					prev.next = null;
					currentNode = prev;
				} else if (next) {
					next.prev = null;
					currentNode = next;
				}
				break;
			case "Z":
				const node = history.pop();
				const prevNode = node.prev;
				const nextNode = node.next;
				if (prevNode) {
					prevNode.next = node;
				}
				if (nextNode) {
					nextNode.prev = node;
				}
				break;
		}
	});

	history.map((node) => {
		answer[node.index] = "X";
	});

	return answer.join("");
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

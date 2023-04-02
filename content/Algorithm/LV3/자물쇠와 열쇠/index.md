---
emoji: 😊
title: 자물쇠와 열쇠 [Lv3]
date: "2023-03-21 11:10:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[프로그래머스 자물쇠와 열쇠](https://school.programmers.co.kr/learn/courses/30/lessons/60059)

# 2. 문제풀이

지금까지 안풀고 넘겨왔지만 지금은 풀어야 할때다...!
해당문제는 Key를 회전 시켜주는 것이 중요하다. 2중 배열의 회전 기능을 구현해보자

## 시계방향 회전의 경우 (홀수크기 n\*n)

n=5  
(3,0) => (0,1) => (1,4) => (4,3)  
(y,x) => (x, n-y) 의 공식을 가지게 됩니다.

## 그렇다면 이 문제는 DFS 인가?

아마 모든 경우의 수를 샌다면 엄청나게 많은 경우가 발생하게 됩니다.
1번 실행시 경우의 수 5번이기 때문이다. (상하좌우 + 회전)

![](https://velog.velcdn.com/images/adultlee/post/3a4420a8-6f50-4cde-8558-d23409e9d657/image.png)

```js
///실패한 코드
function solution(key, lock) {
	var answer = true;

	const ZEROCOUNT = getCount(lock, 0);
	const move = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];
	const SameZeroCountKey = [];
	// [ [] , [] , ] 각각의 배열에는 key가 들어가게 된다.

	const dfs = (key, curDir) => {
		const curKey = [];
		for (let i = 0; i < key.length; i++) {
			curKey.push([]);
			for (let j = 0; j < key.length; j++) {
				curKey[i].push(key[i][j]);
			}
		} // 얕은 복사 완료

		// 종료 조건
		// ZEROCOUNT 가 같다면 SameZeroCountKey에 추가후 종료
		if (getCount(curKey, 1) === ZEROCOUNT) {
			// 홈의 개수와 자물쇠의 돌기의 개수가 같다면
			SameZeroCountKey.push(curKey);
			return;
		} else if (getCount(curKey, 1) <= ZEROCOUNT) {
			// 범위 밖으로 나갔다면
			return;
		}
		// 더 작아진다면 그냥 종료
		// 다음 조건
		console.log(curKey);
		curKey.splice(0, 0, []);
		curKey.push([]);

		for (let i = 0; i < curKey.length; i++) {
			for (let j = 0; j < curKey.length; j++) {
				if (i === 0) {
					//
					curKey[i].push(0);
				} else if (i === curKey.length - 1) {
					curKey[i].push(0);
				} else {
					if (j === 0) {
						curKey[i].splice(0, 0, 0);
						curKey[i].push(0);
					}
				}
			}
		}

		for (let nextDir = 0; nextDir < 4; nextDir++) {
			if (Math.abs(curDir - nextDir) === 2) {
				// 이동한 방향의 정 반대 방향인경우
				continue;
			} else {
				// 완전 다른 경우라면 진행가능
				if (nextDir === 0) {
					const nextKey = [];
					for (let i = 0; i < curKey.length - 2; i++) {
						nextKey.push([]);
						for (let j = 0; j < curKey.length - 2; j++) {
							nextKey[i].push(curKey[i + 2][j + 1]);
						}
					}

					dfs(nextKey, nextDir);
				} else if (nextDir === 1) {
					const nextKey = [];
					for (let i = 0; i < curKey.length - 2; i++) {
						nextKey.push([]);
						for (let j = 0; j < curKey.length - 2; j++) {
							nextKey[i].push(curKey[i + 1][j]);
						}
					}

					dfs(nextKey, nextDir);
				} else if (nextDir === 2) {
					const nextKey = [];
					for (let i = 0; i < curKey.length - 2; i++) {
						nextKey.push([]);
						for (let j = 0; j < curKey.length - 2; j++) {
							nextKey[i].push(curKey[i][j + 1]);
						}
					}

					dfs(nextKey, nextDir);
				} else if (nextDir === 3) {
					const nextKey = [];
					for (let i = 0; i < curKey.length - 2; i++) {
						nextKey.push([]);
						for (let j = 0; j < curKey.length - 2; j++) {
							nextKey[i].push(curKey[i + 1][j + 2]);
						}
					}

					dfs(nextKey, nextDir);
				}
			}
		}
		// 이미 진행한 dir이라면 제거
	};

	dfs(key, 0);
	dfs(key, 1);
	dfs(key, 2);
	dfs(key, 3);

	console.log(SameZeroCountKey);

	return answer;
}

function getCount(array, number) {
	let answer = 0;
	for (let i = 0; i < array[0].length; i++) {
		for (let j = 0; j < array[0].length; j++) {
			if (array[i][j] === number) {
				answer++;
			}
		}
	}
	return answer;
}
```

위의 생각은 다음과 같다 우선 홈의 개수와 돌출부의 개수가 같은지만 확인하고 회전을 시키려고 하였으나,
이동과 회전이 번갈아서 시행되는 경우가 존재한다는것을 배제하였다.  
결국 해답을 찾지 못해 다른 사람의 풀이를 참고하게 되었는데,
어렵게 생각할것 없이 모든 경우를 순회하며 찾아내면 되는것이었다. 여기서 중요한 생각은
회전은 4번이상 하지 않아도 되므로 총 회전 방식을 모두 고려하면 된다.

# 3. 코드

```js
function solution(key, lock) {
	var answer = true;
	const KEYLEN = key.length;
	const LOCKLEN = lock.length;

	for (let dir = 0; dir < 4; dir++) {
		// 방향회전 4번을 진행합니다.
		key = rotation(KEYLEN, key);
		let board = makeBoard(KEYLEN, LOCKLEN, lock);

		for (let i = 0; i < KEYLEN + LOCKLEN + 1; i++) {
			// 아래로 이동합니다.
			for (let j = 0; j < KEYLEN + LOCKLEN + 1; j++) {
				// 오른쪽으로 이동합니다.
				board = drawKey(i, j, key, board);
				if (isAnswer(KEYLEN, LOCKLEN, board)) {
					return true;
				}
				board = makeBoard(KEYLEN, LOCKLEN, lock);
			}
		}
	}
	return false;
}

function drawKey(startY, startX, key, board) {
	for (let i = 0; i < key.length; i++) {
		for (let j = 0; j < key.length; j++) {
			board[startY + i][startX + j] += key[i][j]; //여기서 실수 했었다...
		}
	}

	return board;
}

function rotation(KEYLEN, key) {
	// key 를 받고 회전을 시킬겁니다.
	const rotatedKey = [];

	for (let i = 0; i < KEYLEN; i++) {
		rotatedKey.push([]);
		for (let j = 0; j < KEYLEN; j++) {
			rotatedKey[i].push(0);
		}
	}
	//(y,x) => (x, n-y)
	for (let i = 0; i < KEYLEN; i++) {
		for (let j = 0; j < KEYLEN; j++) {
			rotatedKey[i][j] += key[KEYLEN - j - 1][i];
		}
	}

	return rotatedKey;
	// 결과로 배열을 반환합니다.
}

function makeBoard(KEYLEN, LOCKLEN, lock) {
	const board = [];
	const boardSize = 2 * KEYLEN + LOCKLEN;
	for (let i = 0; i < boardSize; i++) {
		board.push([]);
		for (let j = 0; j < boardSize; j++) {
			board[i].push(0);
		}
	}

	for (let i = 0; i < LOCKLEN; i++) {
		for (let j = 0; j < LOCKLEN; j++) {
			board[KEYLEN + i][KEYLEN + j] += lock[i][j];
		}
	}
	return board;
}

function isAnswer(KEYLEN, LOCKLEN, board) {
	for (let i = 0; i < LOCKLEN; i++) {
		for (let j = 0; j < LOCKLEN; j++) {
			if (board[KEYLEN + i][KEYLEN + j] !== 1) return false;
		}
	}
	return true;
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

---
emoji: 🥲
title: 숫자의 표현 JS [Lv2]
date: "2022-10-03 15:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[숫자의 표현](https://school.programmers.co.kr/learn/courses/30/lessons/12924)

Finn은 요즘 수학공부에 빠져 있습니다. 수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다. 예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.

1 + 2 + 3 + 4 + 5 = 15
4 + 5 + 6 = 15
7 + 8 = 15
15 = 15
자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.

# 2. 문제풀이

초기에 규칙성을 찾아보려고 했으나 찾을 수 없었습니다.
홀 , 짝 혹은 약수들간의 관계를 찾아보려고 했습니다.
하지만 총 입력되는 문자열의 크기가 10000이라는 나름 합리적인 값이라는 생각에
완전탐색을 트라이 하게 되었습니다. 여기에는 조금더 합리적인 근거가 있었는데
하나의 시작지점에서는 하나의 수식만이 만들어진다는 점이었습니다.

# 3. 코드

```js
function solution(n) {
  var answer = 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = i; j <= n; j++) {
      sum += j;
      if (sum === n) {
        answer += 1;
        break;
      }
    }
    sum = 0;
  }

  return answer;
}
```

여기까지가 완전탐색을 사용한 풀이였습니다. 일반적인 경우 모두 연산이 가능하지만 효율성 테스트에서 모두 걸리게 되었습니다.
따라서 규칙을 찾아보기로 하였습니다.

입력받은 숫자가 n 이라고 할때, i 번째에서 연속된 숫자의 합을 통해서 계산이 되는 경우

n - (i-1까지의 합) % i = 0 을 만족시켜야 합니다. 이에 맞추어 식을 세워줍니다.

```js
function solution(n) {
  var answer = 0;
  var sum = [0, 0];
  for (let i = 1; i <= n; i++) {
    sum.push(sum[i] + i);
    if (n - sum[i] > 0 && (n - sum[i]) % i === 0) {
      answer += 1;
    }
  }
  return answer;
}
```

# 4. 정리!

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

---
emoji: 😊
title: 다음 큰 숫자 JS [Lv2]
date: "2022-10-03 17:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[다음 큰 숫자](https://school.programmers.co.kr/learn/courses/30/lessons/12911)

자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의 합니다.

조건 1. n의 다음 큰 숫자는 n보다 큰 자연수 입니다.
조건 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같습니다.
조건 3. n의 다음 큰 숫자는 조건 1, 2를 만족하는 수 중 가장 작은 수 입니다.
예를 들어서 78(1001110)의 다음 큰 숫자는 83(1010011)입니다.

자연수 n이 매개변수로 주어질 때, n의 다음 큰 숫자를 return 하는 solution 함수를 완성해주세요.

제한 사항
n은 1,000,000 이하의 자연수 입니다.

# 2. 문제풀이

이전에서 이진변환 반복하기를 통해서 익힌 toString을 통한 이진수로의 변환을 이용합니다.
이동한 후 map 함수를 통해서 각 1을 count를 하여 수를 늘려줍니다.

# 3. 코드

```js
function solution(n) {
  let countN = 0;
  n.toString(2)
    .split("")
    .map((el) => {
      if (el === "1") {
        countN += 1;
      }
    });

  while (1) {
    n += 1;
    let tempCount = 0;
    n.toString(2)
      .split("")
      .map((el) => {
        if (el === "1") tempCount += 1;
      });
    if (tempCount === countN) {
      return n;
    }
  }
}
```

# 4. 정리!

1을 셀수 있는 방법이 굉장히 많지만 저는 간단하게 배열로 전환한 후 map을 통해서 1인 경우 count를 늘려주면서 풀어주었습니다.

생각난 간단한 방법은 replace("0" , "")으로 바꾸어 주어 문자열 내부의 0을 모두 제거 한 후 길이를 측정하는 것이 쉬울것 같습니다!

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

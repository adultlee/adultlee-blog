---
emoji: 😊
title: 최솟값 만들기 JS [Lv2]
date: "2022-10-02 15:02:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[최솟값 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12941)

길이가 같은 배열 A, B 두개가 있습니다. 각 배열은 자연수로 이루어져 있습니다.
배열 A, B에서 각각 한 개의 숫자를 뽑아 두 수를 곱합니다. 이러한 과정을 배열의 길이만큼 반복하며, 두 수를 곱한 값을 누적하여 더합니다. 이때 최종적으로 누적된 값이 최소가 되도록 만드는 것이 목표입니다. (단, 각 배열에서 k번째 숫자를 뽑았다면 다음에 k번째 숫자는 다시 뽑을 수 없습니다.)

# 2. 문제풀이

배열의 크기가 1000 이므로 BFS로 푸는 경우 총 연산의 가짓수는 1000! \* 1000!가 된다.
따라서 이 방법을 사용해서는 안된다.

반대로 가장 최대가 되는 방법을 생각해본다.
당연히 가장 값이 비슷한 값들이 곱해지는 것이다. ex) 두수의 합이 10일때, 5 \* 5 가 가장 큰 경우의 수다.

A는 오름차순으로 졍렬 , B는 내림차순으로 정렬 후 각 원소를 서로 곱해준다.

# 3. 코드

```js
function solution(A, B) {
  let answer = 0;

  A.sort((a, b) => a - b); // 오름차순 정렬
  B.sort((a, b) => b - a); // 내림차순 정렬

  // 두 배열의 길이는 같습니다.

  for (let i = 0; i < A.length; i++) {
    answer += A[i] * B[i];
  }

  return answer;
}
```

# 4. 정리!

[최댓값 최솟값](https://www.adultlee.com/Algorithm/LV2/%EC%B5%9C%EB%8C%93%EA%B0%92%EA%B3%BC%20%EC%B5%9C%EC%86%9F%EA%B0%92/)
문제에서 정리한 sort를 사용합니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

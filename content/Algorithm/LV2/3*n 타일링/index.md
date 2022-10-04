---
emoji: 😊
title: 3*n 타일링 JS [Lv2]
date: "2022-10-03 18:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[3\*n 타일링](https://school.programmers.co.kr/learn/courses/30/lessons/12902)

가로 길이가 2이고 세로의 길이가 1인 직사각형 모양의 타일이 있습니다. 이 직사각형 타일을 이용하여 세로의 길이가 3이고 가로의 길이가 n인 바닥을 가득 채우려고 합니다. 타일을 채울 때는 다음과 같이 2가지 방법이 있습니다

타일을 가로로 배치 하는 경우
타일을 세로로 배치 하는 경우

예를들어서 n이 8인 직사각형은 다음과 같이 채울 수 있습니다.

<img width="515" alt="image" src="https://user-images.githubusercontent.com/77886826/193541372-95196424-4ed8-4990-be86-b447d34e67b3.png">

직사각형의 가로의 길이 n이 매개변수로 주어질 때, 이 직사각형을 채우는 방법의 수를 return 하는 solution 함수를 완성해주세요.

# 2. 문제풀이

각 시행별 필요사항들을 적어서 표현해야만 했다.

가장 이해가 잘되었던 사진을 첨부하여 해석합니다

<img width="564" alt="image" src="https://user-images.githubusercontent.com/77886826/193771719-e694f72b-23be-4c9f-af8e-00b2639b3ced.png">

사진을 통해서 볼 수 있듯 n=8일때 입니다.

# 3. 코드

```js
function solution(n) {
  let DP = [0, 3, 11]; // 1번째는  2 * 1 일때의 타일의 가짓수 입니다.

  let sumDp = [0, 0, 0, 3]; // i번째 사용해야 하는 합입니다.

  if (n % 2 === 1) {
    return 0;
  } else {
    for (let i = 3; i <= n / 2; i++) {
      DP[i] = (DP[i - 1] * 3 + sumDp[i] * 2 + 2) % 1000000007;
      sumDp.push(sumDp[i] + DP[i - 1]);
    }
    return DP[n / 2];
  }
}
```

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

- [본문의 사진 출처](https://s2choco.tistory.com/24)

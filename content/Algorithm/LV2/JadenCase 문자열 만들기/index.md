---
emoji: 📖
title: JadenCase 만들기 [Lv2]
date: "2022-10-02 14:02:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[JadenCase 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12951)

JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

# 2. 문제풀이

문자열 -> 배열 후에 조건에 맞추어 출력합니다.  
(문제는 JadenCase만들기 인데 왜 제목은 JadenCase가 아니지...?)

# 3. 코드

```js
function solution(s) {
  let senceArray = s.split("");

  const sentence = senceArray
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      } else if (senceArray[index - 1] === " ") {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    })
    .join("");

  return sentence;
}
```

# 4. 정리!

[신규 아이디 추천](https://www.adultlee.com/Algorithm/LV1/%EC%8B%A0%EA%B7%9C%20%EC%95%84%EC%9D%B4%EB%94%94%20%EC%B6%94%EC%B2%9C/)
문제에서 사용한 toLowerCase()의 반대 버전인 toUpperCase()를 각 원소별로 사용합니다.

## +) 다른 분의 풀이

```js
function solution(s) {
  return s
    .split(" ")
    .map((v) => v.charAt(0).toUpperCase() + v.substring(1).toLowerCase())
    .join(" ");
}
```

1. 입력받은 문자열을 공백을 기준으로 나누어 배열로 만들어 준다.
2. 배열로 나누어진 각 원소들의 첫문자는 toUpperCase 를 통해서 대문자로 만들어준뒤 나머지 문자들을 첫 원소를 제외하고 모두 toLowerCase를 사용합니다.

- subString(1)이란?  
  1번째를 시작점으로 문자열의 끝까지를 return 합니다
  이 경우 v전체중 첫번째 원소를 제외한 문자열 전체를 return 하는것으로 확인할 수 있습니다.

일반적으로 slice, substr , subString이 비슷한 기능을 하는것으로 확인할 수 있으며
여기서는 간단하게 해당 원소로 들어가는 인자들을 기준으로 a 부터 b 까지 문자열만을 return한다고 생각하면 됩니다.
단순히 인자가 하나만 있다면 그 지점을 시작으로 문자열의 끝까지를 리턴합니다.
즉 a 는 해당 인자, b는 문자열의 끝지점을 바라봅니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

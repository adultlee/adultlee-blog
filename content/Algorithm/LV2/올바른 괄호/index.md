---
emoji: 😊
title: 올바른 괄호 JS [Lv2]
date: "2022-10-03 14:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[올바른 괄호](https://school.programmers.co.kr/learn/courses/30/lessons/12909)

괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

"()()" 또는 "(())()" 는 올바른 괄호입니다.
")()(" 또는 "(()(" 는 올바르지 않은 괄호입니다.
'(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

# 2. 문제풀이

stack을 통해서 괄호가 input될때, stack에 가장 최근에 입력된 요소와 비교해서 연산을 진행합니다.
array기본 연산들중 하나인 pop을 통해서 아주 손쉽게 해결할 수 있습니다.

# 3. 코드

```js
function solution(s) {
  let arrayS = s.split(""); // 입력받은 문자열을 배열로서 변환합니다.
  let stack = []; // 관리할 stack을 선언

  stack.push(arrayS[0]);

  for (let i = 1; i < arrayS.length; i++) {
    if (arrayS[i] === ")" && stack[stack.length - 1] === "(") {
      // 괄호가 사라지는 유일한 조건
      stack.pop();
    } else {
      stack.push(arrayS[i]);
    }
  }

  return stack.length > 0 ? false : true;
}
```

# 4. 정리!

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

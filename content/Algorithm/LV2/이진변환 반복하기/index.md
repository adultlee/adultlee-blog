---
emoji: 📖
title: 이진변환 반복하기 JS [Lv2]
date: "2022-10-02 17:20:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[이진변환 반복하기](https://school.programmers.co.kr/learn/courses/30/lessons/70129)

0과 1로 이루어진 어떤 문자열 x에 대한 이진 변환을 다음과 같이 정의합니다.

x의 모든 0을 제거합니다.  
x의 길이를 c라고 하면, x를 "c를 2진법으로 표현한 문자열"로 바꿉니다.  
예를 들어, x = "0111010"이라면, x에 이진 변환을 가하면 x = "0111010" -> "1111" -> "100" 이 됩니다.

0과 1로 이루어진 문자열 s가 매개변수로 주어집니다. s가 "1"이 될 때까지 계속해서 s에 이진 변환을 가했을 때, 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 각각 배열에 담아 return 하도록 solution 함수를 완성해주세요.

# 2. 문제풀이

js에 내장된 2진 변환 코드 방법을 알고 있다면 훨씬 빠르게 풀 수 있습니다.  
하지만 아닌 2진 변환을 직접 구현하여 문제를 해결하였습니다.

문제는 크게 3부분으로 구성되어 있습니다.

- solution 함수 : 문자열을 받아서 while문을 통해 제한조건까지 함수를 실행시킵니다.
- to2 함수 : number를 받은 후 해당 숫자를 2진변환해줍니다.
- checkBy2 : 지금 숫자 몇으로 나누어주어야 하는지 확인하는 함수 입니다. 그리고 몇 제곱에서 곱해주었는지도 동시에 return 합니다.

해당 코드는 solution부터 읽는것이 도움됩니다.

# 3. 코드

```js
function checkBy2(number) {
  // 해당 number를 무엇으로 나누어야 하는지 확인합니다.
  let answer;
  let squ = 1;
  let n;
  for (n = 0; n < 100; n++) {
    // n을 반복하면서 squ를 제곱으로 증가시킵니다.
    if (squ <= number && number < squ * 2) {
      answer = squ;
      break;
    } else {
      squ = squ * 2;
    }
  }
  return { answer, n };
}

function to2(number) {
  // 2진수로 만드는 함수 일반적으로 10진수를 2진수로 바꾸는 방식을 사용했습니다.
  let answerArray = []; // 숫자가 들어갑니다. [7 4 1 , 0]이 원소로 들어가는 경우 7번째 4번째 1번째 0번째 원소가 1이라는 뜻입니다.
  let answer = ""; // 마지막에 반환하는 문자열입니다.
  let cal = number;
  let i = 1;

  while (cal > 0) {
    // 2진변환을 진행하기 위한 종료 조건입니다. 0일때 종료됩니다.
    if (cal === 1) {
      answerArray.push(0); // 0번째 원소에 1을 넣어주라는 뜻으로입니다.
      cal -= 1;
    } else {
      answerArray.push(checkBy2(cal).n); // 현재 몇 제곱으로 빼주어야 하는지 확인합니다.
      cal -= checkBy2(cal).answer; // cal을 빼줍니다.
    }
  }

  for (let i = 0; i <= answerArray[0]; i++) {
    if (answerArray.includes(i)) {
      // 해당 몇번째 인지 확인 후 해당 위치에 1을 추가합니다.
      answer = "1" + answer;
    } else {
      answer = "0" + answer; // 아니라면 0을 더해줍니다.
    }
  }

  return String(answer); // string 2진수를 return 해야 합니다.
}

function solution(s) {
  var answer = [];
  let zeroCount = 0; // 0이 몇개였는지 map을 통해서 확인합니다.
  let count = 0; //몇번 순회를 돌았는지 확인합니다.
  while (s !== "1") {
    // 종료조건을 명시합니다.

    s = to2(
      s
        .split("")
        .map((e) => {
          // to2함수를 사용하여 2진변환합니다.
          if (e === "0") {
            zeroCount += 1; // 0을 count합니다.
          } else {
            return e; // 0이 아닌경우 즉, 1일 때만 return 합니다.
          }
        })
        .join("").length
    );

    count += 1;
  }
  return [count, zeroCount];
}
```

# 4. 정리!

명확하게 기능 단위로 함수를 나누는 것이 문제를 풀때 도움이 된다.

## +) 다른 분의 풀이

```js
function solution(s) {
  var answer = [0, 0];
  while (s.length > 1) {
    answer[0]++;
    answer[1] += (s.match(/0/g) || []).length;
    s = s.replace(/0/g, "").length.toString(2);
  }
  return answer;
}
```

놀라운 풀이..! 정규표현식을 자유롭게 사용하시는것을 확인할 수 잇다. 간단하게 사용된 테크닉을 정리해본다.

match는 정규표현식을 인자로 받는지 안받는지에 따라 다른 동작을 수행합니다.

- 정규표현식을 사용한다면 해당 조건에 만족하는 문자열을 return 합니다.
- 정규표현식을 사용하지 않으며 s.match("1") 과 같이 사용한다면 1 을 return 하게 됩니다.

**하지만** 만족하는 값이 없다면 null을 return 하게 됩니다.

여기서 null.length를 방지하기 위해서 null || [] => []를 이용해 0을 return 하도록합니다.

그 다음 아주 간단하게 2진변환을 진행하는 toString함수 입니다.

인자로 받게된 요소를 간단하게 string으로 바꾸어줍니다. 하지만 ()안에 인자를 넣어주게 되면 해당 숫자로 진수변환을 진행합니다.  
예를 들어 toString(8)의 경우 8진수 문자열로 변환합니다.

위에 코드에서 String()으로 형변환을 시도했는데 toString을 연습해야겠다는 생각이 들었습니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

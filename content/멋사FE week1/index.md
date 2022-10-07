---
emoji: 🦁
title: (멋사 FE) 1주차 과제 해설
date: "2022-05-10 17:19:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

<span style="color : gray">이 문서는 멋쟁이 사자처럼 FE를 위한 교육자료로 작성되었습니다.</span>

# 실습 목표

- js를 통해서 프로그래밍에 언어에 대해서 학습한다.
- js의 입출력 , 조건문, 반복문, 배열 에 대해 학습합니다.

# 실습 문제

**입출력**

- Hello World : [https://www.acmicpc.net/problem/2557](https://www.acmicpc.net/problem/2557)
- 사칙연산 : [https://www.acmicpc.net/problem/10869](https://www.acmicpc.net/problem/10869)

**조건문**

- 시험 성적 : [https://www.acmicpc.net/problem/9498](https://www.acmicpc.net/problem/9498)
- 윤년 : [https://www.acmicpc.net/problem/2753](https://www.acmicpc.net/problem/2753)

**반복문**

- N 출력 [https://www.acmicpc.net/problem/2741](https://www.acmicpc.net/problem/2741)
- 별찍기 -1 [https://www.acmicpc.net/problem/2438](https://www.acmicpc.net/problem/2438)

**배열**

- 최소, 최대
  [https://www.acmicpc.net/problem/10818](https://www.acmicpc.net/problem/10818)
- 나머지
  [https://www.acmicpc.net/problem/3052](https://www.acmicpc.net/problem/3052)

# 제출 방법

- 사전과제의 제출 방식과 동일합니다.
- 각 문제는 각각의 개별 파일로 만들어서 작성합니다.
  ex) Hello World 문제의 경우 bj2557.js 등으로 만들어서 작성합니다.

# 해설

## 1. Hello World!

모두들 첫번째 문제부터 곤혹스러우셨을까요?😊
정답은 다음과 같습니다.

```js
console.log("Hello World");
```

console.log는 정말 많은 곳에서 사용됩니다!!! 여러분의 웹 개발에 있어서 정말 친숙한 도구로 함께 하실거에요!

## 2. 사칙연산

해당 문제에서는 JS를 통한 간단한 사칙연산을 진행하도록합니다.

```js
let input = require("fs").readFileSync("dev/stdin").toString().split(" ");

const num1 = Number(input[0]);
const num2 = Number(input[1]);
console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(Math.floor(num1 / num2)); // 문제 조건에서 정수만을 출력해주어야 하기 때문에 소숫점을 제거하기 위해 Math.floor 함수를 사용합니다!
console.log(num1 % num2);
```

나눗셈을 표현하는 방법이 조금 생소 하실 수도 있을 것같습니다. 간단하게 Math.floor는 반올림을 해주는 함수이며 인자로서 num1/num2를 넣어주게 되면 그에 대한 결과로서 반올림된 결과가 return 되게 됩니다! 함수의 형태에 대해 직관적인 이해가 안된다면 수학 공식처럼 이해하시는 것이 좋습니다1!

<img width="268" alt="image" src="https://user-images.githubusercontent.com/77886826/194587144-cd884c3e-dc2f-4dcc-963a-17fcbfaea404.png">

다음 사진과 같이 이해하시는 것이 좋습니다!! 저희는 x(정의역) 에 num1/num2 를 넣어주었구 그에 따른 결과 Y를 기대하고 있습니다!

+) %기호는 앞의 수를 뒤로 나눈 나머지를 남기게 됩니다! ex) 5%3=2

## 3. 시험 성적

프로그래밍에서 빼놓을 수가 없는 조건문을 배우게 되었습니다!!
if는 간단합니다. 영어에서 사용하는 그 의미를 그대로 사용하시면 됩니다!
만약 ~~ 라면, ~~이다. 를 한줄로 요약해주는 코드 입니다!

```js
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString();
const score = parseInt(input);

if (score >= 90) {
  // 만약 90 이상 이라면?
  console.log("A"); // A를 출력하라
} else if (score >= 80) {
  // 괄호 안에 들어있는 구문은 조건문입니다.
  //  이 구문에는 항상 true false로 결과가 나누어져야 합니다
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else if (score >= 60) {
  console.log("D");
} else {
  // 해당 모든 조건을 모두 충족시키지 못했다면
  console.log("F"); // 해당 F를 출력합니다
}
```

## 4. 윤년

윤년에 대한 조건을 명확하게 이해한 후 진행하는 것이 필요합니다!  
윤년의 정의를 먼저 확인해 보겠습니다.
윤년은 율리우스력에서 발생하는 오류를 수정하기 위해서 고안되었습니다! 일반적인 양력에서 평년은 365일 이지만 정확히는 365.2425...년 이므로 4년에 한번씩 한해가 366일인 윤년을 사용함으로써 오류를 수정합니다! 따라서 4년에 한번씩 윤년이 돌아옵니다. 하지만 이뿐이 아닌 **_100년으론 나누어 떨어지지 않고 400년으로 나누어 떨어져야만 합니다!_**

```js
let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");
const date = Number(input[0]);

if (date % 4 === 0 && date % 100 !== 0) {
  console.log(1);
} else if (date % 4 === 0 && date % 400 === 0) {
  console.log(1);
} else {
  console.log(0);
}
```

- 궁금증 하나!  
  **_&& 는 무슨 뜻인가요?_**  
  일반적으로 &&는 AND 연산자라고 부르며 두개의 피연산자가 모두 참 인경우에만 참를 반환합니다!
  즉, ( 얘 그리고 얘 ) 모두가 참이 되어야 한다는 뜻입니다! 또한 굉장히 빈번하게 사용되는 것이 바로 || 연산자 입니다. || 연산자는 OR 연산자라고 부르며 두개의 피연산자가 모두 거짓인 경우에만 거짓을 반환합니다. 즉, (얘 또는 얘) 모두가 거짓이어야만 거짓을 반환합니다.
- 궁금증 둘!  
  **_왜 ===이 세 번씩이나 들어갈까요?_**  
  조금 어렵지만 자바스크립트는 엄격한 비교와 유형변환비교를 모두 지원하기 때문입니다. === 는 변수유형을 고려하는 반면, == 는 변수 값을 기반으로 확인합니다. 대표적인 문제들입니다.

  ```js
   0 == "0"  // true
   0 == []   // true
   [] == "0" // false 딱봐도 끔찍합니다... ㅎ
             //잘 이해가 안된다면 ===으로 코드를 짜도록하죠!
  ```

  이걸 해결하기 위해선 어떤방식이 좋을까요? 한번 생각해봅시다!!

## 5. N 출력

자연수를 받아서 하나씩 출력하기 위해선 어떻게 해야할까요?  
프로그래밍에서는 반복적인 작업을 수행하기 위해 굉장히 간편한 도구를 제공합니다!
바로 반복문입니다! 특히나 JS에서는 반복작업을 돕기 위한 여러가지 도구들이 존재하지만 여기서는 for문만을 사용하도록 합시다!

```js
let input = Number(require("fs").readFileSync("/dev/stdin").toString());

for (let i = 1; i <= input; i++) {
  console.log(i + "\n");
} // 으로 풀었으나 마지막에 몰아서 출력해주어야 했네요! 역시 백준은 출력 설정이 제일 어려운...
// 아래의 코드가 정답입니다!
let input = Number(require("fs").readFileSync("/dev/stdin").toString());
let string = "";
for (let i = 1; i <= input; i++) {
  string += i + "\n";
}
console.log(string);
```

for 문은 크게 4가지 부분으로 이루어져 있습니다! 각각 번호를 나누어 설명해보겠습니다

```
for( 1; 2; 3){
      4
}
```

- 1번 : 반복문의 시작조건을 의미합니다.
- 2번 : 반복문의 종료조건을 의미합니다. 해당 조건이 true라면 바로 4번 부분을 실행시킵니다.
- 3번 : 반복문의 증감조건을 명시합니다. 해당 부분을 통해 반복문의 진행을 관리할 수 있습니다
- 4번 : 반복문의 실행이 되는 구문입니다. 2번조건을 만족한다면 실행합니다.

## 6. 별찍기

기대하고 소문만 듣던 바로 별찍기 입니다!

<img width="629" alt="image" src="https://user-images.githubusercontent.com/77886826/194594936-c5031ed7-55cd-4b1a-a6b9-524bd8d6adbf.png">
유명한 사진이 있지만... 저흰 그래도 초보니까요! 초보로서 코드를 구성해보겠습니다.

제출하신것을 보니 대부분 2중 for문으로 푸셔서 이런코드도 추가해봅니다!

```js
let input = require("fs").readFileSync("/dev/stdin").toString();

let star = ""; // star가 한줄씩 지나가며 추가됩니다!

for (let i = 0; i < input; i++) {
  star += "*"; // 반복문의 한 사이클이 끝날 떄마다 star에 *이 추가가 됩니다.
  console.log(star);
}
```

## 7. 최소, 최대

배열은 여러가지 변수들을 한번에 제어할 때 아주 효율적으로 사용할 수 있습니다!
다음과 같이 반복문과 같이 사용하는 경우가 많습니다.

```js
let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let count = Number(input[0]);
// split 함수는 해당문자열을 받은 인자(" ")를 중심으로 배열로 return 합니다.
let numbers = input[1].split(" ").map((x) => Number(x));

let max = 0;
let min = 9999999;

for (let i = 1; i < count; i++) {
  if (max < numbers[i]) {
    // 매 시행마다 가장 큰값을 찾습니다
    max = numbers[i];
  }
  if (min > numbers[i]) {
    min = numbers[i];
  }
}

console.log(min + "  " + max);
```

## 8. 나머지

저희 과제의 마지막 문제입니다!  
생각해 볼 수 있는 방법이 아닌 특별한 방법들을 시도해 보겠습니다!

```js
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n').map(Number); // 일반적으로 받은 입력

let arr = input.map(ele => ele % 42); // 반복문에서 언급했던 특별한 반복함수 입니다. map함수에 대해서 찾아보는것이 좋으며 여기서는 input으로 들어온 각 인자들에 대해서 함수를 실행해 배열로 반환한다고 이해하시면 됩니다!

// 여기서 나머지들을 남깁니다!
const set = new Set(arr); // 이 문제의 가장 난해한 부분입니다! 겹치는것을 효과적으로 없애갸 하는데 js 에서는 set 자료형이 중복을 없애 주며 유일한 값들 만을 남깁니다!

cosnt answer = [...set];

console.log(answer.length); // console.log([...set].length)도 가능합니다!

```

# 참고할 만한 지식

- [입출력 방법](https://lamarr.dev/javascript/2020/04/06/01.html)
- [조건문이란?](https://goddaehee.tistory.com/225)
- [반복문이란?](https://velog.io/@whgurwns2003/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-js-%EB%B0%98%EB%B3%B5%EB%AC%B8-%EC%A0%95%EB%A6%AC)
- [배열이란?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=heartflow89&logNo=221210069747)

### 모두들 즐거운 하루 되시길

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

[Git 실습 레포](https://github.com/Likelion-Inha-10/fe-week1)

---
emoji: 🦁
title: (멋사FE) 프로그래밍 언어 검색 문제 풀기
date: "2022-04-26 01:05:00"
author: 이성인
tags: 멋사
categories: 멋사FE
---

# 서론

이번 주차에는 지난 시간에 배운 js를 통한 dom 접근 방법들을 활용해 가며  
프로그래머스 "2022 Dev-Matching: 웹 프론트엔드 개발자(상반기) 프로그래밍 언어 검색" 과제를 풀어보도록 하겠습니다.  
본 글은 프로그래머스 기술 블로그에 기술된 과제 해설을 따라 가되 제 개인적인 코드 해석을 추가하면서 진행됩니다.

# 문제 소개

![image](https://user-images.githubusercontent.com/77886826/192502180-98aeb8da-f7d2-4638-a995-e8747df12ab9.png)

[프로그래머스](https://programmers.co.kr/skill_check_assignments/298) 에서 풀어볼 수 있습니다.

<img width="363" alt="image" src="https://user-images.githubusercontent.com/77886826/192503834-ff63415e-d422-4cf4-9d79-aa5b916042a2.png">
위의 사진은 우리가 완성시킬 목표물 입니다.  
우리는 index.html부터 시작해서 코드를 함께 작성해 나갈 예정입니다.

# 코드 작성

## 기본 셋팅

```html
<html>
  <head>
    <title>2022 멋사 10기 화이팅!</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <main class="App"></main>
    <script src="./index.js" type="module"></script>
  </body>
</html>
```

아주 기초적인 html을 작성합니다.  
style.css는 문제를 풀때 추가 되어 있으나 여기서는 추가하지 않고 하단의 Link에서 추가하도록 하겠습니다.

script 태그는 body 태그의 최하단에 위치하는 것이 좋습니다.  
왜냐하면 렌더링 엔진이 Html을 파싱하다가 script 태그를 만나게 된다면 Html 문서의 파싱을 중단하고 js 파일을 로드하게 됩니다. 이 경우 html문서를 파싱하는 과정에 있어서 2가지 문제가 발생하게 됩니다. 첫번째는 js 로드가 끝날때까지 화면에 표시되는것이 **_지연_**됩니다. 두번째는 html 태그의 파싱이 끝나기 전에 script를 읽게 되므로 **_완성되지 않은 dom_**에 js가 접근할 수 있습니다.

따라서 우리가 읽을 ./index.js는 body 태그의 최하단에 위치시킵니다.

index.js

```js
import App from "./App.js";

const app = new App({ $target: document.querySelector(".App") });
```

index.js에 해당하는 코드입니다.
App을 ./App.js 에서 import 한 후 new를 통해 생성시켜 주었습니다.  
그리고 인자로서 index.html 문서의 main 태그의 class에 접근합니다. 이때 class 에 접근 하는것이므로 항상 **.App** 로 읽도록 합니다.
(id를 통해서 읽는 경우에는 getElementById(id) 다음과 같이 그냥 작성해주어도 무방합니다.)  
이제 App으로 이동합니다.

```js
// 최상단에는 보통 다른 파일에서 import하는 파일들을 명시합니다.
// import 를 하는 순서에도 나름의 컨벤션이 있으나 지금은 크게 신경쓰지 않습니다.

export default function App({ $target }) {
  this.state = {
    // 초기 프로젝트를 설계할때 구현 조건을 보고 관리해야할 변수중 적합한 변수를 골라내야합니다.
    fetchedLanguages: [], // api를 통해서 읽어온 언어들의 배열
    selectedLanguages: [], // 내가 enter, click등을 통해서 선택한 언어들의 배열
  };

  this.setState = (nextState) => {
    // setState함수는 일반적으로 해당 컴포넌트에서 상태를 관리합니다.
  };
}
```

App 에 해당하는 코드 입니다. 보통 프로젝트를 구성할때 App.js는 모든 기능의 중심 역할을 수행합니다.

## SearchInput 컴포넌트 구현하기

SearchInput 컴포넌트를 구현합니다.  
해당 컴포넌트가 사용할 예상 기능들을 먼저 나열합니다.

-

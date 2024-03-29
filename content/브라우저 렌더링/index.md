---
emoji: 😀
title: 브라우저 렌더링
date: "2022-07-25 01:21:00"
author: 이성인
tags: 짧은지식
categories: 짧은지식
---

# 😎 브라우저란?

<span style="color:purple">브라우저란 동기(Synchronous)적으로 (HTML + CSS), Javascript 언어를 해석하여 내용을 화면에 보여주는 응용 소프트웨어입니다. </span>

브라우저의 주된 기능은 사용자가 원하는 정보를 서버에 요청하고 브라우저에 표시하는것입니다.
여기서 원하는 정보의 종류는 크게 Html , img, pdf 등입니다.
여기서 정보의 종류 특히나 Html을 구분하는 것은 <b>주소</b>라고 하며, 이는 Url(Uniform Resource Locator) 이라고 합니다.

브라우저의 종류에는 크롬, 사파리, 파이어폭스 (오픈소스 기반) , 네이버 웨일 등등 다양한 종류의 브라우저가 존재합니다.
<img width="756" alt="image" src="https://user-images.githubusercontent.com/77886826/168849924-abb4aa23-3c00-4e5b-b03a-9a4ccce43106.png">
<br>
최근 유저들의 브라우저 점유율 입니다. 크롬과 사파리가 대부분을 차지하는것으로 보입니다. <br>

# 브라우저의 구성요소

<span style="color:gray">브라우저의 여러 구성 요소가 있지만 브라우저 렌더링 과정에 중심이 되는 요소들을 중심으로 작성하겠습니다.</span>

<img width="578" alt="image" src="https://user-images.githubusercontent.com/77886826/168853269-1aaf3ade-362a-47e3-b9e2-08fe7571f713.png">

## 1. User Interface

주소 표시줄 , 이전 앞으로 가기 버튼, 즐겨찾기, 설정, 창 끄기, 텝, 등등 페이지 정보를 표시하는 창을 제외한 모든 부분입니다. 여러 브라우저들은 서로 경쟁과 발전을 통해서 어느 정도 유사한 디자인을 가지게 되었습니다.

## 2. Browser Engine

User Interface와 Rendering Engine 사이의 동작을 제어해주는 엔진입니다.

## 3. Rendering Engine

웹에서 렌더링 엔진의 역할은 요청 받은 내용을 브라우저 화면에 Render 시키는 역할입니다.
일반적으로 사용되는 크롬, 사파리등은 webkit 엔진을 사용하고 있습니다.

### 3-1. Rendering Engine 의 개략적인 동작원리

<img width="641" alt="image" src="https://user-images.githubusercontent.com/77886826/168854838-0ea96287-1d15-45ee-a90e-2f3b88de8b7f.png">
<br>
다음은 브라우저의 렌더링 엔진이 Render 시키는 동작 순서를 간략히 표현한 것이다. 
렌더링 엔진은 서버로 부터 전달밭은 Html문서를 파싱하고 DOM(Document Object Model) tree를 생성합니다. 그리고 css 요소를 적용시키기 위해 마찬가지로  CSSOM(Cascading Style Sheets Object Model)tree 를 생성합니다. 
그리도 두 트리를 매칭 시켜 Render tree를 생성합니다. 그 후 화면에 Render tree를 통해 구성한 요소들이 화면에 정확히 배치 될 위치를 정하고, 정해진 위치를 기반으로 화면에 render 합니다.
여기서 Render tree에는 화면에 직접적으로 표시가 될 요소들만이 존재하기 때문에  css 속성으로 visibility : hidden;인 요소는 괜찮지만 display: none 은 Render tree에서 제외됩니다.
<br>
<br>
<br>

### 3-2. Html문서를 파싱하던 중 script태그를 만난다면?

Html 문서를 파싱하던중

```html
<script></script>
```

태그를 만나게 된다면 Html 문서의 파싱을 중단하고 js 파일을 로드하게 됩니다. 이 경우 html문서를 파싱하는 과정에 있어서 2가지 문제가 발생하게 됩니다.

1. html문서를 파싱하다가 script 태그를 만나게 되면 html태그를 파싱하다가 중단하게 되고 js 파일의 로드가 끝날때 까지 화면에 표시되는 것이 지연된다.
2. Html문서의 파싱이 끝나기 전에 script 태그를 만나게 되면 완성되지 않은 Dom에 Js가 접근할 수 있다.

따라서 위와 같은 상황을 피하기 위해 script 태그는 body태그의 최하단에 위치하는 것이 좋습니다.  
혹은 다음과 같은 방법으로 js 파일을 로드하는것을 지연시킬 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>script load</title>
  </head>
  <body>
    <script>
      // window.onload가 가장 앞에 위치!
      window.onload = function () {
        console.log("afterwindowload");
        var target = document.querySelector("#test");
        console.log(target);
      };
      // DOMContentLoaded가 두번째에 위치!
      document.addEventListener("DOMContentLoaded", function () {
        console.log("afterdomload");
        var target = document.querySelector("#test");
        console.log(target);
      });
      // 일반 script 코드가 가장 끝에 위치
      console.log("바로시작");
      var target = document.querySelector("#test");
      console.log(target);
    </script>
    <div id="test">test</div>
  </body>
</html>
```

위의 코드에서 볼 수 있듯 script 태그가 body 태그의 시작부분에 존재합니다. 하지만 onload함수 , "DOMContentLoaded"를 통해서 script 태그를 만나더라도 js 파일의 load를 지연시킬 수 있습니다.

<img width="314" alt="image" src="https://user-images.githubusercontent.com/77886826/168871426-6fd34ebc-d6f0-4fea-b346-b8d8ad35dc15.png">

위와 같이 script의 하단의 console.log의 출력을 보면 null로 나오게 됩니다. 하지만 두 방법을 통해서 html 파싱이 끝난 후 요소에 접근 했기 때문에 querySelector를 통해서 접근한 div 태그를 출력할 수 있습니다.

### 3-3. DOM tree와 CSSOM tree 의 생성

HTML 문서의 파싱이 정상적으로 마무리 되었다면, 이를 바탕으로 렌더링 엔진은 DOM tree를 생성합니다.

- DOM tree
  <img width="718" alt="image" src="https://user-images.githubusercontent.com/77886826/168873429-5fe2f992-dc68-4da1-ae10-6558c6875f53.png">
- CSSOM tree
  <img width="667" alt="image" src="https://user-images.githubusercontent.com/77886826/168873470-bc9fee1f-6917-42aa-8dc0-af9fc4b8cde8.png">
-

### 3-4. Render tree 구축

- Render tree (DOM + CSSOM)
  <img width="722" alt="image" src="https://user-images.githubusercontent.com/77886826/168873776-6ed205cb-2ae7-44ae-9c4f-1c0efab67e3e.png">
  <br>
  Render tree 에서는 display:none이 된 요소는 포함되지 않습니다.

### 3-5. Render tree 배치

구축된 Render tree를 화면에 배치될 위치를 정합니다.(Layout)

### 3-6. Render tree 그리기

정해진 위치에 따라서 Render tree를 그립니다.(painting)

## 4. Javascript Engine

자바스크립트 언어를 해석하고 실행시킵니다. 가장 대중적으로 크롬에서 사용하는 v8 엔진이 있습니다.

# 간단요약

1. 사용자가 브라운저 엔진을 통해서 특정 url을 입력합니다.
2. 사용자가 입력한 URL 주소 중에서 도메인 네임(domain name) 부분을 DNS 서버에서 검색합니다.
3. DNS 서버는 해당 도메인 네임을 통해서 IP주소를 찾아서 필요한 정보(HTML 문서)를 사용자에게 반환합니다.
4. 브라우저의 렌더링 엔진은 HTML 문서를 파싱합니다.
5. 파싱하던 중 script태그를 만나게 되면 파싱을 중단하고 js파일을 로드합니다.
6. 파싱이 종료되면 이를 바탕으로 DOM tree를 생성합니다.
7. Link 태그를 통해서 stylesheet를 연결받는 경우 CSSOM을 생성합니다.
8. DOM tree + CSSOM tree => Render tree 구축 (여기서 화면에 보이지 않는 요소들은 배제합니다.)
9. 구축된 Render tree를 화면에 배치합니다.
10. 배치된 Render tree를 화면에 그립니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

<br>
 - [naver d2 브라우저 동작원리](https://d2.naver.com/helloworld/59361)
 - [웹 동작 과정과 React의 탄생](https://velog.io/@juno7803/React%EA%B0%80-%ED%83%9C%EC%96%B4%EB%82%9C-%EB%B0%B0%EA%B2%BD) 
 - [How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/) 
 - [자바스크립트는 어떻게 동작하는가](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%82%B4%EB%B6%80-%EC%B5%9C%EC%A0%81%ED%99%94%EB%90%9C-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%9E%91%EC%84%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-%ED%8C%81-6c6f9832c1d9) 
 - [웹 동작원리](http://www.tcpschool.com/webbasic/works)

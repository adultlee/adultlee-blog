---
emoji: 🦁
title: [멋사FE] Todolist 구현으로 배우는 JS
date: "2022-04-10 01:05:00"
author: 이성인
tags: 멋사
categories: 멋사FE
---

# 서론

지금 까지 배웠던 HTML, CSS, JS기초 문법들을 통해서 간단한 기능 구현을 해보겠습니다.

# 복습 - js 를 통한 dom 접근

간단한 todoList 를 만들어보면서 js를 통해 dom에 접근해 보겠습니다.

```html
<html>
  <head>
    <title>todolist</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <div id="todo-list"></div>
    <script>
      const data = [
        { text: "JS 공부하기", isComplete: true },
        { text: "JS 복습하기", isComplete: false },
        { text: "TS 복습하기", isComplete: false },
      ];

      document.querySelector("#todo-list").innerHTML = data
        .map((item) => "<li>" + item.text + "</li>")
        .join("");
    </script>
  </body>
</html>
```

평범하게 시작할 수 있는 html 파일에 data 배열 형태로 text를 넣어주었습니다.
그 후 **_document.querySelector_** 를 통해 내부의 innerHtml에 접근 하여 그 값을 조작합니다.
(querySelector 는 선택한 선택자를 포함한 태그 뭉치들 중에서 가장 '첫번째' 요소를 선택합니다. ([mdn]https://developer.mozilla.org/ko/docs/Web/API/Document/querySelector))  
(+) 탐색은 깊이 우선 전위순회를 통해서 찾게 되며 문서의 첫번째 요소부터 시작해 자식노드를 모두 검사합니다. )
data라는 배열에 map 함수를 사용하여 내부의 innerHtml을 변경합니다. 변경될 값을 예상해 보자면

```
<li>JS 복습하기</li><li>JS 복습하기</li><li>TS 복습하기</li>
```

라는 값이 string 형태로 들어갈것으로 보입니다. 여기서 join("")을 사용하지 않는 다면 각 배열의 원소간 사이에 ' , '이 생기게 됩니다.
아래는 join을 제거한 후 발생한 결과입니다. join은 배열의 각 원소를 더하여 하나의 스트링 형태로 리턴합니다. (정확히는 원소간 사이에 인자로 넣은 값을 넣어줍니다. 해당 코드에서는 아무런 값을 넣어주지 않아서 하나의 스트링으로 리턴합니다.)  
<img width="240" alt="image" src="https://user-images.githubusercontent.com/77886826/180638376-d3563a3f-00a1-4e50-ab81-35c607ad3586.png">

아래는 결과화면 입니다!  
하지만 예상치 못한 결과가 나왔습니다!

<img width="418" alt="image" src="https://user-images.githubusercontent.com/77886826/180594580-60a29ccf-fcf7-4f66-a308-92a171de4f2b.png">

다음과 같은 문제가 발생한 원인은 현재 제 vs코드의 인코딩을 EUS-KR로 진행하지만 meta 태그에선 utf-8 을 사용하기 때문에 발생한 결과입니다.

<img width="94" alt="image" src="https://user-images.githubusercontent.com/77886826/180594741-828645fc-60b0-43b5-b0c6-7a1609c0b797.png">

변경후!

<img width="75" alt="image" src="https://user-images.githubusercontent.com/77886826/180638169-6cb70c1b-8ea5-4cdb-8063-8f1534fae4cd.png">

아래와 같이 정상적인 결과가 나오는 것으로 확인할 수 있습니다.

<img width="142" alt="image" src="https://user-images.githubusercontent.com/77886826/180638191-223ebaf1-5784-4253-aaf2-166455a00507.png">

그러면 좀 더 query 선택자에 대해서 공부해보겠습니다.

```html
<html>
  <head>
    <title>todolist</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <div id="todo-list"></div>
    <script>
      const data = [
        { text: "JS 복습하기", isComplete: true },
        { text: "JS 복습하기", isComplete: false },
        { text: "TS 복습하기", isComplete: false },
      ];

      document.querySelector("#todo-list").innerHTML = data.map(
        (item) => "<li>" + item.text + "</li>"
      );

      console.log(document.querySelectorAll("#todo-list li"));
      console.log(document.querySelector("#todo-list li").innerHTML);
    </script>
  </body>
</html>
```

다음과 같이 console.log를 찍어서 확인해보도록 하겠습니다.
querySelectorAll은 해당 조건을 가진 모든 요소를 받아 옵니다.
해당 코드에서는 선택된 #todo-list 의 가상선택자로 하위의 li 태그를 받아옵니다.
아래 코드는 querySelector입니다. 이 코드는 앞서 적어둔 바와 같이 해당 조건을 만족시키는 요소들중 가장 첫번째 요소를 리턴합니다.  
아래는 해당 코드의 결과인 콘솔창입니다.
<img width="228" alt="image" src="https://user-images.githubusercontent.com/77886826/180638803-32ac2de2-93ad-4344-ad05-60f8a58cfbf3.png">  
예상한 바와 같이 해당 조건에 일치한 li 태그들이 리턴되며 li 태그의 첫번째 값의 innerHtml이 리턴되는것을 확인할 수 있습니다.

다소 낯선 문법이 보입니다. 'NodeList' 는 무엇일까요?

MDN 에 따르면 NodeList는 element.childNodes와 같은 속성(property)과 document.querySelectorAll 와 같은 메서드에 의해 반환되는 노드의 콜렉션이라고 합니다. 여기서 NodeList는 배열은 아니지만 forEach를 통해서 반복할 수 있습니다. 또한 Array.from 과 같은 문법을 통해서 배열 형태로 형변환을 시켜줄 수 도 있습니다.

# js 를 통한 css 접근

아래는 js 를 통해서 css 를 수정한 코드입니다.

```html
<html>
  <head>
    <title>todolist</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <div id="todo-list"></div>
    <script>
      const data = [
        { text: "JS 복습하기", isComplete: true },
        { text: "JS 복습하기", isComplete: false },
        { text: "TS 복습하기", isComplete: false },
      ];

      document.querySelector("#todo-list").innerHTML = data
        .map((item) => "<li>" + item.text + "</li>")
        .join("");

      console.log(document.querySelectorAll("#todo-list li"));
      console.log(document.querySelector("#todo-list li").innerHTML);

      document.querySelectorAll("#todo-list li").forEach((item, i) => {
        if (data[i].isComplete) {
          // css style을 이렇게도 줄 수 있다.
          item.style.color = "red";
          item.style.textDecoration = "line-through";
        }
      });
    </script>
  </body>
</html>
```

위의 문장에서 언급한 바와 같이 document.querySelectorAll 을 통해서 반환된 NodeList 속성은 배열은 아니지만 forEach 를 통해서 반환가능 합니다. 여기서 data는 위에서 선언한 값과 같고 isComplete 속성에 차이에 따라 item 요소의 style 에 접근하여 { color : red ; textDecoration : "line-through";} 을 부여합니다.
아래는 결과입니다

<img width="235" alt="image" src="https://user-images.githubusercontent.com/77886826/180772737-edd09685-5c31-4790-addc-1d920fb78713.png">  
 
예상과 같이 data의 첫 요소에 css 스타일이 적용된것을 확인할 수 있습니다.

지금까지 다소 직관적인 방법들을 통해서 data를 직접 조회해 가며 dom 에 직접 접근해 갔습니다.  
하지만 이러한 코드가 수백줄이 넘어가는 경우 유지보수에 큰 어려움을 겪을 수 있습니다. 따라서 추상화를 통해서 유지보수에 유용하도록 수정하겠습니다.

```html
<html>
  <head>
    <title>todolist</title>
    <meta charset="utf-8" />
  </head>

  <body>
    <div id="todo-list"></div>
    <script>
      const data = [
        { text: "JS 공부하기", isComplete: true },
        { text: "JS 복습하기", isComplete: false },
        { text: "TS 복습하기", isComplete: false },
      ];
      // TodoList 에 해당하는 기능들을 추상화 하여 구성하였습니다.
      function TodoList({ targetElement, initialState }) {
        // 현재 상태를 저장하기 위해 this.state 를 통해서 저장합니다.
        this.state = initialState;

        this.render = () => {
          targetElement.innerHTML = this.state
            .map((todo, i) => {
              if (data[i].isComplete) {
                return "<s>" + todo.text + "</s>";
              } else {
                return "<div>" + todo.text + "</div>";
              }
            })
            .join("");
        };

        this.setState = (nextState) => {
          this.state = nextState;
          this.render();
        };
        // 추상화한 함수 내부에서 render를 하게 되면 외부에서 render를 호출할 필요가 없습니다.
        this.render();
      }
      // js에서 여러가지 파라미터를 받을때는 꼭 객체 형태로 받을것, 그리고 하나하나씩 받아서 넘겨줄것

      const TodoList1 = new TodoList({
        targetElement: document.querySelector("#todo-list"),
        initialState: data,
      });
    </script>
  </body>
</html>
```

코드를 실행하게 되면 아래와 같은 결과가 나오게 됩니다.
<img width="273" alt="image" src="https://user-images.githubusercontent.com/77886826/180798165-e98c4d84-be79-49b2-b7a5-61dc3796cfe3.png">

추상화를 통해서 객체의 재사용성이 증가한 것을 확인할 수 있습니다.
여기서 사용된 new 함수는 js 의 생성자 함수입니다. new 키워드를 사용하면 아주 쉽게 유사한 객체를 여러게 동시에 만들 수 있어 재사용성에 유리합니다.

new 키워드는 다음과 같은 로직을 따라갑니다.

- 빈 객체를 만들어 this에 할당합니다.
- 함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 this를 수정합니다.
- this를 반환합니다.

위의 코드를 통해서 진행해 보겠습니다.

```js
function TodoList({ targetElement, initialState }) {
  // this = {}; 빈객체가 암시적으로 만들어집니다.

  // 새로운 프로퍼티를 this에 추가됩니다.
  this.state = initialState;

  // 해당 객체에서 사용될 reder 함수를 추가합니다.
  this.render = () => {
    targetElement.innerHTML = this.state
      .map((todo, i) => {
        if (data[i].isComplete) {
          return "<s>" + todo.text + "</s>";
        } else {
          return "<div>" + todo.text + "</div>";
        }
      })
      .join("");
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();

  // this 를 리턴합니다.
}
```

다음과 같은 방법을 통해서 손쉽게 객체를 추가할 수 있으며 새롭게 데이터를 추가하지 않아도 됩니다.
new 키워드는 객체를 추상화 할때만 사용되는 것이 아닌 함수의 캡슐화에서도 종종 사용됩니다.

한번 선언되지만 서로 연결성을 가지고 재상용이 되지 않는 여러 함수가 있다고 가정합시다.

```js
let user = new (function () {
  this.name = "John";
  this.isAdmin = false;

  // 사용자 객체를 만들기 위한 여러 코드.
  // 지역 변수, 복잡한 로직, 구문 등의
  // 다양한 코드가 여기에 들어갑니다.
})();
```

다음과 같이 익명함수를 new 키워드를 사용한다면 캡슐화를 진행하게 됩니다. 위 생성자 함수는 익명 함수이기 때문에 어디에도 저장되지 않습니다. 처음 만들 때부터 단 한 번만 호출할 목적으로 만들었기 때문에 재사용이 불가능합니다. 이렇게 익명 생성자 함수를 이용하면 재사용은 막으면서 코드를 캡슐화 할 수 있습니다.

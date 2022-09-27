---
emoji: 🦁
title: (멋사FE) 프로그래밍 언어 검색 문제 풀기
date: "2022-05-26 18:53:00"
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
// index.js
import App from "./App.js";

const app = new App({ $target: document.querySelector(".App") });
```

index.js에 해당하는 코드입니다.
App을 ./App.js 에서 import 한 후 new를 통해 생성시켜 주었습니다.  
그리고 인자로서 index.html 문서의 main 태그의 class에 접근합니다. 이때 class 에 접근 하는것이므로 항상 **.App** 로 읽도록 합니다.
(id를 통해서 읽는 경우에는 getElementById(id) 다음과 같이 그냥 작성해주어도 무방합니다.)  
이제 App으로 이동합니다.

```js
// App.js
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

## App 컴포넌트 구현하기

App 컴포넌트를 구현합니다.
해당 컴포넌트가 사용할 예상 기능들을 먼저 나열합니다.

- 해당 태그는 그 자체로서 dom에 요소를 만들어 내지 않습니다.
- 중심에서 공통적으로 사용해야하는 변수들을 관리합니다.
- 각각의 컴포넌트에 필요한 인자들 (변수 , 함수) 을 넘겨줍니다.
- 필요한 컴포넌트들을 나열합니다.
  - SearchInput : text를 입력 받을 때마다 keyword를 사용해 api 를 호출합니다. 그 결과값을 fetchedLanguages에 저장합니다.
  - Suggestion : api를 통해서 받은 값들을 보여줍니다. key입력과 click 이벤트를 통해서 selected된 값을 저장해 selectedLaguages에 저장합니다.
  - selectedLanguages : 전달받은 selectedLaguages들을 화면에 표시합니다. 5개가 넘어가지 않아야 하며 view에 보여질 때 적절한 관리가 필요합니다.

```js
import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import SelectedLanguage from "./SelectedLaguages.js";

import { fetchLanguages } from "./api.js";

// 필요한 요소들을 import해서 받아옵니다.

export default function App({ $target }) {
  this.state = {
    //관리해야할 변수들을 state로 보관합니다.
    fetchedLanguages: [], // api 를 통해서 받아서 저장한 언어 입니다.
    selectedLanguages: [], // Suggestion에서 사용되는
  };

  this.setState = (nextState) => {
    // setState 함수는 지금 state를 초기화 할때 사용하는 함수 입니다.
    // 일반적으로 nextState를 받아서 현재의 state값을 바꾸어 줍니다.
    this.state = {
      ...this.state,
      ...nextState,
    }; // 해당 state를 초기화 해줍니다.

    suggestion.setState({
      suggestionIndex: 0,
      items: this.state.fetchedLanguages,
    }); // 아래서 후술할 suggestion 함수에서의 state를 관리하는 setState함수를 받아서 사용합니다.

    selectedLanguages.setState(this.state.selectedLanguages);
    // 마찬가지로 selectedLaguages에 state를 관리할 수 있도록 setState함수를 사용합니다.
  };

  // 3개의 인자를 넘겨줍니다.
  // Input 태그를 나타내는 컴포넌트 입니다.
  const searchInput = new SearchInput({
    $target: $target, // 현재 main 태그
    initialState: "", // 초기 input 태그에 value로 들어가는 값
    // onChange는 인자로 넘어가는 함수로서 keyword를 input 태그의 e.target.value로 받아서 api 를 호출합니다.
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          // 해당 api 를 통해서 받은 결과값을 fetchedLaguages에 초기화 해줍니다.
          fetchedLanguages: languages,
        });
      }
    },
  });
  // Input 컴포넌트 아래에서 api로 받은 Laguages를 화면에 표시합니다.
  // onSelect를 통해서 Laguage를 선택하기도 합니다.
  const suggestion = new Suggestion({
    //
    $target, // 현재 main 태그
    initialState: {
      // 초기 상태를 의미합니다.
      suggestionIndex: 0, // 초기에 내려받는 Laguages의 순서를 나열하는 index값입니다.
      items: [], // 초기에 넘겨받는 items를 초기화해줍니다.
    },
    // selectedLanguages를 저장하기 위해 사용되는 함수로
    // 해당 함수는 suggestion의 인자로서 사용됩니다. (매서드 라고 불립니다)
    onSelect: (laguages) => {
      alert(laguages);

      const nextSelectedLaguages = [...this.state.selectedLanguages]; // 현재 선택된 selectedLaguages를 받아줍니다.
      // 이렇게 초기화를 하게 되면 얕은복사가 진행되어 저장된 주소값을 공유하지 않습니다.

      const index = nextSelectedLaguages.findIndex(
        (selectedLanguages) => selectedLanguages === laguages
      ); // 내가 지금까지 저장된 SelectedLaguages에 저장되어 있는지,

      if (index > -1) {
        // 만약 저장된 값이 있다면 ,(없다면 -1을 findIndex는 리턴합니다.)
        nextSelectedLaguages.splice(index, 1); // 해당하는 원소를 제거합니다.
      }
      nextSelectedLaguages.push(laguages); // 그 후 추가합니다.

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLaguages,
      }); // 그리고 해당 state들을 초기화 해줍니다.
    },
  });

  // selectedLaguages 는 선택된 selectedLanguages들을 받아서 나열해줍니다.
  const selectedLanguages = new SelectedLanguage({
    $target,
    initialState: [],
  });
}
```

## SearchInput 컴포넌트 구현하기

SearchInput 컴포넌트를 구현합니다.  
해당 컴포넌트가 사용할 예상 기능들을 먼저 나열합니다.

- 해당 컴포넌트는 main 태그의 자식태그로 생성되어야 합니다.
- 이때 생성되는 컴포넌트의 className은 SearchInput 이어야 합니다.
- input 태그로서 기능을 해야합니다.
- event (keyup) 이 발생할 때마다 App.js에서 onChange 함수를 넘겨 받아 실행시켜야 합니다.

```js
// SearchInput.js
export default function SearchInput({ $target, initialState, onChange }) {
  this.$element = document.createElement("div"); // $element 라는 이름을 가진 element를 생성합니다. 해당 element는 div 태그입니다.
  this.$element.className = "SearchInput"; // $element 의 className은 SearchInput입니다.

  this.state = initialState;

  $target.appendChild(this.$element); // 해당 방식을 통해 main의 자식태그로서 해당 div 태그를 추가합니다.

  this.render = () => {
    // render 해주는 함수입니다. App.js 를 제외하면 항상 화면에 그려져야 하니 단연 구현해야 합니다.
    this.$element.innerHTML = `<input class="SearchInput__Input" type="text"  placeholder="검색어를 입력하세요" value=${this.state}></input>`;
  };

  this.render(); // 해당 코드는 render되는 함수를 정의한 직후에 바러 적어줍니다. 이 코드를 작성하지 않으면 다른 코드에서 이 함수의 render함수를 사용해 주어야 합니다.

  const SearchInput = document.querySelector(".SearchInput__Input"); // .을 사용해 주어야 합니다.
  SearchInput.addEventListener("keyup", (e) => {
    // 해당 코드에서 볼 수 있든 SearchInput은 input 태그인 Element이다.
    const keyArr = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Enter"]; // 예외 시킬 때 사용하는 값들입니다.
    // 차후에 입력되는 값들 중에서 ArrowDown Enter등을 입력받아야 하는 순간이 있습니다. 그때를 위해 미리 예외처리를 진행합니다.
    // e.key는 해당 입력 값이 어떤 방식으로 입력되었는지 확인합니다. 이해하기 힘들다면 e를 console.log로 확인해보는것이 좋습니다.
    if (!keyArr.includes(e.key)) onChange(e.target.value); // Keyup 이벤트가 발생하면 onChange를 발생시킵니다.
  });
}
```

## 사용할 API를 연동

사용할 API는 주어진 endPoint를 이용하여 구현합니다.
주의해야할 점

- return되는 값이 있어야만 한다. (그래야 리턴값을 저장받아서 사용할 수 있다.)
- 재사용이 가능하도록 api를 요청하는 request 부분을 분리한다.
- fetch를 통해서 받은 값은 바로json 현태가 아님을 주의한다.
- Error 처리를 신경쓴다

```js
const endPoint = "";

const request = async (url) => {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    return json;
  }

  throw new Error("에러발생");
};

export const fetchLanguages = (keyword) => {
  return request(`${baseUrl}/languages?keyword=${keyword}`);
};
```

## Suggestion 구현

Suggestion 컴포넌트를 구현합니다.  
Suggestion은 api 를 통해서 초기화 받은 fetchedLaguages를 받아서 SearchInput 아래에 나열합니다.
해당 컴포넌트가 사용할 예상 기능들을 먼저 나열합니다.

- 해당 컴포넌트는 main 태그의 자식태그로 생성되어야 합니다.
- 이때 생성되는 컴포넌트의 className은 Suggestion 이어야 합니다.
- div 태그로서 기능을 해야합니다.
- event (keyup)혹은 (click) 이 발생할 때마다 App.js에서 onSelect 함수를 넘겨 받아 실행시켜야 합니다.
- render 될때 해당 selectedIndex와 비교하여 다른 css를 적용시켜야 합니다.

```js
export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement("div"); // 해당 컴포넌트에서 태그 만들기
  this.$element.className = "Suggestion"; // 태그 이름 설정

  this.state = { // 초기에 연결받은 initialState를 모두 초기화 해줍니다.
    suggestionIndex: 0,
    items: [],
    selectedLanguages: initialState.selectedLanguages,
  };

  $target.appendChild(this.$element); // 현재 body 태그에 해당 div 태그를 넣어줍니다.

  this.setState = (nextState) => {
    // 초기화 하는 함수를 구혆바니다. App.js 에서 받아서 사용합니다.
    this.state = nextState; // 여기까지만 작성시했었음 nextState를 받아서 초기화합니다.
    this.render(); // 꼭 render를 추가해 주어야 한니다. 그래야 지금 이 컴포넌트가 새롭게 받은 state를 토대로 render됩니다.
  };

  this.setIndex = (number) => {
    this.state.suggestionIndex = number; // 입력받은 number를 초기화해줍니다.
    this.render(); // 마찬가지로 컴포넌트 내부에선 state가 초기화 된다면 특별한 경우가 아니라면 다시 render해줍니다.
  };

  this.render = () => {
    // 입력받은 값들을 통해서 그려주어야 합니다.
    const items = this.state.items; // 해당 값들을 받아줍니다.
    const selectedIndex = this.state.suggestionIndex;
    if (items.length > 0) {
      // 그려져야 합니다.
      this.$element.style.display = "block"; // 보이도록 css에 속성을 추가합니다.
      this.$element.innerHTML = `
        <ul>
          ${items
            .map((item, index) => {
              return `<li class="${
                selectedIndex === index ? "Suggestion__item--selected" : ""
              }" data-index=${index} >${item}</li>`;
            }) // data-set은 해당 html 태그들을 특별하게 식별할 필요가 있을 때 사용하는 방법입니다. css에서 확인해보면 선택된 li만 class 명이 다르므로 여기서 예외처리를 해줍니다.
            .join("")}
        </ul>
      `;
    } else {
      // 여기선 그려지면 안됩니다.
      this.$element.style.display = "none"; // display : none 속성이 들어가서 render tree에서 제거 됩니다.
                                            // render 트리 = CSSOM트리 + DOM 트리
      this.$element.innerHTML = "";
    }
  };

  this.render();
  // 어떤 태그에 addEventListener를 사용할 것인지 확인해야 합니다.

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { // e.key를 통해서 해당 값이 어떤 버튼을 통해서 눌렸는지 확인합니다.
        if (
          0 <= this.state.suggestionIndex &&
          this.state.suggestionIndex < this.state.items.length - 1
        ) {
          this.setIndex(this.state.suggestionIndex + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (0 < this.state.suggestionIndex) {
          this.setIndex(this.state.suggestionIndex - 1);
        }
      } else if (e.key === "Enter") { // 만약 enter가 눌렸다면
        onSelect(this.state.items[this.state.suggestionIndex]); // 인자로서 선택받은 onSelect 함수가 실행됩니다.

      }
    }
  });

  // 해당 eventListener는 click될때 해당 li를 받아야 하기 때문이입니다.
  // 여기서 this.$element는 suggestion 을 모두 감싸는 div 태그를 의미합니다.
  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li"); // 가장 가까운 element를 찾는 방법입니다.
    if ($li) {
      const { index } = $li.dataset; // 해당 태그가 가지고 있는 dataset에서 index에 해당하는 정보를 받아줍니다.
      try {
        onSelect(this.state.items[index]); // 선택된 index 를 통해서 onSelect함수를 실행시킵니다.
      } catch {
        alert("선택할 수 없습니다.");
      }
    }
  });
```

## SelectedLanguage 구현

SelectedLanguage 컴포넌트를 구현합니다.  
SelectedLanguage 은 onSelect함수를 통해서 저장된 languages들을 화면에 표시합니다.

- 해당 컴포넌트는 main 태그의 자식태그로 생성되어야 합니다.
- 이때 생성되는 컴포넌트의 className은 SelectedLanguage 이어야 합니다.
- div 태그로서 기능을 해야합니다.
- 화면에 표시되어야 하는 Laguages 는 총 5개 이며 최신순이어야 합니다.
- Laguages중 겹치는 값이 이미 존재했다면 그값을 제거하고 새롭게 추가합니다.

```js
const MAX_COUNT = 5; // 최대 개수를 상수로 저장합니다.

export default function SelectedLanguage({ $target, initialState }) {
  this.$element = document.createElement("div"); // div태그로서 생성합니다.
  this.$element.className = "SelectedLanguage"; // 해당 className을 초기화 합니다.

  this.state = initialState; // 현재상태를 인자로 받아서 처리합니다. []를 넘겨받았습니다.

  $target.appendChild(this.$element); // main 태그의 자식태그로 구성합니다.

  this.setState = (nextState) => {
    // App.js 에서 사용됩니다. 해당 setState를 통해서 화면에 표시될 laguages를 관리합니다.
    this.state = nextState; //

    if (this.state.length > MAX_COUNT) {
      // 5개가 넘어가는 경우 새롭게 추가 되는 값을 넣어주고 5개의 값을 유지시킵니다.
      const startPosition = this.state.length - MAX_COUNT;
      this.state = this.state.slice(startPosition, startPosition + MAX_COUNT);
    }
    this.render(); // setState를 한 후에는 항상 render합니다.
  };

  this.render = () => {
    // div 태그 아래에서 해당 태그들을 생성해줍니다.
    this.$element.innerHTML = `<ul>
            ${this.state
              .map(
                (item) =>
                  `<li>
                ${item}    
            </li>`
              ) // map을 통해 render 를 할때는 join을 항상 사용해 주어야 합니다.
              //그 이유는 map의 결과는 항상 배열이기 때문에 각 원소 사이에 , 이 생기기 때문입니다.
              .join("")} 
        </ul>`;
  };

  this.render();
}
```

# 결과물

https://user-images.githubusercontent.com/77886826/192590985-7d99238e-22ca-4f89-8d97-cc66e3a69762.mov

다음과 같이 기능을 수행하는 것을 확인할 수 있다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️  
<br>

- [프로그래머스 해설](https://prgms.tistory.com/139#recentEntries)
- [mdn](https://developer.mozilla.org/ko/)

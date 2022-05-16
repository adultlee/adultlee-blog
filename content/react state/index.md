---
emoji: 👋
title: state를 통해서 react를 깊게 이해하기
date: "2022-05-10 01:05:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

<span style="color : gray">이 문서는 멋쟁이 사자처럼 FE를 위한 교육자료로 작성되었습니다.</span>

# 👋 state란

저희는 react를 배우기 전 js의 기초 문법을 배우면서 변수를 선언하는 여러 가지 방법에 대해 배웠습니다. <br>
var, let, const와 같은 것들이었죠. 우리는 그리고 컴포넌트 내부에 값을 전달하는 방식인 prop을 배웟습니다. 그런데 state는 무엇이고 우리는 왜 배워야 할까요?<br>
그 이유는 setState를 통해서 컴포넌트의 state객체에 대한 업데이트를 실행합니다. 그리고 state의 변화가 감지되면 해당 컴포넌트에 작동하는 부분을 <b>Re-Rendering</b>시키게 됩니다.<br>
re-rendering은 간단하게 화면에 뷰를 다시 새롭게 보여준다는 의미입니다. 정확한 표현으로는 조화과정(Reconciliation)이라고 칭합니다.<br><br><br>
![image](https://user-images.githubusercontent.com/77886826/168640944-271d3131-2d5e-4621-992f-1245c8e84c20.png)<br><br>
위의 사진은 Dom 트리와 Virtual Dom 을 보여줍니다. 여기서 중요한 점은 view를 변형시키는 것이 아닌 render함수로 인해서 새로운 요소로 갈아 끼워지는 과정입니다.<br>
여기서 state를 이용해 값을 변경한 경우 render 함수를 이용해 새로운 뷰를 생성합니다. 이때 이전에 생성한 Dom트리와 Virtual Dom 을 비교하여 가장 최소한의 교환이 이루어지도록 Dom 트리를 업데이트 합니다.

<br>

## props VS state

![image](https://user-images.githubusercontent.com/77886826/168646825-4933e3a4-9ee3-4725-870e-1b0180cafe2e.png)

props"는 "properties"의 약자입니다. state는 일반적인 Js의 객체를 의미합니다. 두가지 모두 컴포넌트에 정보를 관리한다는 공통점이 있으며,
가장 큰 차이점은 props는 호출받고 코드가 읽혀지는 시점에서 값이 고정이 됩니다만, state는 컴포넌트 안에서 자유롭게 값의 변화가 이루어집니다.

## state 사용방법

```js
const [value, setValue] = useState();
```

예시 코드는 가장 기본적인 형태의 state를 사용하는 방법입니다. <br>
여기서 다소 이러한 선언방식이 익숙치가 않으니 이해하고 넘어갑시다. <br>

### 비구조화 할당이란?

```js
const arr[] = [1,2];
const first = arr[0];
const second = arr[1];
```

위와 같은 방식은 하나의 배열에 들어간 요소를 first와 second로 각각 초기화 시켜주는 코드입니다. 조금더 쉽게 간추려 봅시다.

```js
const arr[] = [1,2];
const [first , second] = arr;

```

위와 같은 초기화 방법을 비구조화 할당이라고 합니다.

그럼 간단한 예시를 통해 useState를 이해해 보겠습니다.

```js
import React, { useState } from 'react'; // 우리가 사용하던 react 라이브러리에서 동일하게 useState 를 import 해줍니다. 반드시 {}를 사용합니다.

function Counter() {
  // count와 setCount를 통해서 Counter 컴포넌트 내부에서 값을 변화시켜 봅니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        +1
      <button>
      <button onClick={() => setCount(count - 1)}>
        -1
      <button>
      <h1>현재 {count} 입니다.</h1>
    </div>
  );
}

```

해당 코드는 쉽게 만들 수 있는 컴포넌트에서 state의 기능을 추가했습니다. <br>
해당 button 옆의 onClick 함수는 Event Handling에 대표적인 함수로 해당 요소가 클릭되는 이벤트를 처리합니다. <br>
해당 코드에서는 위의 button이 클릭 될때마다 익명함수의 setCount(count +1)이라는 코드가 실행됨을 확인할 수 있습니다. <br>
setCount(count +1)의 의미는 현재 count라는 값에 count+1이라는 값을 새롭게 초기화 하겠다는 의미로 이해하시면 됩니다. <br>
물론, 여기서 state의 값의 변화가 일어났으므로 컴포넌트는 re-rendering이 이뤄지게 됩니다.
<br>
이와 같은 방법을 사용하게 되면 버튼을 클릭할때마다 태그의 {count}값이 변화함을 확인할 수 있습니다.

즉 state를 사용하는 방법은 아주 간단합니다.

```js
const [value, setValue] = useState();
```

가장 일반적인 선언방식입니다. 여기서 count는 오로지 <b>setCount</b>에 의해서만 값의 변화가 이루어 집니다.
<b>state는 단순한 대입 방식으로 값의 변화가 이루어지지 않으며 꼭 setState를 이용해야만 한다. </b>

## state와 비동기

1.  setState는 <b>비동기적</b> 으로 동작합니다.
2.  setState가 호출되는 시점은 해당 setState가 포함된 모든 함수가 실행된 이후에만 작동합니다.
    <br>
    아래 코드를 통해서 설명해 보겠습니다.

```js
function Counter() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    console.log(count); // 0
    setCount(count+1);
    setCount(count+1);
    console.log(count); // 0    <= 2이 아니라 0이 출력됩니다.
  } //다음 클릭 시점에선 count가 2가 아닌 1입니다.

  return (
    <div>
      <button onClick={addCount}>
        +1
      <button>
      <h1>현재 {count} 입니다.</h1>
    </div>
  );
}

```

해당 코드에 주석으로 적어놨듯 setCount로 count의 값을 변화시켰지만 바로 적용되지 않았습니다. 그 이유는 setState는 모두 비동기적으로 이루어 지기 때문입니다.<br>
비동기적이라는 표현은 동시에 이루어 지지 않는 다고 이해하면 됩니다. react는 state의 update를 schedules 합니다. 그리고 즉각적으로 실행시키지 않습니다.<br>
react 내부에서 같은 state에 대한 변화가 거의 동시에 일어나는 경우 (한 이벤트 내부에서 사용) react는 각각의 변화된 state들을 즉각적으로 변화를 컴포넌트에 반영하지 않습니다. scheduled state changes를 순서대로 keep해놓았다가 이 변화를 순차적으로 계산을 하고 컴포넌트에 반영(re-evaluate, re-render)하게 됩니다.

따라서 다음과 같은 코드를 사용할때는 이전 값을 받아서 사용할 수 있도록 setState에서 사용하면 쉽게 해결할 수 있습니다.

```js
function Counter() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    console.log(count); // 0
    setCount(prev => prev+1);
    setCount(prev => prev+1);
    console.log(count); // 0    <= 1이 아니라 0이 출력됩니다.
  } //다음 클릭 시점에선 count가 2가 됩니다.

  return (
    <div>
      <button onClick={addCount}>
        +1
      <button>
      <h1>현재 {count} 입니다.</h1>
    </div>
  );
}

```

다음과 같이 사용하게 되면 count의 값은 효과적으로 잘 변화하는 것을 확인할 수 있습니다.
<br>
<br>

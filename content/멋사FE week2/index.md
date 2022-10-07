---
emoji: 🦁
title: (멋사 FE) 2주차 과제 해설
date: "2022-05-17 17:19:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

<span style="color : gray">이 문서는 멋쟁이 사자처럼 FE를 위한 교육자료로 작성되었습니다.</span>

# 멋쟁이 사자처럼 10기 FE 2주차 과제 🦁

반갑습니다 여러분!!☺️
2주차부터 약 4주간 함께 진행할 10기 운영진 이성인입니다 ☺️
react는 크게 어렵지 않습니다! 다같이 열심히 하시죠 ㅎㅎ

# 실습 진행방법

기존의 실습들과 동일하게 진행됩니다

- 이 레포를 fork 한다!
- fork하여 이동한 자신의 레포에서 깃크라켄을 통해 클론을 받습니다.
- 클론을 받은 파일을 vs 코드에서 엽니다!
- vs 코드에서 터미널을 열어서 npm run start 를 입력하면 코드가 실행됩니다!

이번 실습은 3차에 걸쳐서 진행됩니다! 마지막까지 열심히 진행해보시죠 ㅎㅎ

# 실습 1번문제

여러분은 프론트 엔드 작업을 진행하시면서 글자에 효과를 어떻게 주셨나요? 매번 id, class를 통해서 받지 않으셨나요?
Text 컴포넌트를 수정하며 다양한 순간에 재사용성이 뛰어난 코드를 만들어봅시다!

### 제한조건

- text-weight , text-size 를 props를 통해서 입력받아서 수정합니다.

ex) <br>
<img width="538" alt="image" src="https://user-images.githubusercontent.com/77886826/166138795-c60b1f82-9cd7-47fb-835a-04c6e0a4b02b.png"><br>
현재 상태입니다.<br>
<img width="663" alt="image" src="https://user-images.githubusercontent.com/77886826/166138831-708166b3-5251-4956-ba19-f617085ce97e.png"><br>
다음과 같이 입력받을 때 font-weight, font-size 등이 수정되도록 바꾸어 주세요

## 1번 해설

```js
const StyledText = styled.div`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  color: ${(props) => (props.color ? props.color : "black")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "bold")};
`;
```

styled-component 와 props에 대해서 이해한다면 어렵지 않게 해결할 수 있습니다!
props는 properties의 줄임말 이며 부모 컴포넌트에서 자식 컴포넌트로 값을 전달해주는 객체 입니다. 따라서 해당 객체가 가진 properties 중 하나인 color과 fontSize , fontWeight의 값이 무엇인지를 확인하고 styld-component 를 통해서 css요소를 제어 할 수 있습니다!

# 실습 2번문제

색상코드를 입력하면 색상과 text가 나오는 카드를 만들어봅시다! 제한된 조건 속에서 진행해 주시길 바랍니다!!
<img width="366" alt="image" src="https://user-images.githubusercontent.com/77886826/166141001-f3964a02-e290-4a8f-bc6e-ce94962f1b36.png">
<br>현재 사진입니다! 아래와 같게 만들어주세요!

### 목표)

<img width="314" alt="image" src="https://user-images.githubusercontent.com/77886826/166140624-39232d3e-becb-45c9-826c-e42b3698f61e.png">
<img width="336" alt="image" src="https://user-images.githubusercontent.com/77886826/166140681-4c28bf65-0107-4aae-989e-be71e8e176b5.png">
<img width="335" alt="image" src="https://user-images.githubusercontent.com/77886826/166140718-0a4599f1-6b4b-4048-8239-685a207fc5f1.png">
<img width="396" alt="image" src="https://user-images.githubusercontent.com/77886826/166140696-26ece472-220b-450f-90cf-37ac346ee8de.png">
<br>
다음과 같이 입력 받습니다.

### 제한조건

- 빈칸을 채워 다음 사진과 같게 구현합니다!
- ColorCard들 사이 간격은 10px 로 합니다.
- ColorCard를 서로다른 props를 통해서 5개 이상 화면에 출력합니다.

## 2번 해설

앞서 배운 styled-component , 그리고 props를 적극적으로 활용해서 멋진 카드들을 완성해봅니다!

```js
import React from "react";
import styled from "styled-components";
import TextBox from "../Text";

const CardWrapper = styled.div`
  width: 300px;
  height: 430px;
  margin: 5px;
  border-radius: 3%;
  border: 1px black solid;
`;

const ColorWrapper = styled.div`
  height: 350px;
  border: 1px solid ${(props) => (props.color ? props.color : "black")};
  background-color: ${(props) => (props.color ? props.color : "white")};
  border-top-left-radius: 3%;
  border-top-right-radius: 3%;
`;

const ColorCard = (props) => {
  return (
    <CardWrapper>
      <ColorWrapper color={props.color} />
      <TextBox fontweight="400" color={props.color}>
        {props.color}
      </TextBox>
    </CardWrapper>
  );
};

export default ColorCard;
```

우리가 입력해주어야 하는 color를 꼭 props로 넘겨줄수 있도록 해야합니다!
그래야 다음과 같이 성공적으로 컴포넌트를 완성할 수 있습니다!
결국 우리가 호출하는 ColorCard -> ColorWrapper 로 props들이 부모->자식 관계로서 props를 받고 있습니다!

# 실습 3번문제

대망의 끝판왕 MediaCard 컴포넌트를 제작합니다!
무슨 방법을 사용하셔도 괜찮습니다. 최선을 다해서 사진과 유사한 미디어 카드를 만들어주세요! FE는 필수소양은 디자인을 완벽하게 같게 구사하는 능력입니다.<br>
<img width="668" alt="image" src="https://user-images.githubusercontent.com/77886826/166138976-2db612eb-7b7a-4a7c-882a-3199b9d55ab7.png">

요런 컴포넌트를 만들어 주세요!

### 제한조건

- styled-component 를 이용합니다.
- 사진의 1번은 url을 props 로 입력받습니다.
- 사진의 2번은 미디어카드의 제목입니다. props를 통해 입력받습니다.
- 사진의 3번은 미디어 카드의 내용입니다. props를 통해 입력받습니다.
- 사진의 4번은 미디어 카드의 버튼의 색 입니다. props를 통해 입력받습니다.
- 서로 다른 props를 입력받은 미디어 카드를 최소 5개 이상 만듭니다.

## 3번 해설

마지막 문제 입니다! 저번 실습때 보니 많은분들이 구성은 크게 어렵지 않게 하셨지만 미디어 카드에 색을 넣는것에 다들 어려워 하시던것 같아서 하나의 샘플을 드리려고 합니다!

```js
// styled-component 를 사용하실 때는 img 등 html 에서 제공하는 모든 태그들을 사용하실 수 있습니다!
const ImageBox = styled.img` 
   ...
`;

// ...

<ImageBox src={props.image ? props.image : "default_Image"}></ImageBox>;
```

즉 일반적인 img 태그와 완벽히 동일한 기능을 수행할 수 있습니다!

### 모두들 즐거운 하루 되시길

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

[Git 실습 레포](https://github.com/Likelion-Inha-10/fe-week2)

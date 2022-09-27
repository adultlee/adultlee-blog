---
emoji: Ⓜ
title: MIL (Maromav 에서 나는 무엇을 배웠는가?)
date: "2022-06-10 01:05:00"
author: 이성인
tags: 회고
categories: 회고
---

# 퇴사하고 작성하는 회고

![image](https://user-images.githubusercontent.com/77886826/191720670-41748d64-9a29-4187-b20c-260a6fd7d1d2.png)  
[누군가의 명언!!]

퇴사한지 한달이 다 되어가지만 늦었다고 생각할 때가 제일 빨랐기에 지금이라도 남겨보겠습니다.
기술적인것 뿐만 아닌 외적인 것들을 포함해 배우고 느꼈다는것을 위주로 작성하려 합니다!

# Maromav 란?

<img width="152" alt="image" src="https://user-images.githubusercontent.com/77886826/191723516-ea11bed1-0564-46dd-ac53-4bfd6de2cef7.png">

마로마브는 디지털 제작을 쉽게 할 수 있게 하여 개인 제작의 혁명으로 삶을 혁신하는 스타트업입니다.  
[회사소개][https://www.notion.so/makecoding/make-3ce2ce410b4f44b1b0d3ccd21bcf6b55]
[회사 제품](https://play.google.com/store/search?q=Make&c=apps)

# 첫 Task

<img width="338" alt="image" src="https://user-images.githubusercontent.com/77886826/191722430-7487d5f9-49ff-4a17-bc42-6466c9dd6557.png">
그저 신기하기만 했던 첫 출근 날의 첫 퇴근! 
정신없이 notion, slack을 연결하고 가입만 해두었던 github에 초대받고 여기저기 불려다니며 미팅을 했던 기억이...
시간이 너무 빨리가서, 이런날만 있기를 바랬다 (그리고 그런날은...)

### 입사 할 당시 내가 가지고 있던것들 (작지만 소중한...)

- 3-1까지 전공 지식, (객체 지향 프로그래밍 , 자료구조론 등등)
- "멋쟁이 사자처럼" 에서 배운 기초적인 html , css
- 열심히 하겠다는 마음가짐!

### 이제부터 내가 알아야 하는것들

- React.js (JS)
- Styled-component
- Firebase
- Github
- Figma

## onboarding 대채 과제

지금은 신입 개발자를 위한 onboarding 과제가 있지만 [링크](https://github.com/EXIT-MAKE/make.front.onboarding)
제가 입사할 당시에는 없었기 떄문에 onboarding 대체 과제를 받게 되었습니다.
![image](https://user-images.githubusercontent.com/77886826/191727198-dbc19560-3e4e-4409-a6d3-3314b80a0e90.png)

![image](https://user-images.githubusercontent.com/77886826/191727211-973fd74e-34c4-41f1-a662-ee5483c3b0af.png)

make.education 서비스의 pricing 페이지 개발 이었습니다. (지금은 legacy로 사라졌지만)  
유저에게 라이선스 정책을 소개하고 라이선스 가격을 계산해 볼 수 있는 페이지였습니다.
당시에는 html css js 에 대해 전혀 모르는 상태로 투입된 업무였습니다. 지금 생각해보면 당연하게 어렵지 않은 업무였겠지만 회사에서 처음으로 받은 업무기도 했고, 많은것을 짧은 시간동안 배우고 사용해내야만 했던 테스크였습니다. 당연히 부담을 가지고 최선을 다해서 열심히 했던 테스크였습니다. 지나고 생각해보니 좋은 테스크였다는 생각이 들었습니다. Layout을 조작할 수 잇도록 기초적인 html css를 익히면서도 styled-component, react 의 state , axios를 통한 api 통신 에 대해 빠르게 적응할 수 있도록 도와준 테스크 였습니다. 물론 업무에 필요한 나머지 과정들 **_(git commit 규칙, GitGraken, Figma 보는법, 스프린트 단위의 업무 체계)_** 을 익히며 회사에 적응해 나갔습니다.  
그리고 조금 일찍 업무를 마무리 하게 되었지만 해당 계산기 로직의 api call최적화 업무를 추가로 진행하게 되었습니다. 당시에는 해당 라이선스 가격 계산 로직이 api 화 되어 결제api 에서도 같이 사용되고 있었습니다. 그래서 해당 계산기의 input 값들을 바꿔줄 때마다 api 를 axios 로 요청해서 받아오게 되었습니다. 이 과정에서 textField의 input number가 바뀔때마다 api가 호출되었기 떄문에 이를 최적화 하는 테스크 였습니다. 처음에는 lodash의 debounce 함수를 사용해서 최적화를 했었지만 리드의 추가 요청으로 인해 lodash를 사용하지 않고 debounce를 구현하게 되었습니다.

```js
useEffect(() => {
  const debounce = setTimeout(() => {
    // delay 시킬 함수
  }, delay);

  return () => {
    clearTimeout(debounce);
  };
}, [modifying]);
```

## editor.trymake.co migration

오픈소스인 스크래치기반의 arduino editor를 본사 서비스의 목적에 맞도록 개선하는 테스크였다.

<img width="623" alt="image" src="https://user-images.githubusercontent.com/77886826/191732352-273e69f6-b17b-4cbd-9b87-0ea70b374ce6.png">

기존 서비스가 제공하던 real Time 모드를 제거 하고 upload 모드만을 제공하며 중국어와 영어만 제공되던 언어 서비스를 한국어를 지원하도록 수정합니다. openblock-l10n을 사용하여 수정하였습니다. 개발 당시

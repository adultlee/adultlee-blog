---
emoji: 🦁
title: (멋사 FE) 2주차 과제 해설
date: "2022-05-21 12:00:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

<span style="color : gray">이 문서는 멋쟁이 사자처럼 FE를 위한 교육자료로 작성되었습니다.</span>

# 멋쟁이 사자처럼 10기 FE 3주차 과제 🦁

반갑습니다 여러분!!
지난 2주차 세션 때 React.js에 대해서 재밌게 열심히 실습을 잘 진행하셨나요?
다들 정말 잘하시던데… 처음 배우시는건지 살짝 의문이 드는데 괜찮으시겠어요..?

# 실습 진행방법

3주차는 과제 중심으로 세션이 진행됩니다!
Component를 만들어서 샤샤샥 주어진 홈페이지를 구현하고, PR을 올리고 웹페이지를 배포하세요😀

- 이 레포를 fork 한다!
- fork하여 이동한 자신의 레포에서 깃크라켄을 통해 클론을 받습니다.
- 클론을 받은 파일을 vs 코드에서 엽니다!
- vs 코드에서 터미널을 열어서 npm run start 를 입력하면 코드가 실행됩니다!

# 3주차 MISSION : Bootstrap Album 페이지 클론코딩 해오기

https://getbootstrap.com/docs/4.3/examples/album/

### 클론코딩(Clone-Coding)이란?

: 말그대로 클론! 실제 서비스를 직접 내 손으로 밑 바닥부터 한땀 한땀 구현하는 코딩 학습방법입니다.
실제 구현되어있는 서비스를 직접 내 손으로 따라 만들면서 배우는 것만큼 빠르고 효과적인 공부법은 없습니다!

#클론코딩 제외 대상

1. 우측 상단 햄버거 버튼
2. 각 카드별 View/Edit 버튼
3. 하단 Footer
4. 기타 애니메이션 효과

-> 시간적으로 여유가 있으신 분들은 제외 대상 부분까지 구현해보셔도 실력향상에 큰 도움이 될 것 같습니다.

# 주의사항!

✔최대한 Styled-Component와 Props를 활용해서 제작해 주시길 바랍니다.

✔아직은 실제 검색 기능, 클릭시 나오는 메뉴등 동적인 부분은 구현하기 어렵습니다, 기능을 구현한다는 생각보다 현재 보이는 페이지 그대로를 만들어주세요!

# 해설!

모두들 훌륭하게 잘 마치셨습니다! 크게 해설할것이 많지는 않습니다! 저만의 다만 자그마한 팁을 드리려고 해요!

1. GlobalStyle을 사용하기!
   열심히 구성했는데 내가 사용하지 않은 Margin이 있는것 같지 않으시던가요?
   브라우저 마다 초기에 저장되어있는 css 속성들이 있답니다. 브라우저에 상관없이 일괄적인 스타일을 적용하기 위해서는 GlobalStyle(styled-components)을 사용해주시거나 reset.css를 사용하는것입니다.
   하지만 저희는 우선 styled-components로 초기화를 해보도록합니다!

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
      margin: 0;
  }
`;

export default GlobalStyle;
```

과 같이 정의합니다. 그리고 우리가 사용할 위치에서 사용하시면 됩니다!

```js

import GlobalStyle from "./GlobalStyle"
function App(){
 return (
     <>
     <GlobalStyle>
     </>
   ...
 )
}
```

2. Layout 작업시 쉬운 팁!

![image](https://user-images.githubusercontent.com/77886826/194607836-fa13e243-b27e-4e0a-8bcd-da5d53406d63.png)  
저는 보통 요소들에 border를 통해 위치가 어디인지 확인하고는 합니다!

<img width="1384" alt="image" src="https://user-images.githubusercontent.com/77886826/194609508-abffdd88-1f0b-4f66-8d55-17d827157c12.png">

border를 적극적으로 사용하면 어떤 방식으로 요소가 배치되어있는지 효과적으로 확인할 수 있습니다!

# 제출시 필수 사항

- 과제 제출은 일요일 9시 입니다.
- PR의 제목은 “ [본인의 성함] 멋쟁이 사자처럼 3번쨰 과제 제출 “
- 제작하신 클론 페이지를 캡쳐해서 PR에 같이 올려주세요.

### 모두들 즐거운 하루 되시길

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

[Git 실습 레포](https://github.com/Likelion-Inha-10/fe-week2)

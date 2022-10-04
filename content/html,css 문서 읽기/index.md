---
emoji: 🤔
title: index.js 파일이 읽혀지지 않는경우엔 어떻게 해결해야 할까?
date: "2022-05-30 01:10:00"
author: 이성인
tags: 짧은지식
categories: 짧은지식
---

# 오류 상황...

<img width="332" alt="image" src="https://user-images.githubusercontent.com/77886826/193873095-9be1092b-73a2-467f-ba1e-26f64f208083.png">

**[Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.]**

프로그래머스 과제테스트 중 하나인 쇼핑몰 SPA를 작업하다가 발생한 오류 입니다. 또한 routing 처리가 필요한 과제였으니 "/" 위치 뿐아닌 "/product/:productID"등 / 를 추가하자마자 오류가 발생하였습니다.

```
http://localhost:5000/products/s // 오류발생
http://localhost:5000/           // is Ok!
```

처음 이 오류를 마주했을때는 "흠, 뭐 별거 아니겠지~" 라고 생각했지만... 생각보다 많은 시간을 사용한 끝에 해결할 수 있었습니다.

해당 문제의 대부분의 해설은 보통 리엑트나 다른 프레임워크에서 어느정도 경로에 대한 자비로운 처리를 통해서 신경 쓰지 않았던 부분에 대한 해설이었습니다.

ex)

```js
import App from "App"; //x
import App from "./App"; //x
import App from "./App.js"; // o
```

다음과 같이 Vanilla js 를 작업할 때에는 import 해줄 당시 **경로**와 **파일형식**을 명확하게 명시해야 합니다.

하지만 프로그래머스 쇼핑몽 SPA 를 풀 때는 이것이 문제가 아니었으니 예상치 못한 곳에서 해결할 수 있었습니다.

다음은 예시사진입니다. 프로그래머스 환경은 재시험을 쳐야만 가능하기에 임의로 환경을 조성하였습니다.

<img width="667" alt="image" src="https://user-images.githubusercontent.com/77886826/193874683-832b1228-d854-4c1f-9541-cd6fb801e742.png">
개발자 도구 -> 네트워크 -> style.css 확인한 사진입니다. 
다음과 같이 예상치 못한 사진이 나오는것을 확인할 수 있습니다. 정삭적으로 css파일을 load한다면 아래와 같은 사진이 되어야 합니다.

<img width="681" alt="image" src="https://user-images.githubusercontent.com/77886826/193874966-ed877daf-5fed-46b2-865a-49f530675f47.png">
정상적으로 styles.css가 읽힌것을 확인할 수 있습니다.

그렇다면 어떻게 해야 프로그래머스 과제관에서의 문제를 해결할 수 있을까요🤔

힌트는 개발자 도구 -> 네트워크 ->headers 에서 찾을 수 있었습니다.

<img width="794" alt="image" src="https://user-images.githubusercontent.com/77886826/193876812-f77d8992-b61f-43f3-9667-b94bff1d0c19.png">
해당 사진은 프로그래머스 의 과제 란에서 실행시킨 결과 입니다. 해당 index.js를 web/src/index.js에서 읽는 것을 확인할 수 있습니다. 애초에 /start 명령어를 통해서 요청받는 페이지의 endpoint에 /web/ 이 포함 되어 있었기 때문에 내가 원하는 폴더 아래에서의 index.js 혹은 styles.css를 읽지 못했던 것입니다.

이런 유사한 사항에서는 개발자 도구 -> 네트워크 -> header에서 해당 페이지에 대한 정보를 어디서 Request 받는지 확인합니다.

## +) HTML과 폴더구조

<img width="252" alt="image" src="https://user-images.githubusercontent.com/77886826/193877637-4c3ad8b0-72f9-4d60-b364-356c399f378d.png">

폴더 구조

<img width="537" alt="image" src="https://user-images.githubusercontent.com/77886826/193877773-20a38504-f08c-4fa9-b316-ba09fbe7432c.png">

index.html

절대경로를 사용해서 web하위의, 즉 내가 빌드를 해야만 하는 절대 root를 바라볼 수 있도록 지정합니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

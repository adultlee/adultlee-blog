---
emoji: ?
title: 간단하게 시작하는 react!
date: "2022-06-10 01:05:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

# npx로 시작하는 react!

직접 react를 기반으로 시작해 보겠습니다!!
사전 준비가 몇가지 필요합니다!
vs code 상에서 터미널을 통해서 해당 명령어를 입력해 주어야 합니다!

```
npx create-react-app [프로젝트 명]
```

(만약 깃크라켄을 통해서 프로젝트를 시작한 경우 프로젝트 명이 결정되어 있고 폴더가 생성되어 있는 경우가 있습니다. 이경우 npx create-react-app . 이라는 명령어를 대신하여 사용합니다. 이럴땐 해당 폴더의 위치에서 create-react-app이 실행됩니다.)

아래와 같이 입력하면 됩니다.
현재 폴더의 위치 : 바탕화면/이성인/)
<img width="574" alt="image" src="https://user-images.githubusercontent.com/77886826/173179741-9022b8ae-e4f6-414e-bc2d-85473a7863be.png">

여기서 start-react 라는 이름으로 폴더가 **현재 위치**에 생성되게 되며, 해당 위치로 꼭 이동해 주어야 합니다.

<img width="424" alt="image" src="https://user-images.githubusercontent.com/77886826/173179840-7f4f25e6-8420-4b16-91bb-dcb52d911113.png">

현재 폴더의 위치 : 바탕화면/이성인/start-react)

현재 위치를 확인하는 명령어 : pwd
(만약 현재 위치에서 이동하고 싶다면 cd 명령어를 통해 이동합니다.)

```
npm i
npm run start
```

현재 위치가 생성한 프로젝트명과 동일한 경우 위와같은 명령어를 입력하여 실행합니다.  
실행하게 된다면 다음과 같은 화면이 출력되게 됩니다.

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/77886826/173180272-fb0a858c-3429-4aae-a48a-7f5182ffcb62.png">

 <img width="1440" alt="image" src="https://user-images.githubusercontent.com/77886826/173180233-035a5958-7215-475c-b7d4-748167a0631a.png">

정상적으로 다음과 같은 화면이 나왔는지 확인한 후 이제는 우리가 작업할 수 있는 상태로 수정을 해주어야 합니다.
먼저, 좌측의 폴더 열기 버튼을 통해서 해당 폴더를 열어줍니다.

<img width="1435" alt="image" src="https://user-images.githubusercontent.com/77886826/173180507-b2b4a9b7-98dd-4f16-b8a7-6ab99b267443.png">

위와 같은 화면이 나왔다면 성공입니다!!

그리고 다음 화면에서 확인 할 수 있듯 localhost:3000번에서 해당 리엑트 화면을 확인 할 수 있습니다!

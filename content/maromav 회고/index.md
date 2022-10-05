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

~~[누군가의 명언!!]~~

퇴사한지 한달이 다 되어가지만 늦었다고 생각할 때가 제일 빨랐기에 지금이라도 남겨보겠습니다.
기술적인것 뿐만 아닌 외적인 것들을 포함해 배우고 느꼈다는것을 위주로 작성하려 합니다!

# Maromav 란?

<img width="152" alt="image" src="https://user-images.githubusercontent.com/77886826/191723516-ea11bed1-0564-46dd-ac53-4bfd6de2cef7.png">

마로마브는 디지털 제작을 쉽게 할 수 있게 하여 개인 제작의 혁명으로 삶을 혁신하는 스타트업입니다.

[notion](https://www.notion.so/makecoding/make-3ce2ce410b4f44b1b0d3ccd21bcf6b55) [APP](https://play.google.com/store/search?q=Make&c=apps) [Web](https://www.trymake.co/)

# 1. 첫 Task

<img width="338" alt="image" src="https://user-images.githubusercontent.com/77886826/191722430-7487d5f9-49ff-4a17-bc42-6466c9dd6557.png">
그저 신기하기만 했던 첫 퇴근!
정신없이 notion, slack을 연결하고 가입만 해두었던 github에 초대받고 여기저기 불려다니며 미팅을 했던 기억이...

시간이 너무 빨리가서, 이런 날만 가득하길 바랬지만... ~~(가끔왔답니다?)~~

### 입사 할 당시 내가 가지고 있던것들 (작지만 소중한...)

- 3-1까지 전공 지식, (객체 지향 프로그래밍 , 자료구조론 등등)
- **멋쟁이 사자처럼** 에서 배운 기초적인 html , css
- 열심히 하겠다는 마음가짐!

### 이제부터 내가 알아야 하는것들

- React.js (JS)
- Styled-component
- Firebase
- Github
- Figma

# 2. onBoarding 업무

지금은 신입 개발자를 위한 onboarding 과제가 있지만 [링크](https://github.com/EXIT-MAKE/make.front.onboarding)
제가 입사할 당시에는 없었기 떄문에 onboarding 대체 과제를 받게 되었습니다.
![image](https://user-images.githubusercontent.com/77886826/191727198-dbc19560-3e4e-4409-a6d3-3314b80a0e90.png)

![image](https://user-images.githubusercontent.com/77886826/191727211-973fd74e-34c4-41f1-a662-ee5483c3b0af.png)

make.education 서비스의 pricing 페이지 개발 이었습니다. (지금은 legacy로 사라졌지만)
유저에게 라이선스 정책을 소개하고 라이선스 가격을 계산해 볼 수 있는 페이지였습니다.
당시에는 html css js 에 대해 전혀 모르는 상태로 투입된 업무였습니다. 지금 생각해보면 어렵지 않은 업무였겠지만 회사에서 처음으로 받은 업무기도 했고, 많은것을 짧은 시간동안 배우고 사용해야만 했던 테스크였습니다. 지나고 생각해보니 onBoarding에 적합한 테스크였다는 생각이 들었습니다.

### 이 테스크를 통해 배운것

- Layout을 조작할 수 잇도록 기초적인 html css 익히기
- styled-component
- useState를 비롯한 hook 사용법
- axios를 통한 api 통신
- **_git commit 규칙, GitKraken, Figma 보는법, 스프린트 단위의 업무 체계_**

그리고 조금 일찍 업무를 마무리 하게 되어 해당 계산기 로직의 api call 최적화 업무를 추가로 진행하게 되었습니다. 당시에는 해당 라이선스 가격 계산 로직이 api 화 되어 결제 api 에서도 같이 사용되고 있었습니다. 그래서 해당 계산기의 input 값들을 바꿔줄 때마다 axios를 통해 요청해서 받아왔습니다. 이 과정에서 textField의 input number가 바뀔때마다 api가 호출되었기 떄문에 이를 최적화 하는 테스크 였습니다. 처음에는 lodash의 debounce 함수를 사용해서 최적화를 했었지만 리드의 추가 요청으로 인해 lodash를 사용하지 않고, 아래와 같이 useEffect와 setTimeout 함수를 통해 debounce를 구현하였습니다.

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

# 3. editor.trymake.co migration

오픈소스인 스크래치기반의 arduino editor를 본사 서비스의 목적에 맞도록 개선하는 테스크였습니다.

<img width="623" alt="image" src="https://user-images.githubusercontent.com/77886826/191732352-273e69f6-b17b-4cbd-9b87-0ea70b374ce6.png">

## 3-1 진행 목적

- 웹(브라우저)에서 블록코딩이 가능하게 한다.
- 영어와 중국어 서비스만 제공하던 기존 서비스에 한국어 서비스 제공
- 불필요한 기능을 숨기고 직관적인 사용이 가능하게 한다.

첫 테스크 이후 이제야 적응한 함수형 컴포넌트가 아닌 class 형으로 선언된 컴포넌트들로 이루어진 코드들은 상당히 어려웠으나 기능 수정, styled-component 적용, ui / ux 수정등의 업무를 수행하였습니다. 수정 이후에는 Aws s3를 통한 정적호스팅을 진행하였으며 차후, github actions를 통한 자동배포를 진행하였습니다.

자동 배포 flow는 다음과 같습니다.  
(당시 git-flow 브렌치 전략을 사용중이었습니다. 따라서 develop , main 브렌치를 사용합니다. )

1. s3에 해당 버킷 생성 (dev , prod)
2. github actions에 workflow CD 생성 (dev,prod)
3. github setting에서 secrets에 시크릿 키 생성
4. CD yml 에서 시크릿 키를 사용
5. develop, main으로 merge 될시 cd.yml이 실행되며 배포가 진행됩니다.

<img width="911" alt="image" src="https://user-images.githubusercontent.com/77886826/194001810-93bad6f2-22f5-4aa1-a5ca-b540640afcd1.png">

최종 UI가 반영된 사진입니다(web)

## 3-2 이 테스크를 통해 배운것

- 정적배포 (AWS s3를 통한 정적 호스팅)
- AWS root계정과 IAM 계정 권한 분리 작업
- 정적배포 이후 github actions를 배포 자동화 (s3 버킷 생성 -> workflow Cd wjrdyd, AWS_secret)
- ~~중국어로 된 공식문서를 읽기 위해서는 중국어 -> 영어 -> 한국어 번역을 해야한다...~~
- 결국하면 된다 즐겁게 일하기!!

# 4. 회사 서비스 전체에서 firebase 제거 작업 ~~(MSA 실패기)~~

![image](https://user-images.githubusercontent.com/77886826/194004179-e10cabfc-2352-41ae-ab2a-466bcfb32170.png)

회사에서 고질적인 문제였던 firebase를 제거 하는 작업이었습니다. 회사에 백엔드 개발자가 생기게 되며, 회사의 서비스가 늘어나고 유저가 늘어나게 되면서 더이상 리소스를 사용하기 전에 파이어베이스를 제거 하고 RDBMS으로의 이전하기 위한 작업을 진행하였습니다.

## 4-1 Firebase 제거 후 적용

사내 모든 FE에 적용되어 잇던 firebase 를 제거 하고 새롭게 개발한 api 들을 FE에 적용하는 업무를 진행하였습니다.
기존의 모든 db(firebase database)에 접근하는 로직을 본 후 각 페이지별로 필요할 api명세를 작성하고 개발이 완료 되면,
그 api들을 모두 FE에 적용하는 업무를 수행하였습니다. 모든 data관련 로직을 firebase의 query를 통해서가 아닌 api 명세를 작성하고 개발이 완료가 되었다면 현재 존재하는 api 를 효율적으로 적용시키는 것이 중요했습니다.

## 4-2 MSA 시도...!

우리회사는 Monolithic Architecture 를 통해서 개발을 진행중이었습니다. 빠른성장이 절실한 순간에 개발인력이 부족한 상황이니 합리적인 선택이었습니다. 하지만 회사에 개발인력이 조금씩 충원되고 어차피 제거해야할 firebase라면 제거와 동시에 앞으로 리펙토링 요소가 적다고 판단한 MSA를 도입해보기로 하였습니다.
그리고 회사의 서비스적 특성을 고려하여 main 과 sales 관련 DB를 분리하여 설계하였습니다.
하지만 결국 저희는 실패했다는 결론을 내리게 되었습니다. 실패한 이유를 적어보겠습니다.  
(당연하지만 구성원들이 평균 경력이 1년정도 되는 주니어였고 역량이 모자랐습니다. 하지만 그렇다고 안할 순 없습니다. 끊임없는 도전!)

sales의 중요도가 지극히 낮다는 점, 당시 회사의 대부분의 결재는 b2g로서 정부에 의존하는 형태였습니다. CS부서에서 모든 결제를 도맡아서 처리를 했고, 그에 따라 sales는 지난 결제 기록 조회 정도의 한정된 역할만을 수행했습니다. 즉, MSA를 설계하는 시점에서 제품단위로 나누는 단계에서 실패했다고 생각합니다. 또한 하나의 Micro Service에 하나의 독립적인 기능을 수행하는 팀이 배치될 수 없는 상태였습니다. 개발팀 전원이 하나의 서비스가 아닌 모든 서비스를 관여해야만 했습니다. 그럼에 따라 중요도가 낮은 sales보다는 main의 역할을 수행하는 DB와 서비스에 인력이 모두 투입되었습니다. 즉 DB는 나누었지만 monolithic 한 운영이었습니다.

## 4-3 그래도 많은것을 배웠다!

회사의 팽창기에 들어와서 firebase -> RDBMS로 이전하는 진귀한 경험을 할 수 있었습니다. DB에 대한, 그리고 서비스의 전반적인 이해도가 크게 상승할 수 있는 기회였습니다. 그리고 분명 완벽한 MSA 는 아니었지만 시도를 해본것에 의미가 있었다고 생각합니다. FE에서는 firebase에 많은 부분을 의존해왔었는데 API의 적절한 사용, 그리고 개발 과정중에 문제가 발생하더라도 문제 해결 비용이 가장 저렴한 파트(보통 FE)에서 수많은 문제들을 해결한 겸험들은 큰 자산이 되었습니다.

# 5. 사내 Admin서비스 개선 및 추가기능 개발

<img width="616" alt="image" src="https://user-images.githubusercontent.com/77886826/194030723-b5418a9e-de55-4cc4-affd-64156f830965.png">
<center>매니저 리스트를 확인할 수 있는 페이지</center>

<img width="610" alt="image" src="https://user-images.githubusercontent.com/77886826/194030694-0f0c832e-6a56-4210-a3f7-9b72943c760d.png">
<center>메니저 상세정보를 확인할 수 있는 페이지</center>

admin 서비스는 회사의 구선원이 DB에 직접 접근 하지 않더라도 서비스의 판매, 운영, 유저 등등을 관리할 수 있도록 개발하였습니다.
기존에 사내에 Admin서비스가 존재했지만, firebase가 제거 되고 전반적인 서비스가 대거 개편됨에 따라 다시 개발하게 되었습니다.
Mui를 사용하였으며, 관리자가 필요한 기능들을 모아서 각 페이지등을 개발하게 되었습니다. react.js , javascript, styledc-component 를 사용해서 개발을 진행하였습니다.

# 6. project.trymake.co 개발 (web)

<img width="340" alt="image" src="https://user-images.githubusercontent.com/77886826/194033626-7e6f22df-a213-4ed1-bca3-c2b51ac9e362.png">
<center>공유프로젝트 페이지</center> 
<img width="340" alt="image" src="https://user-images.githubusercontent.com/77886826/194033660-d710727e-3b3a-4645-9ab9-6fd8d0016a0a.png">  
<center>프로젝트 상세 페이지</center> 
<img width="340" alt="image" src="https://user-images.githubusercontent.com/77886826/194033684-7f969260-89d0-473e-bc82-a96e2c0795d8.png">
<center>마이 페이지</center>

웹버전의 project.trymake.co 를 개발하였습니다. 비교적 최근에 진행한 테스크입니다.  
기존에 쌓여있던 문제들을 모두 해치운 후 커뮤니티의 필요함이 대두되었고 그 초기 버전을 개발하게 되었습니다.
기획부터 참여해서 기능을 제안하고, 디자인 회의에 참여하는 등 서비스의 기초부터 진행하게 되었습니다.

사용한 기술스택은 다음과 같습니다.

- next.js
- styled-component
- mobx
- TS

처음 경험해본 TS 였고 다소 어려움이 있었으나 무리없이 적응하게 되었습니다. 또한 버튼, 글자, card , toast 등등 공용컴포넌트 개발을 진행하며 확장성있는 컴포넌트 개발에 대해 많은 생각을 하게 되었습니다. 이 과정에선 단순히 많은 기능을 넣는것이 아니라, 누가 봐도 이 컴포넌트를 재 사용함에 있어서 어려움을 줄이는것이 제일 큰 목표였습니다. 공용컴포넌트 개발에만 전체 개발기간의 절반넘게 사용했지만 그이후에는 일사천리로 해결되었습니다. 또한 디자인 패턴을 적용해보고 싶다는 생각이 들어 Container-Presenter pattern를 응용해서 진행하였습니다. 뷰 로직과 비지니스 로직을 분리하여 개발을 진행했습니다.

당시 회사의 디자인 패턴은 다음과 같습니다.

- 컴포넌트

  - Container : 비지니스 로직이 모두 모여있습니다.
  - Presenter : 비지니스 로직에서 받은 로직을 사용하며 layout을 구성합니다.
  - ui : layout의 개별적인 요소가 모여있는 css가 모여있습니다. 여기선 styled-component를 활용합니다
  - type : 해당 컴포넌트에서 사용하는 type들을 모두 모아둡니다.

  무엇보다 아주 즐겁고 소중한 개발경험이었습니다😊

# 7. project.trymake.co 웹뷰 개발 (webView)

<img width="486" alt="image" src="https://user-images.githubusercontent.com/77886826/194035785-e7a03c11-0604-4084-ad7a-7d2217df8df9.png">
<center>웹뷰에서의 공유프로젝트 페이지</center>
<img width="486" alt="image" src="https://user-images.githubusercontent.com/77886826/194035798-facbdcd3-6cac-4848-a088-979a9760e8fb.png">
<center>마이 페이지</center>

퇴사하기 직전 마지막으로 진행한 테스크 였습니다.  
회사의 앱(Unity) 내부에서 커뮤니티가 필요했으며 그에 따라 webView로서 app에서 사용하게 되었습니다.  
혼자서 진행하게 된 프로젝트 였으며 유종의 미를 거두고자 공을 많이 들였습니다.  
앞서서 개발한 projcet.trymake.co에서 개발을 진행하였습니다. 이미 Container-Presenter pattern 설계가 되었기 때문에 비지니스 로직을 모두다 구성할 필요는 없었습니다. 기존의 로직을 사용하고 연결하되 최대한 재사용가능하도록 테스크를 진행했습니다.

## 7.1 어떻게 연결하지 🧐

반응형으로 만들어 디바이스를 detect하여 진행한것이 아닌, unity에서 userAgent에 정보를 담아서 보내주기로 하였습니다.

아래는 next에서 UA를 통해서 값을 확인할 코드 입니다.

```ts
const [isIE, setIsIE] = useState<boolean>(false);
const [isChrome, setIsChrome] = useState<boolean>(false);
const [userAgent, setUserAgent] = useState<string>("");
useEffect(() => {
  const uA = navigator.userAgent;
  const IE = navigator.userAgent.match(/MSIE|rv:|IEMobile/i);
  const Chrome = navigator.userAgent.match(/Chrome/i); // 문자열 처리를 통해서 확인합니다.
  setUserAgent(String(uA));
  setIsIE(Boolean(IE));
  setIsChrome(Boolean(Chrome));
}, []);
console.log(userAgent);
console.log("isIE", isIE); // output: false
console.log("isChrome", isChrome);
```

해당 코드를 통해서 확인한 결과입니다.
![image](https://user-images.githubusercontent.com/77886826/194041266-eacb3571-93a5-438d-9287-cc39a0c1ab42.png)

다음 방법을 응용해서 userAgent에 웹뷰를 통해서 해당 페이지에 접근했다는것을 FE에 전달합니다.

## 7.2 이제 개발 뿐이야...!

이제 남은건 개발 뿐이다!! project.trymake.co에서 사용한 컴포넌트는 다음과 같은 구성이므로

- 컴포넌트
  - Container : 비지니스 로직이 모두 모여있습니다.
  - Presenter : 비지니스 로직에서 받은 로직을 사용하며 layout을 구성합니다.
  - ui : layout의 개별적인 요소가 모여있는 css가 모여있습니다. 여기선 styled-component를 활용합니다
  - type : 해당 컴포넌트에서 사용하는 type들을 모두 모아둡니다.

우린 고통적으로 사용할 비지니스로직을 공유하되 presenter에서 webView일때의 layout을 조정해 주었습니다.
이 때 크게 배운것은 모바일에서 웹뷰를 사용하게 되면 웹이 가지는 특유의 위화감을 없애주어야 한다! 그 중 하나는 클릭할 당시 파란색 effect 박스를 제거해주어야 한다는것, 그리고 모바일 환경은 정말 다양하다는 것이었습니다. 제가 적용한 css (특히 fixed)는 서로 다른 모바일 기기에서 동일한 기능을 수행하지 못하는 것을 확인할 수 있었습니다. 또한 IOS에서는 웹뷰를 통해 켜지게 되는 브라우저는 safari 로 고정이 되어 내가 원하는 ui를 구성하는데 많은 어려움이 있었습니다. 또한 특히나 가상키보드위에 댓글바가 생기도록 하는것은 큰 어려움이 있었습니다. 웹 브라우저 에서 js를 통해서 가상키보드에 직접적으로 접근하는것은 불가하다는것을 깨닫고 dummy input 태그를 만들어 focus, blur 등을 통해서 해결했습니다.

![4](https://user-images.githubusercontent.com/77886826/194056565-87d58947-53ee-4d37-80f8-95ae1227b969.gif)

<center>가상키보드 위의 댓글바</center>

## 7.3 앱 사용 영상

![ezgif com-gif-maker](https://user-images.githubusercontent.com/77886826/194051200-247a6af9-1b55-45e7-9a0c-25bebed5cab6.gif)

<center>메인 페이지</center>

![2번영상](https://user-images.githubusercontent.com/77886826/194051834-586715c3-4cdf-41bd-9b48-baa606cca6ce.gif)

<center>마이페이지 -> 에디터</center>

# 8. 개발 외적인 것들

1년 2개월의 짧다면 짧은 시간이 정말 빠르게 지나갔다. 아무래도 part-time 으로 근무를 진행해서 남들보다 절반정도 되는 기간만 일했기 때문인것 같기도 하다.게다가 시험기간에는 시험에 열중하도록 팀원들이 배려를 많이 해주셔서 실제 일한 시간은 더 짧을 수도 있을것 같다. 그래도 가장큰 이유는 즐거웠기 때문이지 않을까. 즐거운 시간은 늘 빠르게 지나가 아쉽기만 할 뿐이다.
다음은 개발 외적으로 배운것들이다 아마 내 평생의 자산이 되지 않을까

1. 좋은 사람들과 일하면 정말 너무나 즐겁다.
   이 회사에 part-time으로 근무하기 전에도 많은 일을 해봤다. 과외, 수학학원조교, 마사회 등등에서 일했지만 늘 일하기 전날에는 괜히 피곤하고 스트레스를 받아왔던것 같다. 하지만 이 회사에서는 정말 단 한번도 그런적이 없었다. 즐거운 일을 한다는것은 평일이 없어지는 느낌이다. 늘 즐거웠고 재택근무를 하면서도 회사에 가 팀원들을 보고 싶었다.
2. 개발자에게 가장 중요한것은 문제를 정확히 정의하고 해결해내는 것,
   지금 이 글을 작성하면서 학교에서 진행중인 졸업프로젝트를 unity로 영상처리를 하고 있었는데 나름 불평은 있었었다. "지금 이걸 하는게 맞을까. 난 아직 프론트도 부족한데..." 라고 생각하며 말이다. 하지만 오프보딩을 대표님과 리드가 해주신 말씀은 정신이 번쩍들게 했다. 개발자는 코딩만 하는 것이 아닌, 넓은 시야를 가지고 **_어떻게든 문제를 해결해내는것_** 이 중요하다는 말씀이었다. 당면한 문제를 최적의 solution을 통해 해결해야만 한다. FE , BE 를 나눠서 생각하는 것 뿐 아니라 기획과 디자인 등 구성원들이 지출할 수 있는 비용이 가장 최소가 되도록 문제를 해결해야만 한다는 것이었다.
3. 내가 부족해서 못하는걸, 핑계를 찾지 말자 변명할 시간에 최선을 다하자
   아직도 반성하는 내용이다. 개발을 하다보면 수많은 문제들을 마주하고 좌절을 하기도 한다. 하지만 핑계가 많았다. 이건 안되는거다. 내가 못하는 것을 안되는거라고 다른 구성원들에게 설득하기도 했다. 당연히 이는 결국 구성원 전체의 리소스를 갉아 먹는 일이었다. 내가 구현할 수 없는 디자인이라고 디자인을 바꾸고 기획을 바꾸는 것은 말도 안되는 일이다. 최선을 다해 보자. 결국은 해결해왔으니까 그런 나를 믿자. **_그리고 무조건 할 수 있다는 마음가짐. 결국 누군가는 해냈기 때문에_**

# 9. 그리고...

  <img width="738" alt="image" src="https://user-images.githubusercontent.com/77886826/194047473-490e2388-8661-4f3b-91ba-b61aaa287777.png">

평범한 나를 특별한 사람으로 만들어준 우리팀원들.

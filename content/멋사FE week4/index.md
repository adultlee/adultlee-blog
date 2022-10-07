---
emoji: 🦁
title: (멋사 FE) 4주차 과제 해설
date: "2022-05-29 02:00:00"
author: 이성인
tags: 멋사교육
categories: 멋사FE
---

<span style="color : gray">이 문서는 멋쟁이 사자처럼 FE를 위한 교육자료로 작성되었습니다.</span>

# 멋쟁이 사자처럼 10기 FE 4주차 과제 🦁

반갑습니다 여러분!!☺️
벌써 react의 정말 재밌는! 필수적인 요소인 hooks를 다뤄보는 시간입니다!

# 실습 진행방법

기존의 실습들과 동일하게 진행됩니다

- 이 레포를 fork 한다!
- fork하여 이동한 자신의 레포에서 깃크라켄을 통해 클론을 받습니다.
- 클론을 받은 파일을 vs 코드에서 엽니다!
- vs 코드에서 터미널을 열어서 npm i 후 npm run start 를 입력하면 코드가 실행됩니다!

이번 실습도 2주차와 마찬가지로 3차에 걸쳐서 진행됩니다! 마지막까지 열심히 진행해보시죠 ㅎㅎ

# 실습 1번문제

InputSample 컴포넌트는 name과 nickname을 입력받아서 render시키는 컴포넌트 입니다. 해당 기능을 수행하기 위해 주석이 있는 부분을 채워 기능을 완성시켜 봅시다<br>
![image](https://user-images.githubusercontent.com/77886826/167911379-d2877351-6507-4c26-8b49-fbb647980b0d.png)<br>
![image](https://user-images.githubusercontent.com/77886826/167911449-35a018d5-8405-42d2-ad4c-56e88af3a5e8.png)<br>

주석을 채워서 name과 nickname 을 입력받아 봅시다!
해당하는 페이지는 /component/input 페이지 입니다.

ex) <br>
![image](https://user-images.githubusercontent.com/77886826/167907952-0b89c5e1-db78-40c0-90f6-8e2ee8b54d88.png)
<br>
현재 상태입니다.<br>

https://user-images.githubusercontent.com/77886826/167908055-e3287bcf-5176-4188-8222-0773abc215d5.mov

<br>
다음과 같이 입력받을 때 name, nickname 등이 수정되도록 바꾸어 주세요 또한 reset 버튼을 사용하면 모든 입력값이 초기화되도록 해주세요!<br>
쉽게 말해서 위의 동영상과 완벽히 동일하게 구현하시면 됩니다!
<br>
+) 해당 페이지에서 useState()를 한번만 사용하신다면 선착순!! 제가 커피한잔 사드리겠습니다!

### 제출방법

앞선 과제들과 마찬가지로 pr에 해당문제의 번호와 동영상을 적어주세요!

## 1번 해설

```js
function InputSample() {
  // 이렇게 state를 사용하시면 됩니다! 지금은 state의 값이 바뀔때 re-rendering이 일어난다고 생각하시면 됩니다! 차후 re-rendering에 대한 글을 추가할 예정입니다
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const { name, nickname } = inputs; // 저장합니다

  const onChange = (e) => {
    // 내가 받을 이벤트를 의미합니다!
    const { name, value } = e.target; // 각각의 값들을 받아서 처리합니다!

    const nextInputs = {
      ...inputs,
      [name]: value,
    }; // 더해준 event에 맞는 값에 value를 넣어서 저장합니다!
    // 여기서 name에 저장되는 값은 name 과 nickName 입니다

    setInputs(nextInputs);
  };

  const onReset = () => {
    // 모두 초기화 할때 사용합니다!
    const resetInputs = {
      name: "",
      nickname: "",
    };
    setInputs(resetInputs);
  };

  return (
    <div>
      <InputWrapper>
        <input
          name="name"
          placeholder="이름"
          onChange={onChange}
          value={name} // 내가 사용할 변수 사용
        />
        <input
          name="nickname"
          placeholder="닉네임"
          onChange={onChange}
          value={nickname} // 내가 사용할 변수를 사용합니다.
        />
        <button
          onClick={onReset} // 각각의 onClick, onChnage등 event들에 대해서 함수를 호출합니다
        >
          초기화
        </button>
      </InputWrapper>

      <ViewWrapper>
        값 : {name ? name : " 이름이 없습니다."}:(
        {nickname ? nickname : " 별명이 없습니다."})
      </ViewWrapper>
    </div>
  );
}
```

# 실습 2번문제

우리를 아주 거슬리게 하는 경고가 있습니다...ㅠ

![image](https://user-images.githubusercontent.com/77886826/167908932-02e6913b-02e6-4774-8939-43125eb32082.png)
![image](https://user-images.githubusercontent.com/77886826/167909006-f5dfa5c9-b7b2-49c9-a71f-16db78a9dd4f.png)
경고를 직접 읽어보시고 문제를 해결해주세요!! 해당 오류를 읽어보면 useEffect의 deps에 count가 없다고 하는데 과연...?!

<br>
 ### 목표)
 해당 button을 클릭할 때마다 숫자가 count되어 올라가도록 만들어주세요!(오류 수정후에도)
 해당 경고의 발생원인과 해결방법을 꼭 적어주세요!
 해당 경고를 완벽하게 지워주세요!!

### 제한조건

- 해당 문제는 useState 와 useEffect를 모두 사용해야 합니다.
- useEffect의 deps에 해당하는 부분에서 eslint를 무시하는 방법은 사용하면 안됩니다.

## 2번 해설

간단하게 해석한 분이 계실것같기도 합니다! 사실 오류코드를 정확하게 읽어보면 어느정도 해석이 될수도 있어요! 하지만 여기서 중요한건 잘! 해석해야한다는 점이겠죠! 적혀있는데로 count가 dependency에 서 없어서 추가하게 되면 무한 렌더링을 경험하실 수 있습니다! 따라서 setCount(c => ... )라고 적혀 있는 이 오류를 잘 읽어보시면 바로 해결할 수 있습니다!

```js
useEffect(() => {
  setCount((x) => x + 1);
}, [isClick]);
```

다음과 같이 풀 수 있습니다!

# 실습 3번문제

대망의 끝판왕 계산기 컴포넌트를 제작합니다!
어떤 방법을 사용하셔도 괜찮습니다. 이번에는 통상적으로 알고있는 계산기로서의 기능이 다 들어가 있기만 하면 됩니다!! 디자인에 너무 부담가지지 않으셔도 좋습니다.<br>

### 제한조건

- useState와 useEffect를 필수적으로 사용합니다.
- @ 버튼을 클릭할때 저장된 연산식이 초기화 됩니다.
- 계산결과가 나올때마다 화면에 표시해야 합니다.

# 제출시 필수 사항

- 실습 모든 문제를 포함합니다.
- 실습의 각 문제마다 스크린샷을 포함합니다.
- pr 의 제목은 | [내이름] 제목 |으로 합니다.
  ex) [이성인] 리엑트는 너무 재밋어!

# 3번 해설!

모두들 1번과 2번에서 적응하셨다면 계산기도 어렵지 않게 푸셨을거라고 생각합니다!  
예시 중 하나인 onClick 함수를 남겨둘테니 완성하지 못하신분들은 참고하시길 바랍니다!

![image](https://user-images.githubusercontent.com/77886826/194615684-f7acf4da-2b4d-4f3f-8ae4-8705e9478049.png)

<img width="456" alt="image" src="https://user-images.githubusercontent.com/77886826/194615192-3d38621b-52b7-42f3-be9a-d16700094efd.png">
[완성본사진]

### 모두들 즐거운 하루 되시길

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

[Git 실습 레포](https://github.com/Likelion-Inha-10/fe-week4)

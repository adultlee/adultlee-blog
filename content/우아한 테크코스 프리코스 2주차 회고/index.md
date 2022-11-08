---
emoji: 🦁
title: (우테코)프리코스 2주차를 통해 배운점
date: "2022-11-08 22:23:00"
author: 이성인
tags: 회고
categories: 회고
---

# 0. 프리코스 2주차를 제출완료!

1주차의 온보딩 과정이 끝이나고 2주차 과제를 완료하게 되었습니다. 새롭게 배운점들과 고려했던 점들, 어려웠던 점들 위주로 정리를 진행해보겠습니다!!

저의 [PR](https://github.com/woowacourse-precourse/javascript-baseball/pull/475/commits/5fba773341a43d9108539aef70dccf3477f6e63a) 입니다.

# 1. 솔직히 가장 어려웠던점!

가장 어려웠던 점은 사실 문제에서 주어진 환경을 활용하는 부분이었습니다!
이 글을 읽으실 분들도 충분히 인지하시겠지만 문제의 로직을 파악하고 활용하는 부분은 크게 어렵지 않습니다!
해당문제는 [여기서](https://github.com/woowacourse-precourse/javascript-baseball) 확인하실 수 있습니다

![image](https://user-images.githubusercontent.com/77886826/200580073-64a3c36f-87c3-4df5-91ab-c560756d921b.png)

위의 사진은 문제에서 제공되는 라이브러리 였습니다. 해당 라이브러리를 그냥 열어서 사용하는 것은 크게 어렵지 않았습니다!
가장 까다로웠던 점은 **Console**을 사용하는 부분이었습니다. Console에서 사용하는 두개의 함수에서 Console.print는 저희가 평상시에 사용하던 Console.print를 사용하면 되었으나 특별하게도 Console.print는 활용이 까다로웠습니다.

어느정도 활용코드를 가져와 보겠습니다

```js
Console.readLine("숫자를 입력해주세요 : ", (userInput) => {
  Console.print(userInput);
  //Console.close(); 아래 코드가 실행되지 않고 종료됩니다.
});
Console.readLine("숫자를 입력해주세요 : ", (userInput) => {
  Console.print(userInput);
});
```

예를 들어 다음과 같이 하나의 코드에서 두번의 입력을 받는경우 연속하여 받는경우 예상치 못한 동작을 수행한다는 점이 가장큰 문제 였습니다.
이를 해결하기 위해서 다음과 같은 설계를 진행하게 되었습니다.

```js
startRound(){
    Console.readLine("숫자를 입력해주세요 : ", (userInput) => {
        Console.print(userInput);
    this.startRound();
    });
}
```

이를 활용하여 내가 원하는 userInput이 들어오지 않았을때는 재귀함수로서 동작할수 있도록 코드를 작성하였습니다.

# 2. 간단하게 주의할 점!

1. Random 을 통해서 만들어지는 숫자는 중복된 숫자가 들어올 수 없습니다.  
   이 점때문에 522 222 등등의 숫자가 생성되지 않도록 주의 해야합니다. 저는 while문을 사용하여 random number가 생성될 때 까지 반복하여 생성하였습니다.
2. ball이 어떤 상황에서 발생하는지 완벽하게 아는 것이 중요!

```js
function getBallCount(userInputNumber, targetNumber) {
  return [...targetNumber].filter(
    (number, index) =>
      [...userInputNumber].includes(number) &&
      number !== [...userInputNumber][index]
  ).length;
}
```

저는 다음과 같이 filter함수를 중심으로 작성하였습니다. 인자로 들어오는 userInputNumber 안에 targetNumber가 있어야 하며 해당하는 index가 원래 userInputNumber의 index와는 달라야 합니다.

3. 혹시나 module.export에 익숙하지 않으신가요?  
   commonJs 에 익숙해 import ~ export 문법을 사용하셔서 module을 읽고 쓰는것에 어려움을 느끼실 수 있습니다. require문법에 익숙해 지시는것이 문제를 푸는것에 큰 도움이 될것입니다. 자세한 내용은 [여기서](https://requirejs.org/docs/node.html) 확인해 보시고 숙닭하시기를 권장합니다.

# 3. 간단한 회고

저번 주차보다 조금 더 재미 있었으나 개인적인 일(학교공부, 졸업프로젝트 등) 으로 인해 많은 시간을 쏟지 못하여 아쉬움이 생기는 과제 였습니다. 그래도 바쁜 하루중에 프리코스 과제를 푸는 시간이 가장 즐거웠다는 생각이 듭니다.

많은 생각과 자극을 주는 시간속에 하루를 보내고 있습니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

---
emoji: 🦁
title: (우테코)프리코스 1주차를 통해 배운점
date: "2022-11-01 14:23:00"
author: 이성인
tags: 회고
categories: 회고
---

# 0. 프리코스 1주차를 제출완료!

기다리고 기다리던 프리코스의 첫 주차를 제출하게 되었습니다.

가장 큰 성과는 <b>설계에 대한 고민 없이 코드부터 짜는것</b> 습관에 대해서 인지하게 되었다는 점입니다.

기존의 코드를 짜는 방식들은 코드가 기능은 하더라도 가독성이 크게 떨어졌으며, 혹여 문제가 발생하더라도 문제점을 파악하기가 극히 어려웠습니다.

그래서 제가 새롭게 배운 점들과 앞으로 프리코스를 진행하시거나 준비하실 분들을 위해 글을 남겨보도록 하겠습니다.

저의 [PR](https://github.com/woowacourse-precourse/javascript-onboarding/pull/80/files) 입니다.

# 1. 코드를 작성하기 전에 설계를 먼저!

<img width="436" alt="image" src="https://user-images.githubusercontent.com/77886826/199154103-aac0bbbe-636f-4337-a838-23c553a18083.png">

먼저 필요한 기능을 설계하고 목적을 명확하게 하는 것을 코드를 작성하기 전에 수행해야 한다는 필요성을 느끼게 되었습니다.

코드를 작성하다가도 잠시 집중력이 흐려질 때, "내가 뭘하고 있더라~" 라는 생각이 들곤했는데 구현할 기능 목록을 정리하고 하나씩 정리해가며 진행하는 것이 문제를 해결할 때 크게 도움이 되었습니다.

# 2. 누구나 명확하게 읽을 수 있도록 노력해보다

<img width="540" alt="image" src="https://user-images.githubusercontent.com/77886826/199154647-8c8f0a6e-eb45-40f0-b058-ca474493fede.png">

제가 좋아하는 개발자분으로부터 선물받은 먼지 쌓인 클린코드를 다시금 꺼내보았습니다.  
사실 읽으면서도 참 "이상적인" 이야기 일 뿐, 제가 지금 해야할 필요는 없으리라는 생각을 하곤했습니다. 하지만 필요성을 인지하고 다시금 책을 읽어보니 정신이 번쩍들며 반성하는 구절이 참 많았습니다. 반성만 하고 실천을 안할 수는 없으니까요. 부족하지만 제가 시도해본 방식들입니다.

1. <b>변수명은 누가 읽더라도 명확하도록 </b>
2. <b>함수명은 길더라도 기능과 동작이 예상가능하도록</b>
3. <b>코드의 호흡은 짧게 짧게 읽히도록</b>

```js
const REGEXP = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|f{2,}|g{2,}|h{2,}|i{2,}|j{2,}|k{2,}|l{2,}|m{2,}|n{2,}|o{2,}|p{2,}|q{2,}|r{2,}|s{2,}|t{2,}|u{2,}|v{2,}|w{2,}|x{2,}|y{2,}|z{2,}/;

function problem2(cryptogram) {
  while (isRepeatExist(cryptogram)) cryptogram = deleteRepeatLetter(cryptogram);
  return cryptogram;
}

function isRepeatExist(cryptogram) {
  return cryptogram.match(REGEXP);
}

function deleteRepeatLetter(cryptogram) {
  return cryptogram.replace(REGEXP, "");
}
```

위의 코드에 대한 문제 해설은 [프리코스 2번문제](https://github.com/woowacourse-precourse/javascript-onboarding/blob/main/docs/PROBLEM2.md) 에서 확인해 보실 수 있습니다.

되도록 명확한 기능을 사용하도록 코드와 함수를 구성했으며, 비교적 제가 위에서 명시한 규칙들을 잘 사용해본 코드를 가져왔습니다.

사실 숏코딩과 읽기 좋은 코드 인지는 확실하진 않지만, 적어도 일기 쉬우려면 짧아야 한다는 생각을 하며, 코드를 줄이려고 노력했습니다.

# 4. 첫인상이 중요해!

<img width="338" alt="image" src="https://user-images.githubusercontent.com/77886826/199156831-bebb2d41-702c-4b95-87d8-2c14b889b65c.png">

특히나 프로그래밍에서는 첫인상이 중요하다는 생각이 들었습니다.
저는 누군가의 코드를 읽을때 첫 코드가 실행되는 main의 역할을 수행하는 코드를 중심으로 코드를 해석하곤 하는데 이때, 코드에 대한 인상이 결정된다고 생각합니다.
그래서 코드의 첫인상이 결정되는 main의 역할들을 수행하는 파일들을 좀더 신경써보기로 결정했습니다.

```js
//1번 문제
function problem1(pobi, crong) {
  if (checkProblem(pobi) || checkProblem(crong)) {
    return -1;
  }

  const pobiMaxNumber = getMaxNumber(pobi[0], pobi[1]);
  const crongMaxNumber = getMaxNumber(crong[0], crong[1]);

  if (pobiMaxNumber === crongMaxNumber) return 0;
  else if (pobiMaxNumber > crongMaxNumber) return 1;
  else if (pobiMaxNumber < crongMaxNumber) return 2;
}
//2번문제
function problem2(cryptogram) {
  while (isRepeatExist(cryptogram)) cryptogram = deleteRepeatLetter(cryptogram);
  return cryptogram;
}

//3번문제
function problem3(number) {
  let clapCount = 0;
  for (let i = 1; i <= number; i++) {
    clapCount += getClapCount(i);
  }

  return clapCount;
}

//4번문제
function problem4(word) {
  let result = "";

  for (let i = 0; i < word.length; i++) {
    if (UPPERCASE.includes(word[i]) || LOWERCASE.includes(word[i]))
      result += changeLetter(word[i]);
    else result += word[i];
  }

  return result;
}

//5번문제
function problem5(money) {
  const WON = [50000, 10000, 5000, 1000, 500, 100, 50, 10, 1];
  const result = [];

  for (let i = 0; i < 9; i++) {
    result.push(parseInt(money / WON[i]));
    money = money % WON[i];
  }

  return result;
}

//6번문제
function problem6(forms) {
  const enteredForms = [forms[0]];
  const result = isDuplicatedNames(enteredForms, forms[1][1])
    ? [forms[0][0]]
    : [];

  for (let i = 1; i < forms.length; i++) {
    if (isDuplicatedNames(enteredForms, forms[i][1])) result.push(forms[i][0]);
    enteredForms.push(forms[i]);
  }

  return makeResultArray(result);
}
```

다음과 같이 main 의 역할을 수행하는 각각의 함수들에 대해서 비교적 간소화를 하면서 코드를 정리해보려고 노력했습니다. (7번이 왜 없냐면...)

# 4. 마주한 7번의 벽 |

위에서 언급한 방식들을 모두 적용하며 비교적 어렵지 않게 문제를 해결해갔습니다.
하지만 7번은 좀 더 복잡한 함수와 설계를 요구했고, 예외처리와 기술구현에도 부족했습니다. 구현은 완료했지만 앞서서 내가 지키겠다고 다짐한 규칙들을
만족시키지 못했다. 아래는 현재 코드다

```js
function problem7(user, friends, visitors) {
  const USER_FRIENDS = getUserFriendesArray(user, friends);

  const NOT_USER_FRIENDS = getNotUserFriendsArray(
    user,
    friends,
    visitors,
    USER_FRIENDS
  );
  const recommendUserMap = initObj(NOT_USER_FRIENDS);

  for (let i = 0; i < friends.length; i++) {
    if (
      isFriendWithUser(
        recommendUserMap,
        friends[i][0],
        user,
        friends[i][1],
        USER_FRIENDS
      )
    )
      recommendUserMap[friends[i][0]] += 10;

    if (
      isFriendWithUser(
        recommendUserMap,
        friends[i][1],
        user,
        friends[i][0],
        USER_FRIENDS
      )
    )
      recommendUserMap[friends[i][1]] += 10;
  }

  for (let i = 0; i < visitors.length; i++) {
    if (recommendUserMap[visitors[i]] !== undefined)
      recommendUserMap[visitors[i]] += 1;
  }

  const recommendUserArray = objectToArray(recommendUserMap);

  recommendUserArray.sort((a, b) => sortMorePoint(a, b));
  recommendUserArray.sort((a, b) => sortNamePoint(a, b));

  return recommendUserArray.map((user) => user[0]).slice(0, 5);
}
```

하나의 함수에 많은 인자가 들어가는 것은 물론하고 더이상 축약이 충분히 가능했지만 설계를 따라가더라도 간신히 구현만을 완료하게 되었습니다.

그리고 다른분들이 제출하신 코드를 보던중 [홍승연 dev-redo](https://github.com/dev-redo)님의 허락을 받고 승연님의 코드를 분석해보기로 하였습니다.
<img width="749" alt="image" src="https://user-images.githubusercontent.com/77886826/199161346-6dff3987-f75e-42ee-9e34-8912a7820346.png">

```js
// 승연님 코드
function problem7(user, friends, visitors) {
  const friendRelation = getFriendsAdjacencyList(friends);
  const userFriends = friendRelation[user] ?? [];
  const userFriendsOfFriends = getFriendOfFriends({
    user,
    userFriends,
    friendRelation,
  });

  const initScore = initRecommendationScore({
    userFriends,
    friendRelation,
    userFriendsOfFriends,
  });
  const score = scoreVisitor({ initScore, visitors, userFriends });

  const recommendedUserList = getRecommendationUserList(score);
  return recommendedUserList;
  //main에 작성된 코드들이 괴장히 자연스럽게 읽히면서 코드의 의도가 잘 엿보였습니다.

  // 아직 자료형들에 대해서 형태 변환에 익숙하지 않아 형변환 함수들을 여러번 사용한 저와 차이가 확실했습니다.
}
// 가장 놀란 인접리스트를 구현한 함수 입니다.
const getFriendsAdjacencyList = (friends) =>
  friends.reduce((friendsAdjList, [user1, user2]) => {
    if (!friendsAdjList[user1]) friendsAdjList[user1] = [];
    if (!friendsAdjList[user2]) friendsAdjList[user2] = [];

    friendsAdjList[user1].push(user2);
    friendsAdjList[user2].push(user1);

    return friendsAdjList;
  }, {});
// 저는 reduce를 잘 사용하지 못해 사용하지 않았지만 누구나 쉽게 읽을 수 있도록 코드를 작성하신것, 그 의도가 보여서 아주 감명깊었습니다.
```

단순하게 비교해 보았으나, 코드 한줄한줄 배울점이 굉장히 많았습니다. 나중에 시도해보시는 분들은 한번씩 참고해보시는것을 추천합니다.

참고만 하고 수정을 안해볼 수는 없습니다! 저도 욕심이 생겨 수정을 해보기로 하였습니다. 가독성이 떨어지는 코드를 수정하는 것을 최우선 목표로 하여 진행하기로 하였습니다.

```js
function problem7(user, friends, visitors) {
  const USER_FRIENDS = getUserFriendesArray(user, friends);
  let recommendUser = getRecommendUser(user, friends, visitors, USER_FRIENDS);

  recommendUser = scoreByFriend(recommendUser, friends, user, USER_FRIENDS);
  recommendUser = scoreByVisitor(recommendUser, visitors);

  const recommendUserArray = sortRecommendUser(recommendUser);

  return recommendUserArray.map((user) => user[0]).slice(0, 5);
}
```

전체코드는 [이곳](https://github.com/woowacourse-precourse/javascript-onboarding/pull/80/files)에서 확인하실 수 있습니다.

가독성을 저하하는 코드들을 제거 하며 전체적으로 가독성을 높여보려고 하였습니다.
아직 많이 부족하지만 리펙토링을 거듭하면서 더 좋은 개발자에 다가가고 있다고 생각합니다.

# 5.간단 회고

합격은 생각도 못하는 실력이지만, 오히려 나보다 잘하는 사람들을 보며 오기가 생기고 있다. 끝까지 노력하고 열중하는 만큼 많은것을 가져가리라 생각한다.
요즘엔 하루를 오롯이 내것으로 사용하는 느낌이든다.

<img width="926" alt="image" src="https://user-images.githubusercontent.com/77886826/199165580-d85f9a20-1394-484c-b5c4-ceb3c8866a3e.png">

부족한 코드임에도 누군가는 읽어준다. 점점 코딩이 재밌어지고 있다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

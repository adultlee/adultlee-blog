---
emoji: 📖
title: 나는야 포켓몬 마스터 이다솜 [실버 4]
date: "2022-12-12 15:54:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[나는야 포켓몬 마스터 이다솜](https://www.acmicpc.net/problem/1620)

첫째 줄에는 도감에 수록되어 있는 포켓몬의 개수 N이랑 내가 맞춰야 하는 문제의 개수 M이 주어져. N과 M은 1보다 크거나 같고, 100,000보다 작거나 같은 자연수인데, 자연수가 뭔지는 알지? 모르면 물어봐도 괜찮아. 나는 언제든지 질문에 답해줄 준비가 되어있어.

둘째 줄부터 N개의 줄에 포켓몬의 번호가 1번인 포켓몬부터 N번에 해당하는 포켓몬까지 한 줄에 하나씩 입력으로 들어와. 포켓몬의 이름은 모두 영어로만 이루어져있고, 또, 음... 첫 글자만 대문자이고, 나머지 문자는 소문자로만 이루어져 있어. 아참! 일부 포켓몬은 마지막 문자만 대문자일 수도 있어. 포켓몬 이름의 최대 길이는 20, 최소 길이는 2야. 그 다음 줄부터 총 M개의 줄에 내가 맞춰야하는 문제가 입력으로 들어와. 문제가 알파벳으로만 들어오면 포켓몬 번호를 말해야 하고, 숫자로만 들어오면, 포켓몬 번호에 해당하는 문자를 출력해야해. 입력으로 들어오는 숫자는 반드시 1보다 크거나 같고, N보다 작거나 같고, 입력으로 들어오는 문자는 반드시 도감에 있는 포켓몬의 이름만 주어져. 그럼 화이팅!!!

# 2. 문제풀이

가장 중요한것은 입력과 동시에 hash map을 만드는 것이다.

처음에는

```js
for (let i = 1; i <= N; i++) {
  pocketkmonCollection.push({
    number: i,
    pocketmonName: input[i],
  });
}
console.log(pocketkmonCollection);

for (let i = N + 1; i < N + M; i++) {
  if (isNaN(pocketkmonCollection[input[i]]))
    console.log(pocketkmonCollection[input[i]]);
}
```

와같이 접근해서 확인하려 하였다. 하지만 아래의 for문에서 확인할 수 있듯 이 방법을 통해서는 조회하는것이 다소 까다롭다.
따라서 새로운 자료형인 Map을 사용하는 것이 적합할것이라고 판단했다.
new Map 을 통해서 해시 맵을 만들어주게 되면 비교적 간단하게 해시로서 동작이 가능하다.
key - value로 이루어져 있으며,
이때 번호로도 찾아야 하며, value로도 찾을 수 있어야 하니 두개의 해시맵을 만들어서 조회를 하는것이 합리적으로 보인다.

# 3. 코드

```js
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "백준/input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

let [N, M] = input[0].split(" "); // N은 이미 등록된 도감의 수, M은 문제의 개수

N = Number(N);
M = Number(M);

const CollectionByNumber = new Map();
const CollectionByName = new Map();

for (let i = 1; i <= N; i++) {
  CollectionByNumber.set(i.toString(), input[i]);
  CollectionByName.set(input[i], i.toString());
}

for (let i = N + 1; i <= N + M; i++) {
  if (CollectionByName.has(input[i])) {
    console.log(CollectionByName.get(input[i]));
  } else if (CollectionByNumber.has(input[i])) {
    console.log(CollectionByNumber.get(input[i]));
  }
}
```

# 4. 배운 점

1. Map을 생성할 떄는 new MAp()
2. Map을 set 할 때는 .set(key , value);
3. boolean으로 확인할 때는 .has(확인할 키);
4. 꺼낼때는 .get(확인할 키);

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

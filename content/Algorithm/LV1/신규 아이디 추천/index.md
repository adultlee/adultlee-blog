---
emoji: 📖
title: 신규 아이디 추천 [Lv1]
date: "2022-10-01 09:02:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 1. 문제소개

[2021 KAKAO BLIND RECRUITMENT의 신규 아이디 추천 문제](https://school.programmers.co.kr/learn/courses/30/lessons/72410)

- 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
- 2단계 new*id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(*), 마침표(.)를 제외한 모든 문자를 제거합니다.
- 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
- 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
- 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
- 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
- 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

# 2. 문제풀이

정규표현식 없이 해결해보겠습니다. 아직 정규표현식을 접하지 않은 상태일지라도 어떻게든 풀어야 하기 때문이라고 생각했습니다.

1. 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
   .toLowerCase()로 어렵지 않게 문자열 전체를 소문자로 치환합니다.
   반대로 .toUpperCase()는 문자열 전체를 대문자로 치환합니다.

2. 문자열 전체 에서 특정 요소를 제외한 모든 문자를 제거 해야 합니다.  
   특정요소가 포함되었는지 include를 통해서 확인합니다.

알파벳 : a ~ z  
숫자 : 0 ~ 9
기호 : - \_ .

만약 include가 되었다면 해당 요소를 원소로 받은 후 모두 제거 합니다.

3. indexof()를 이용해서 확인합니다.
   해당 indexof를 통해서 return 이 -1인 경우는 발견하지 못했단 말이 되므로 이를 통해서 ..을 문자열 전체에서 제거 합니다.

4. 맨 앞 인덱스와 맨 뒤인덱스를 확인해서 .이 있다면 바로 바꾸어 줍니다.

5. 빈 문자열인지 확인하고 초기화해줍니다.

6. splice를 사용하지 않고 16이상이라면 모두 제거해 주었습니다.

7. 해당 마지막 원소를 찾아서 문자열에 계속 더하여 줍니다.

# 3. 코드

```js
function solution(new_id) {
    // 1단계 기능입니다.
    // 모두 소문자로 바꾸어줍니다.
   const result_1 = new_id.toLowerCase();



   // 2단계 기능입니다.
   // 사용 가능한 인자들을 모두 받아서 includes 되어 있는지 확인합니다.

    const correct_char =[ "a","b","c","d","e","f","g","h","i","j","k","l","m"
                        ,"n","o","p","q","r","s","t","u","v","w","x","y","z"
                        ,"0","1","2","3","4","5","6","7","8","9"
                        ,"-","_","."];

   const result_2 = result_1.split("").map((char) => {
       if(correct_char.includes(char)){
           return char;
       }
   }).join("");
 // 3단계 기능입니다.
 //  .. 이 중첩 되어 있는 지 확인하며 indexOf를 사용해서 -1이 된경우(이 경우에는 이 문자열 전체에 ..이 없다는 뜻입니다.)

 let result_3 = result_2
  while (result_3.indexOf('..') > -1){
       result_3 = result_3.split('..').join('.')
       //result_3 = result_3.replace(".." , ".")
  }
// 4단계 기능입니다.
 //  문장의 처음과 끝이 . 인지 확인합니다. 아니라면 출력합니다.

 let result_4 = result_3.split("").map((char, index) => {
     if(index === 0 && char !=="."){
         return char;
     }
     if(index === result_3.length -1 && char !== "."){
         return char;
     }
     if( 0< index && index < result_3.length-1){
         return char;
     }
 }).join("");


// 5단계 기능입니다.
let result_5;
if(result_4.length >0){
    result_5 = result_4;
}else{
    result_5 = "a";
}
// 6단계 기능입니다. map 으로 char와 index를 모두 사용합니다. 해당 index가 15 이하 일때까지만 return 합니다.
// 해당 index는 당연하게도 문자열의 총 길이가 아닌 배열의 길이와 같이 생각합니다.
 let result_6;
 if(result_5.length > 15){
     result_6 = result_5.split("").map((char , index) => {
         if(index < 15) return char;
     }).join("")
 }else{
     result_6 = result_5;
 }
 // 6단계 기능을 이어서 진행합니다. 이렇게 문자열을 자른 후에 5단계를 한번더 수행합니다.
 // 이 기능을 모두 사용할 필욘없습니다. 맨 앞 요소는 접근하지 않았기 때문입니다.
  result_6 = result_6.split("").map((char, index) => {
     if(index === 0 && char !=="."){
         return char;
     }
     if(index === result_6.length -1 && char !== "."){
         return char;
     }
     if( 0< index && index < result_6.length-1){
         return char;
     }
 }).join("");
 //  7단계 기능입니다. 마지막 원소를 추가로 더해줍니다.
let result_7;
while(result_6.length <3){
    result_6 = result_6 + result_6[result_6.length-1]; // 가장 마지막 원소를 더해줍니다.
}
   result_7 = result_6;
    return result_7;
}

}
```

# 4. 문자열 처리에 사용된 함수 정리

## .toLowerCase

간단하게 내가 가지고 잇는 문자열의 모든 문자를 소문자로 바꾸어주는 함수입니다.

```js
cosnt TEST = "toLowerCase";
console.log(TEST.toLowerCase());
 // tolowercase 가 출력됩니다.

```

## map

js 에서 foreach와 함께 가장 대중적으로 사용되는 함수입니다.
제가 Map을 사용하는 대표적인 두가지 방법을 설명해 드리겠습니다.

1. array의 각 요소에 접근해서 요소 마다 함수를 실행시켜 주어야 하는경우

```js
const array = ["난", "최", "고", "야", "!!!!"];
array.map((ele) => {
  console.log(ele);
});

// 난
// 최
// 고
// 야
// !!!!
```

2. array를 통해서 map 함수의 리턴값을 통해서 새로운 배열을 만들어 내야 하는 경우

```js
const test = [
  { id: 1, name: "성인" },
  {
    id: 2,
    name: "찰리",
  },
  {
    id: 3,
    name: "나다!",
  },
];

const array = test.map((e) => {
  return e.id;
});

console.log(array);

// 1
// 2
// 3
```

## split

문자열을 배열로 만들어야 할때 가장 편하게 사용할 수 있습니다.

1. 편하게 문자열을 배열로 만들어야 할 때

```js
const test = "test";
const array = test.split(""); // 여기서 split 다음 인자로 들어오는 값은 문자열로 이 문자열을 기준으로 나누겠다는 의미를 가집니다.

console.log(array);
// [ "t" , "e" , "s" , "t"]
```

2. split의 인자(seperator)를 바꾸어 주어 응용하기
   split은 seperator을 기준으로 내가 입력한 원본인 문자열을 나누어 줍니다.

위에서 예를 들은 test.split("")은 인자로 들어가는 문자열이 없는 빈 문자열이므로 내가 입력한
test를 모두 나누어 배열로 담습니다.  
**하지만** 내가 인자로서 다른 값을 사용한다면 해당 인자를 기준으로 문자열을 나누어 줍니다.

예를 들어 test.split("e")를 사용하게 된다면

output : ["t" , "st"]가 되게 됩니다.

이걸 이용하면 수많은 곳에서 사용이 가능합니다.

```js
const test = "hi,bye,my,name,is,challee";
const array = test.split(",");

// output : ["hi" , "bye" , "my" , "name" , "is" ,"challee"]
```

다음코드와 같이 문자열 내부에서 특정한 기준을 중심으로 배열로 나누어 줄수 있습니다.

## join

join 은 split과 완벽히 반대로 동작합니다.

- split : 문자열 -> 배열
- join : 배열 -> 문자열

split , join 인자의 의미는 다음과 같습니다

- split : 인자를 중심으로 배열로 나누어 줍니다.
- join : 배열의 각 요소를 연결합니다. 그 연결되는 값들의 중간에 인자를 넣어 줍니다.

```js
const array = ["t", "e", "s", "t"];
const test = array.join("");
// test
```

### +) replace를 대체 할 수 있다..?!

split과 join을 잘 응용하여 사용하면 replace를 대체 하여 사용할 수 있습니다.

```js
result_3 = result_3.replace("..", ".");
result_3 = result_3.split("..").join(".");
```

이 두 줄은 같은 동작을 수행합니다.

## indexOf

문자열 내부에 특정 문자열의 index를 조회한후 그 위치를 찾아서 return 합니다.
이 때, 내가 인자로 확인할 문자열이 없는 경우 -1을 리턴합니다.

해당 문자에선 indexOf를 통해서 .. 이 조회가 안될때 까지를 while의 조건문으로 사용했습니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

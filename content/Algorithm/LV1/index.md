---
emoji: 📖
title: 신규 아이디 추천
date: "2022-10-24 09:02:00"
author: 이성인
tags: 알고리즘
categories: 알고리즘
---

# 문제소개

**_2021 KAKAO BLIND RECRUITMENT의 신규 아이디 추천 문제 _**

split과 join 을 통해서 정규표현식 없이 해결해보겠습니다.
왜냐하면 아직 정규표현식을 접하지 않은 상태일지라도 어떻게든 풀어야 하기 때문이라고 생각했습니다.

- 1단계 new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
- 2단계 new*id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(*), 마침표(.)를 제외한 모든 문자를 제거합니다.
- 3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
- 4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
- 5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
- 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다. 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
- 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

# 문제풀이

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

# 코드

```js
function solution(new_id) {
   const result_1 = new_id.toLowerCase();

   const correct_char =["a","b","c","d","e","f","g","h","i","j","k","l","m","n"
                   ,"o","p","q","r","s","t","u","v","w","x","y","z"
                    ,"0","1","2","3","4","5","6","7","8","9",
                    "-","_","."];

   const result_2 = result_1.split("").map((char) => {
       if(correct_char.includes(char)){
           return char;
       }
   }).join("")

 let result_3 = result_2
  while (result_3.indexOf('..') > -1){
       result_3 = result_3.split('..').join('.')
  }

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
 }).join("")


let result_5;
if(result_4.length >0){
    result_5 = result_4;
}else{
    result_5 = "a";

}

 let result_6;
 if(result_5.length > 15){
     result_6 = result_5.split("").map((char , index) => {
         if(index < 15) return char;
     }).join("")
 }else{
     result_6 = result_5;
 }
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

let result_7;
while(result_6.length <3){
    result_6 = result_6 + result_6[result_6.length-1];
}
   result_7 = result_6;
    return result_7;
}

}
```

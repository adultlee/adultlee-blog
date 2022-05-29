---
emoji: ☀️
title: 📷 Clustering and Segmentation
date: "2022-05-24 01:05:00"
author: 이성인
tags: 영상처리
categories: 짧은지식
---

# Detection and Segmentation

Detection은 영상 내부에서 찾고자 하는 요소를 찾을 때 사용하며, Segmentation은 해당 영역을 구분해내는 역할을 수행합니다.

- Detection
  <img width="251" alt="image" src="https://user-images.githubusercontent.com/77886826/170019481-4b1aebd0-a1fd-4217-a4da-f07a863d2b9a.png">
  <br>
  물체의 위치를 찾습니다. (localization)

- Sematic Segmentation
  <img width="250" alt="image" src="https://user-images.githubusercontent.com/77886826/170019584-b1f71385-5bcd-46b5-80f9-eeaa82d7c0d5.png">
  <br>
  화소나 색등 비슷한 요소를 모아서 영역화를 진행합니다.

- Instance Segmentation
  <img width="249" alt="image" src="https://user-images.githubusercontent.com/77886826/170019612-dee5384c-60fc-42ff-a881-21dba955e11c.png">
  <br>
  카테고리별로 서로 다른 객체를 찾습니다.

앞선 내용에서 설명하진 않았지만 중요한 내용인 Classification(분류)가 있습니다. 해당 영상에서 대표하는 값을 찾아서 어떤 영상인지 분류합니다. Detection 과 Segmentation 모두 이를 위한 과정입니다.

## Semantic segmentation vs Instance segmentation

<br>
<img width="695" alt="image" src="https://user-images.githubusercontent.com/77886826/170021735-211d92a3-31f6-4700-9058-909477450ccb.png">
<br>
Semantic segmentation은 각 픽셀별로 어떤 class에 속하는지 label을 구해줘야 합니다.  
semantic segmentation은 pixel들이 각 class에 대해 binary하게 포함되는지 안되는지 여부만 따집니다.  
즉, 강아지 ouput channel에서는 각 pixel들에 대해 강아지에 포함되는 pixel인지 아닌지를 확인합니다.  
그러나 단점이 존재합니다. 같은 channel에 있는 값들을 서로 비교할 수 없다는 점입니다. 
<br>
<img width="427" alt="image" src="https://user-images.githubusercontent.com/77886826/170022034-58ceaca8-dd00-4779-a291-244fb5b0d96e.png">
<br>
그림과 같이 서로 다른 차를 영상 내부에 가지고 있음에도 Sementic segmatation을 진행하게 되면 서로를 구분하지 못합니다.

반대로 Instance segmentation은 각 픽셀별로 어떤 카테고리에 속하는지 계산하는 것이 아닌
각 픽셀별로 object가 있는지 없는지 여부만 계산한다. 즉 Detection을 통해서 object를 localization을 진행한 후 해당 픽셀에서 segmentation이 되는지를 확인합니다.
<br>
<img width="440" alt="image" src="https://user-images.githubusercontent.com/77886826/170022380-739b88c9-f88d-4244-8c86-07d033996117.png">
<br>
그림과 같이 같은 channel임에도 서로 다른 차를 구별해 내는것을 확인할 수 있습니다.

## Segmentation 의 종류

### 1. edge 기반

<br>
 <img width="806" alt="image" src="https://user-images.githubusercontent.com/77886826/170023562-adf808b0-8ddb-4b21-aab9-5db7356a6a57.png">  
 <br>
 영상의 edge들을 연결한후 나눠진 영역들 중에서 연속적인 값들을 모아서 segmentation을 진행합니다.
<br>
<img width="590" alt="image" src="https://user-images.githubusercontent.com/77886826/170023592-a7614345-00d5-470e-b814-1bfe7ef21b3f.png">  
<br>
 영상속 특정 object를 찾기 위해서 밖 -> 안 으로 이동하면서 edge를 검출해나가는 방법이 있으며 그림과 같이 안 -> 밖 으로 이동하면서 edge를 검출해나가는 방법이 있습니다.
<br>
 <img width="693" alt="image" src="https://user-images.githubusercontent.com/77886826/170023622-55b4b778-5488-4d0d-9eb7-78a25045f7d8.png">  
 <br>
 다음 그림과 같이 특정 object를 찾기 위한 장애물들이 존재합니다. segmentation을 방해하기 위해서 사진에 선이 그어진 것을 확인 할 수 있습니다. 이경우 물을 채워 나가면서 원하는 값을 찾아간다는 개념을 대입하면 이해하기 편합니다.
<br>
 <img width="228" alt="image" src="https://user-images.githubusercontent.com/77886826/170023643-6626e57d-b311-46c8-a7b4-2082e4c9f01d.png">
 <br>
 다음과 같이 아래에서 부터 물을 채워 나가며 원하는 역역들이 오롯이 찾을 수 있도록 진행합니다.

### 2. region 기반

<br>
<img width="632" alt="image" src="https://user-images.githubusercontent.com/77886826/170024449-708936f5-9e6d-49f8-9a8e-4ace39bd0e24.png">
<br>
주변요소들과 Grouping pixel을 진행하여 함게 이동합니다. 이때 Grouping 이 일어나는 조건은 pixel값, 혹은 패턴등이 있습니다.

# Mean Shift Algorithm

클러스터링(clustering)은 사람의 간섭 없이 컴퓨터가 스스로 유사한 값들을 묶어서 덩어리를 찾아내는 작업을 말합니다. Modes 는 군집의 개수를 의미합니다.
아래는 pixel에 따라 Clustering 을 거친후 영상을 분석한 결과입니다.
<br>
<img width="330" alt="image" src="https://user-images.githubusercontent.com/77886826/170025829-536f7f8b-1710-4dff-ab52-c5b302ffeeca.png">
<br>
<img width="352" alt="image" src="https://user-images.githubusercontent.com/77886826/170025884-58413207-5a84-463d-aafe-dcd2cdb29e2d.png">
<br>
<img width="337" alt="image" src="https://user-images.githubusercontent.com/77886826/170025939-cbb6161b-2db6-4d60-b3e4-ea1c01363f21.png">
<br>

## kernel Density Estimation

과연 군집을 정하는 기준이 될수 있는 peak를 찾는 방법은 무엇일까요 바로 Kernel을 사용하는 방법입니다.
<br>
<img width="441" alt="image" src="https://user-images.githubusercontent.com/77886826/170026212-35249c17-3bd2-422f-8898-c73a0545d65e.png">
<br>
위의 사진에서 파란색 점들에 대해 집중하면 됩니다. 우리는 파란색 점들이 3과 7의 위치에 어느정도 밀집해 있다는 것을 확인할 수 있습니다. 하지만 어느정도가 아닌 정확한 기준을 정하는 방법은 무엇일까요 그것은 바로 기준을 가진 kernel을 통해서 값을 확인하는 것입니다.
<br>
<img width="119" alt="image" src="https://user-images.githubusercontent.com/77886826/170026536-bdf645b9-5aee-4b11-8bd7-5fff2e638cb6.png">
<br>
바로 다음과 같은 Kernel(filter)을 통해서 Estimated density를 측정합니다. 해당 밀집도를 볼 때 mod는 2개가 생기는 것을 확인할 수 있습니다.

## Mean Shift 과정

<br>
<img width="888" alt="image" src="https://user-images.githubusercontent.com/77886826/170027601-cebf8f25-8b0f-4ac1-a2fb-8c56e9d5e3f6.png">
<br>
<img width="901" alt="image" src="https://user-images.githubusercontent.com/77886826/170027646-a2b3b334-e574-4525-a180-f8d3f087a8a3.png">
<br>
 다음 그림과 같이 일정 크기를 가진 Region of interest 내부에서 해당 데이터들을 바탕으로 무게중심으로 이동합니다. 그리고 다시 이동한 Region of interest 에서 해당 데이터들의 무게중심으로 이동하며 더이상 이동하지 않는 경우 해당 region이 중첩되지 않는 다면 mod 가 됩니다.

## Mean Shift Algorithm 요약

- 일반적인 segmentation 방법이다.
- outlier(특이한 값)에 대해서 영향을 덜 받습니다.
- Kernel 의 사이즈와 시그마를 설정해 주어야 합니다.
- 계산량이 많습니다.

# Grab cut

특정 영역에 원하는 object가 있을 확률을 구해보겠습니다.
<br>
<img width="264" alt="image" src="https://user-images.githubusercontent.com/77886826/170031706-a6441926-761c-47bb-8691-ec109f4cdba2.png">  
<br>
그 방법은 다음과 같습니다. 이미지 전체에서 해당 오브젝트가 있을 확률을 나누는 것입니다. 하지만 noise확률을 최소화할 방법이 있습니다. 그것은 바로 주변의 요소와 비교하여 확인하는 것입니다.  
 <br>
<img width="850" alt="image" src="https://user-images.githubusercontent.com/77886826/170032027-5295b89c-a40d-4cb7-a3c6-dc3638e0619d.png">
<br>
다음과 같은 방법을 사용하게 되면 손쉽게 해당 위치의 대표확률 (Label)을 구할 수 있습니다. 그리고 모든 위치에서의 해당 확률을 구하고 인접한 요소들에 대해 쌍으로 함께 object일 확률을 동시에 시그마로 연산합니다.
이경우 상당히 큰 오차를 줄일 수 있습니다.
<br>
<img width="842" alt="image" src="https://user-images.githubusercontent.com/77886826/170032691-a734c58e-8c25-44cc-88bc-023e32dc7ebb.png">
<br>
해당 공식을 -log를 씌워서 해당 식으로 바꾸어 줍니다. 해당식은 energy를 다루는 식으로서 해당 위치에서 요소가 아니게 될 에너지를 담당한다고 해석하면 됩니다. 즉 foreground 일 확률이 높을 수록 energy는 낮습니다.

<br>

<img width="867" alt="image" src="https://user-images.githubusercontent.com/77886826/170032756-1aa0396a-dae6-4560-b077-a1e0edf81e22.png">
<br>
label energy를 바탕으로 0으로 갈지 1로 갈지 결정하여 해당 사진과 같이 점선을 통해 이미지를 분할합니다. 이를 통해 graph cut 이 이루어지게 됩니다.

## Difficult example

<br>

<img width="940" alt="image" src="https://user-images.githubusercontent.com/77886826/170032800-652c3ec4-34b7-41a9-bf23-cfb93fb64d22.png">
 해당 사진과 같이 배경색과 유사하거나 Fin한 요소들이 산재한경우 Background의 요소들 또한 detection당하기 쉽게 찍혀있다면 다소 어려울 수 있습니다. 마지막 사진의 경우 img의 영역 reange를 잘 설정해 주면 원하는 object를 잘 graph cut 할 수 있습니다.

## Graph cut Algorithm 요약

- 아주 빠른 연산속도
- MRF 방식을 기반으로 굉장히 많은 범위의 문제들에 적용해 해결할 수 있다.
- 항상 가능하지는 않다. (difficult example)

# Texture

<br>

<img width="791" alt="image" src="https://user-images.githubusercontent.com/77886826/170034110-16fcd418-3302-45bc-9d95-969ddf980984.png">  
<br>
Texture란 공간적으로 반복되는 문양을 의미합니다.  
<br>
대표적으로 소재, 방향, 크기 등을 통해 나누어집니다.  
<img width="264" alt="image" src="https://user-images.githubusercontent.com/77886826/170034178-82ff7281-d6e5-4722-8367-d67469fa98d2.png">  
<br>
 Texture을 분석하는 방법은 수많은 filter를 모아둔 **Filter Bank** 를 통해서 이루어집니다.
<br>

 <img width="591" alt="image" src="https://user-images.githubusercontent.com/77886826/170034210-d67f525d-0e5c-4de0-ab3f-ff850a2d28b7.png">  
 하나의 영상을 기준으로 Filter Bank에 저장된 필터들을 모두 필터링을 진행해줍니다. 그리고 가장 response가 높은 값들을 기준으로 영상의 요소들을 여러 차원에 나누어 명시합니다.
<br>
 <img width="436" alt="image" src="https://user-images.githubusercontent.com/77886826/170034269-659bd107-20e5-4b05-95e8-1734576c5cc5.png">
 그리고 수많은  차원에 나누어진 filter의 결과값들은 서로다른 texture들의 집합들입니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 me@adultlee.com 로 부탁드리겠습니다☺️

https://ganghee-lee.tistory.com/44

http://www.cs.ait.ac.th/~mdailey/cvreadings/Kass-Snakes.pdf

인하대학교 시각컴퓨팅 및 학습 자료

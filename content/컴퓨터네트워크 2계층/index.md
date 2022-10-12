---
emoji: 😀
title: Link layer
date: "2022-10-12 01:21:00"
author: 이성인
tags: 짧은지식
categories: 짧은지식
---

# 😎 컴퓨터네트워크 2계층이란??

Link layer로 불리며 인접한 노드 끼리의 데이터를 전송하는 것을 관리합니다. 또한 이 과정에서 발생할 수 잇는 오류를 감지하고 수정합니다.

![image](https://user-images.githubusercontent.com/77886826/195280238-e3a97504-af11-4771-bc1a-4b82d55b7c91.png)

node는 모든 통신에 관련된 entity를 의미합니다.  
각 노드간의 연결은 Link를 통해서 연결이 되어 있으며
이 Link의 종류는 총 3가지가 있습니다.

- wired Links
- wirless Links
- LANs

데이터 링크 계층은 2개의 부계층으로 구성됩니다.

LLC 와 MAC입니다. LLC는 논리적인 부분으로 네트워크 계층과 연결되며 Frame을 만드는것에 기여합니다
MAC 은 물리적인 부분으로 1계층과 연결되어 있습니다.

**_data-link layer는 물리적으로 연결된 node에 전송할 데이터의 frame을 만든다_**
직접 전송은 1계층에서 관리하며 어떻게 보내는지는 관심이 없습니다

![image](https://user-images.githubusercontent.com/77886826/195349698-609786ab-9068-4921-b39b-8cd2cb74a8ef.png)

1. framing, Link access

- framing : 3계층에서 받은 데이터를 2계층에서 보낼 수 있도록 frame을 만드는 것, 양쪽에 header, trailer를 붙입니다.
- Link access : frame의 Mac address 를 통해서 source 와 destination을 확인합니다. IP address와 다릅니다

2.  인접한 노드에 대해 신뢰적인 연결을 진행합니다

- 유선의 경우에는 거의 에러가 없습니다
  무선의 경우 에러가 발생할 확률이 높습니다

![image](https://user-images.githubusercontent.com/77886826/195350040-b08de82a-7c46-4fc3-ab20-ed809122244e.png)
실제론 다음과 같이 동작합니다.

## Link layer 기능

1. Framing
   framing : 3계층에서 받은 데이터를 2계층에서 보낼 수 있도록 frame을 만드는 것, 양쪽에 header, trailer를 붙입니다.

![image](https://user-images.githubusercontent.com/77886826/195350343-8a483d47-39ca-4d46-93d6-d4da3c255a21.png)

![image](https://user-images.githubusercontent.com/77886826/195350424-a57e2779-3809-4df8-839f-8ba2166298b9.png)

data의 양 끝에 FLAG를 둠으로서 데이터가 있음을 확인합니다. 이 경우 data를 확인하던 중 FLAG가 있다면 중단됩니다. 이것을 해결하기 위해서 ESC를 담아서 보내기도 합니다. 혹은 Bit stream을 사용해 보내기도 합니다. 이때 Bit stuffing을 사용중입니다.예를 들어, X.25와 같은 많은 프레임 기반의 프로토콜들은 프레임의 시작과 끝에 6개의 연속되는 "1" 비트를 신호로서 보냅니다. 그러므로, 만약 실제로 한 줄에 여섯 개의 "1" 비트들을 갖는 데이터가 전송되는 경우라면, 처음 5 개의 "1" 비트 이후에 강제로 "0"을 삽입함으로써, 그 데이터가 프레임 구획 문자로 해석되지 않도록 조치합니다. 물론, 수신측에서는 임의로 부가된 비트를 다시 제거해야만 합니다. (delimiter 기능)

2.  flow-control : 인접한 송 수신 노드간의 연결을 관리합니다.

        회선제어를 담당합니다. 이때 사용하는 기법중 하나로 ENQ/ACK기법이 있습니다. 전용 전송 링크로 구성된 스테이션 사이에서 주로 사용되는 기법으로 A 스테이션이 ENQ 프레임을 전송하여 연결의 초기화를 진행합니다. 이때 전달받은 B 스테이션은 ACK를 전송하여 데이터 수신이 준비되었음을 알립니다. 전송이 완료되면 EOT를 전송합니다.

        ![image](https://user-images.githubusercontent.com/77886826/195351430-68f93afa-1636-4dd7-953f-043cb2cec709.png)
        ### stop-wait-flow-control
        흐름제어 : 전송 스테이션으로 부터 전송 데이터 양을 제한하기 위해서 사용되는 절차
        정지 대기(stop - wait) 기법

    전송측이 프레임을 전송한 후 데이터 프레임에 대한 ACK를 기다려서, 이에 대한 ACK프레임이 도착하면 그 후에 다음 프레임을 전송하는 기법입니다. EOT 프레임이 전송되면 데이터 전송이 종료됩니다.
    장점으로는 구조가 단순하지만 단점으로는 하나의 프레임을 보내고 ACK프레임이 수신되어야만 그다음 프레임을 전달할 수있기 떄문에 효율이 극히 떨어집니다.

        ### 정지-대기 ARQ  (Automatic Repeat Request)
        데이터 링크 계층에서 오류제어 기법은 주로 오류검출 과정과 재전송 과정을 포함합니다.
        ARQ : data전송 시 프레임이 손상되거나 분실되었을 때 재전송이 수행되는 재전송 과정

        ![image](https://user-images.githubusercontent.com/77886826/195358314-d12ef0c2-024e-4345-8811-78d5081ed4da.png)

        ![image](https://user-images.githubusercontent.com/77886826/195358358-fc7967ff-ad24-4662-87f6-4f41ac2d5c11.png)


        ### 슬라이딩 윈도우 흐름제어 기법
        전송한 프레임에 대한 ACK 프레임을 수신하지 않더라도 여러 개의 프레임을 연속적으로 전송하도록 허용하여 전송-대기 기법의 효율성을 개선한 방법입니다.

    여기서 window란 스테이션 양쪽에서 만들어진 버퍼의 크기를 의미합니다.
    전송측 윈도우에서는 프레임이 전송된 후, 윈도우의 왼쪽 경계가 오른쪽을 향하여 이동하여 그 결과 윈도우의 크기가 줄어듭니다. 윈도우의 크기를 W라고 하고 3개의 프레임이 전송된다고 가정하면 윈도우에 남아있는 프레임의 수는 w-3이 됩니다. ACK 프레임이 도착하면 전송 측 윈도우는 ACK 프레임(도착된 프레임의 수)에 따른 프레임의 수만큼 오른쪽 경계가 오른쪽으로 이동하여 윈도우의 크기가 늘어납니다.
    ![image](https://user-images.githubusercontent.com/77886826/195359257-16ab8896-57e1-4da3-82cd-7f3186dad16e.png)

    ### 수신측 윈도우

    수신측 윈도우는 ACK프레임을 전송한 후 오른쪽 경계를 오른쪽 으로 이동하여 윈도우 크기가 커집니다.
    윈도우 크기가 7인경우 이전에 프레임이 2에 대한 ACK프레임을 전송하였고, 현재 ACK프레임이 프레임 5에 대한 것이라면 즉 3만큼의 윈도우의 크기가 늘어납니다.
    즉 가장최근 ACK로 응답한 프레임의 수 - 이전에 ACK 프레임을 보낸 프레임의 수  
    ![image](https://user-images.githubusercontent.com/77886826/195360282-5f6c4d67-ad3a-4ad9-95d6-e9a8c1999fff.png)

- error-detection(correction) : 신뢰성 검증을 위해 사용합니다
- half-deplex and full-duplex : 단방향 or 양방향  
  전이중 통신방식 (full-duplex communication) : data의 송수신을 동시에 통신하는 방식이다.  
  반이중 통신방식 (half-duplex communication) : 회선 하나로 송신과 수신을 번갈아가며 통신하는 방식이다.

![image](https://user-images.githubusercontent.com/77886826/195307678-b09cafb8-31b6-4cf5-ac47-046f59d1f23c.png)

사진에서 확인할 수 있듯 2계층은 특이하게도 software 영역과 hardware영역이 나누어져있습니다.

## Link layer Error detection

링크 레이어에서는 신뢰성있는 통신을 보장하기 위해서 Error Control이 필수 입니다.

EDC = Error Detection and Correction Bits
D = Data protected by error checking, may include header fields

(error detection은 100% 신뢰할 수 없습니다.)

![image](https://user-images.githubusercontent.com/77886826/195308605-58fe75eb-b572-48a1-86c6-cadcbb415128.png)

원래 있던 datagram 에 EDC를 추가해서 receiver가 받습니다.  
이후 receiver에서는 복호화를 거쳐 원래의 datagram을 꺼냅니다

### parity checking

Error detection 방법중 하나 입니다.

- Single bit parity  
  ![image](https://user-images.githubusercontent.com/77886826/195309528-2e137c16-63e5-4c63-8346-6c06858901cb.png)  
  1개 bit error를 확인합니다. 이때 1의 개수를 확인합니다. 이때 error가 짝수개면 error를 찾을 수 없습니다. 또한 error가 발견된 위치를 찾을 수 없습니다
- Two-dimensional bit parity  
  detect and correct single bit errors  
  ![image](https://user-images.githubusercontent.com/77886826/195309912-e34ceef2-5529-4512-ad33-fe3c4815a850.png)  
  2차원으로 분석하여 어디서 어떤 에러가 발생했는지 확인합니다. 또한 짝수개여도 확인할 수 있습니다.

### Cyclic redundancy check (CRC)

![image](https://user-images.githubusercontent.com/77886826/195310421-d1141745-c6cd-4ece-b41e-7e4e91b1b351.png)  
CRC 코드를 사용합니다 받는 쪽에서는 전체를 받으면 나눠서 0이 되도록해야합니다. 아래는 예시입니다.

![image](https://user-images.githubusercontent.com/77886826/195311287-6b2e0c24-b54c-4ca0-ade5-9a5b58f3191f.png)

다음과 같이 미리 예측한 G값을 통해 나누어 줍니다. 그리고 남은 나머지까지 붙여서 보내줍니다 결국 receiver에는 101110011을 보내줍니다. 이 떄 받는 쪽에서 1001인 G를 알고 나누어 줍니다.

아래는 예시코드입니다.  
[git](https://github.com/adultlee/CRC-cyclic-redundancy-check-)

## Multiple access protocols

Link layer에서의 다중접속을 하는 방법을 의미합니다.

단일 통신 즉 Point to Point인 경우에는 Multiple access protocols를 필요로 하지 않습니다
하지만 다중 통신 (Broadcast)를 할 때는 Multiple access protocols을 필요로 합니다.

여러가지 Multiple access protocols방법들이 있는데 이상적인것을 우선해서 적어봅니다.

1.  한 노드가 전송을 원한다면 R rate로 보낼 수 있어야 한다.
2.  M개의 노드로 보낸다면 평균적으로 R/M rate로 보낼수 있어야 한다.
3.  전송률을 조절하는 노드가 없다 (중앙집권x -> 중앙집권형인경우 중앙 node가 문제가 생기는 경우 network 전체에 장애가 생김)
4.  단순하면 좋다

## MAC 프로토콜 관리 방법

3개지 방식으로 나누어져 있습니다.

1.  Channel paritioning
    현재 링크를 작은 piese단위로 나누어 줍니다. (시간 TDMA, 주파수 FDMA, code CDMA)  
    여기서 코드는 외국의 공항에서 유독 한국어가 잘 들리는것과 비슷한 원리로 생각하면 된다.  
    중앙통제로 이루어지는 방식입니다.

2.  Random access
    자유롭게 전달이 이루어진다. 단점은 어떤 것은 전달이 안될 가능성이 있다 이것을 Collision이라고 합니다
    중앙통제로 이루어지지 않습니다. 각자 노드가 random으로 보내줍니다.

    2-1. Pure Aloha Protocol
    내가 원할때는 언제든지 보내겠다는 protocol!!  
    다른 말로 unSlotted ALOHA 라고도 부릅니다 Slotted는 정해진 시간에 일부 맞춰서 데이터를 보내겠다는 것을 의미합니다. 만약 unSlotted라면 언제든지 frame이 도착한다면 바로 보내게 됩니다.

    ![image](https://user-images.githubusercontent.com/77886826/195317270-402ef4f6-a4c0-4410-b4b8-ba293137d8ff.png)
    내가 원할 때 data를 보냅니다. 하지만 이경우 중첩이 발생한경우 Collision이 발생하며 수신자가 잘못 받을 수 있습니다.

    효율은 약 18%정도가 됩니다

    2-2. slotted ALOHA
    unSlotted의 단점을 보완한 Slotted ALOHA입니다. 모든 frame 크기를 동일하게 합니다.
    각 node별로 frame을 보낼 시간을 통일합니다.
    이경우 약 37%의 효율을 가집니다.
    하지만 충돌이 발생하거나 낭비되는 slot이 당연히 발생합니다.

    2-3. CSMA (Carrier sense multiple access)
    carrier sense는 반송파를 의미합니다.  
    반송파가 있다면 누군가가 보내고 있다는것을 의미하며 CSMA의 알고리즘은 누군가가 보내는지 확인한 직후 바로 보내는 것을 의미합니다.

    아무때나 보내는 것이 아니라 channel 이 busy한지 확인후 busy하다면 잠시 기다린후 보냅니다. 하지만 sense를 감지하는동안 시간이 걸리기 때문에 collision이 발생할 수 있습니다

    ![image](https://user-images.githubusercontent.com/77886826/195322645-597f2e02-9607-49d6-9e08-a0df9f359cc1.png)

    첫 충동이 일어난 t1에서 떨어지더라도 해당 노드에선 아직 감지 하지 못합니다. 일 정시간이 지난후 서로의 도달을 확인한 직후 부터는 서로 노드가 보내지 않습니다.

    ![image](https://user-images.githubusercontent.com/77886826/195323060-3d4b0714-c4f2-4ff4-b810-606569f0c4c6.png)  
    여러 Random access들의 효율성을 확인합니다.
    이때 persistent는 확률을 의미합니다. 0.5 persistent의 경우 보내도 되는 조건일 때도 50%로 값을 보내줍니다.

지금까지의 과정들은 contension based로 서로 경쟁하는 것입니다.

3.  Tacking turns  
    아래는 contention -free 하여 경쟁이 아닌 채널을 나눕니다.
    차례를 기다려서 순서를 나누어 진행합니다. 이때 기준이 되는값은 Token의 유효함입니다.

    3-1. pooling  
    같은 frequency , time, code인 경우에는 경쟁을 어떻게 피할 수 있을까요?  
    Pooling 을 통해서 해결합니다!  
    ![image](https://user-images.githubusercontent.com/77886826/195323587-c7b1cd87-314f-464b-bd64-b2bb167df612.png)  
    마스터 노드가 slave 노드를 Polling해 상태를 확인합니다. 데이터를 보내고 싶은 사람은 보낼수 있으며 각 노드의 상태를 확인할 수 있으며 내가 언제쯤 보낼 수 있을 지 예측할 수 있습니다. 즉 latency를 확인합니다.

    3-2. token passing  
    ![image](https://user-images.githubusercontent.com/77886826/195324533-06c3636a-b806-4232-8bfd-89136db16dc5.png)  
    각각의 노드에서 token이 생기는 시간 동안 통신을 진행합니다. token이 사라지면 통신이 안되는 문제가 발생하며, physical연결이 끊어지면 안됩니다. 그리고 최대로 기다리는 시간은 TRT(Token Rotation Time)정도만 기다리면 가능합니다.

## LANS

Links layer 에서는 LAN,

- Link layer에서는 Lan, physical, Ethernet 등의 방법으로 통신하여 이때 MAC 주소를 이용한다.
- MAC 주소는 physically-connected한 인터페이스(NIC) 에서 frame을 얻을 때 사용하는 주소입니다
- MAC wnthsms 48bit크기를 갖고 네트워크 장비의 고유번호로써 사용됩니다
- MAC 주소는 IEEE 에 의해 할당됩니다.
  xx:xx:xx:xx:xx:xx 의 형식으로 6바이트로 전세계 유일한 주소입니다.

## Ethernet 이란?

    랜에서 데이터를 주고받기 위한 규칙으로, 허브와 같은 장비에 연결된 컴퓨터와 데이터를 주고받을 때
    사용한다. 일반적으로 사용되는 랜에서 가장 많이 활용되는 기술 규격이다. 만약 허브에 연결된 컴퓨터이 동시에 데이터를 보낸다면 충돌이 발생할 수도있다.

## 이더넷 헤더

이더넷 헤더의 목저지의 MAC 주소(6 bytes), 출발지 MAC 주소(6bytes), 유형(2 Bytes)으로 총 14Bytes로 구성된다.

![image](https://user-images.githubusercontent.com/77886826/195344156-c07dd809-28ac-46a2-9605-eefede488711.png)

이더넷헤더는 다음과 같이 구성되어 있으며 유형은 0800 Ipv4 0806 ARP 등등을 의미합니다.

해당 헤더의 뒷부분에는 바로 data(payload)가 존재하며 그 뒤에는 error detect를 위한 crc가 필요합니다.

## ARP (address resolution protocol)

목적지 컴퓨터의 IP주소를 이용하여 MAC주소를 찾기 위한 프로토콜이다.
네트워크 계층 주소와 데이터 링크 계층 주소 사이의 변환을 담당합니다

## 데이터 전송과정

1. 데이터 링크 계층에서 데이터에 이더넷 헤더와 트레일러를 추가하여 프레임을 만든다.

2. 물리 계층에서 이 프레임 비트열을 전기 신호로 변환하여 네트워크를 통해 전송한다.

3. 허브에 연결된 모든 컴퓨터는 데이터를 받고, 역캡슐화로 이더넷 헤더와 트레일러를 분리한다.

4. 목적지 MAC 주소와 자신의 MAC 주소를 비교하고 다르면 데이터를 파기한다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

<br>
 [최지수님의 데이터 링크 계층 - 역할과 기능](https://velog.io/@redgem92/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%A7%81%ED%81%AC-%EA%B3%84%EC%B8%B5Data-Link-Layer-1)  
 [네트웤크 : Link Layer 정리](https://seungjuitmemo.tistory.com/108)    
[지식잡식:티스토리](https://raisonde.tistory.com/entry/비트바이트-스터핑Bit-stuffing)

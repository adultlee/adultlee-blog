---
emoji: 😀
title: Network Layer (3계층)
date: "2022-10-17 05:30:00"
author: 이성인
tags: 짧은지식
categories: 짧은지식
---

# 😎 컴퓨터네트워크 3계층이란??

network Layer의 주된 역할은 다른 네트워크 간의 통신을 가능하게 하는것입니다.  
2계층인 Link layer 까지는 물리적으로 어느정도 인접한 상태를 고려했다면 이제는 전혀 다른 네트워크 간의 통신을 고려합니다.

이때, 중요한 것은 2가지입니다.

- 해당 계층 "내부"에서의 패킷의 흐름 (data plane)
- 해당 source -> destination 으로 흐르는 길을 찾기 (control plane)

# Routing protocol

Routing Protocol이란 Routing을 정하는 방식들을 의미합니다.  
크게 두가지로 이루어져 있습니다!

## 1. Link State

모든 라우터들이 다른 링크들에 대한 "모든" Cost를 알고 있는 경우 입니다.
이 방식에서는 모든 노드에 대한 Link Cost를 알고 있기 때문에 **다익스트라 알고리즘**을 사용합니다. (전체 공유!!)

![image](https://user-images.githubusercontent.com/77886826/196251071-214ab91d-9269-4b6b-86ba-6cb0053abed6.png)  
TSP를 떠올리면 쉽습니다. 위는 다익스트라자에서 길을 찾는 방법이며, 시간에 흐름에 따라 목적지로 이동하던 도중 자신이 알고 있던 정보에 새로운 정보를 추가하면서 가장 최저의 cost를 찾아서 이동하는 방식입니다.

![image](https://user-images.githubusercontent.com/77886826/196250938-6f6f0c66-1b19-484a-9bb0-96dea5687989.png)  
다음과 같이 목적지인 u -> z로 이동하기 위한 식이며 12가 최소의 비용인것을 확인할 수 있습니다.

이때 장점은 Link에 문제가 생기게 된다면 모든 노드가 해당 Link에서 발생한 문제를 빠르게 공유할 수 있습니다.  
단점은 당연히 모든 노드가 해당 Link들에 대한 정보를 공유해야하므로 계산량이 많습니다.

## 2. Distance vector

모든 라우터들이 다른 링크들에 대한 "모든" Cost를 알고 있지는 못합니다.  
바로 인접한 node들에 연결된 Link들에 해당하는 cost만을 가지고 있습니다.

이때 사용하는 알고리즘은 벨만포드 알고리즘입니다. 해당 방식을 간단히 요약하자면 중간 노드 까지의 합들의 최솟값을 update해주며 값을 가집니다.

각 노드들은 변화가 올때까지 기다리고 변화가 생기면 계산하여 이 값의 최적이라면 update하고 neigbor에 알립니다.

![image](https://user-images.githubusercontent.com/77886826/196254059-a9a43d08-be24-44a8-b201-753b637ad587.png)

해당 방식을 통해서 최종 테이블을 완성할 수 있습니다.

Distance vector의 장점은 연산량이 적습니다. 전체 노드들에 대한 cost들을 항상 update를 해줄 필요는 없기 때문입니다.

![image](https://user-images.githubusercontent.com/77886826/196254368-6c63253b-8eb1-40a4-b007-679da0d907cb.png)  
또한 좋은 정보는 금방 모든 노드들에 전파가 됩니다.  
![image](https://user-images.githubusercontent.com/77886826/196254398-9592a10c-d351-4c8b-b8d4-483f46a0a250.png)  
system에서 안좋은 상황, 예를 들어 link가 끊어진 경우가 발생한다면 인접노드들에게 해당 사실의 전파가 굉장히 느리게 이루어집니다.

# Network layer에서 congestion 막는 방법

2계층에서는 충돌시 시간을 두고 random 하게 (2의 제곱) 만큼의 시간을 늘려가며 시간을 두고 보낸다. 혹은 persistant하게 보내거나 안보내거나를 결정한다.

## 1. flow control을 관리한다

특정시간, 구간에 data가 모이기 떄문에 발생합니다. 따라서 congestion 발생시 해당 link를 제거하고 virtual path를 만듭니다.
A에서 D까지의 경로는 다음과 같이
A -> E -> F -> D (영어는 의미가 없습니다 6각형도형을 생각해주세요) 가 된다.
이때, "choke packet"을 보내어 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/77886826/196263612-7c1c5806-7375-4490-ad46-2fbbef265a70.png)

라우터에서는 패킷을 주의 표시한 출력 선로로 라우팅할 때 패킷 송신 호스트에게 초크 패킷을 전송할 수 있습니다. 초크 패킷을 수신한 송신 호스트는 사용하는 경로 일부에 혼잡이 발생할 수 있음을 판단할 수 있으므로 전송 패킷의 양을 줄입니다.

즉 초크 패킷을 통해 주의해야하는 Link에 대한 정보를 받을 수 잇습니다.

## 2. Jitter

Jitter이란 특정한 신호에 대해서 내가 "원하는 신호"와 "실제로 발생하는 신호" 간에 발생하는 불안정한 신호의 차이들이 Jitter 라고 부릅니다.

![image](https://user-images.githubusercontent.com/77886826/196265708-2356f35e-1417-4ccf-8b7c-1ccb640f220d.png)
(너무 대충그렸지만...)  
다음과같이 신호가 올때 peak점이 내가 원하는 신호라고 한다면 왼쪽은 high Jitter에 해당하며 원래 신호에 대비하여 양쪽에 불안정한 신호들이 많은것입니다. 반대로 왼쪽은 내가 원하는 신호가 짧은 시간동안에 들어오는것을 확인할 수있 습니다.
따라서 streaming과 같이 정해진 시간에 동일한 출력물이 필요할 때는 low Jitter인것이 중요합니다.

## 3. Buffering

시스템에서 처리를 어떤 장치로 부터 다른 장치로 데이터를 정손할 떄 양쪽의 속도차를 수정하기 위해서 고안되었습니다

예를 들어 동영상을 보내는 경우 동영상에 해당하는 정보가 linear하게 도착해야 하는데 discrete하게 도착하면 영상이 아닌 사진물로서 감사하게 됩니다. 따라서 일정시간동안 linear하게 영상을 볼수 있게끔 영상정보를 저장하게 되는데 이때 걸리는 과정을 버퍼링이라고 합니다.

## 4. Leaky bucket algorithm

![image](https://user-images.githubusercontent.com/77886826/196266850-47fd9da9-8900-492b-a8a2-9d9ed29a5736.png)  
양동이의 구멍이 서버가 요청을 처리할 수 있는 처리속도를 의미합니다.
처리속도는 constant합니다.
이때 문제가 발생합니다. 2명이 사용중인데 한명이 사용량이 급증하게 된다면 나머지 한명의 사용에는 제약이 생기게 됩니다 따라서 이방식을 사용하게 되면 나머지 한명도 동시에 느려집니다.

## 5. token bucket algorithm

발생하는 토큰의 수만큼 data를 보낼 수 있습니다. (일종의 통행세 느낌) 따라서 순차적으로 token을 받기 떄문에 사용량이 적던 공평하게 data를 보냄에 있어서 이득을 볼 수 있습니다.

또한 처리속도가 constant한것이 아닌 burst하게도 가능합니다

# IP

![image](https://user-images.githubusercontent.com/77886826/196273477-82d0e080-ec1d-4a3f-b314-0da5008019f1.png)
라우팅 프로토콜을 통해 packet을 경로를 선택하고, IP프로토콜을 통해 packet을 datagram의 형태로 만들며 ,ICMP프로토콜을 통해 에러를 기록합니다. 지금 부터는 IP 프로토콜에 대해서 배워보겠습니다.

## IPv4 datagram format

![image](https://user-images.githubusercontent.com/77886826/196273657-266fbc13-08b8-4a64-9372-9b0466b906e5.png)

ttl : time to live에 해당하며 datagram의 수명을 의미합니다. 수명은 줄어들어야 하며 수명이 줄어들지 않으면 계속 순환하여 문제가 될 수 있습니다.

DTRC : 지연시간 , 처리율, 신뢰성 , cost

## IP addressing

![image](https://user-images.githubusercontent.com/77886826/196274909-5b8cc37e-3aea-44c4-bfea-4fbe191ca3ea.png)  
총 4자리를 가지며 각각 0.0.0.0 부터 255.255.255.255 라는 범위를 가집니다.
위의 사진에서는 파란색으로 이루어진 부분들이 subnet으로 통신이 가능한 부분입니다. 여기서는 중앙 router 에 영향을 받지 않습니다.

여기서 IP대역을 확인해보면

![image](https://user-images.githubusercontent.com/77886826/196275696-198ef162-afb1-4555-a0c0-69c545b3b945.png)

여기서 맨 끝에 24가 붙은 이유는 총 32 비트중에서 앞의 24비트를 서브넷에 해당된다는 내용이며 25번째 비트부터는 사용할 수 있습니다.

## DHCP

Dynamic Host Configuration protocol으로 동적으로 호스트에게 IP를 부여받을 수 있습니다.
방법은 다음과 같은 절차를 거칩니다.

- DHCP Discover : client 가 subnet에 물리적으로 도착하면 client가 서버를 찾습니다
- DHCP offer : 서버는 client에게 IP 주소를 제공합니다
- DHCP request : client는 server 에게 IP address를 사용하겠다고 전달합니다
- DHCP ACK : server는 client에게 ACK를 보내 확인메세지를 보냅니다

DHCP 로 받은 iP 주소는 정해진 시간동안 사용이 가능합니다. client가 자체에서 더 사용하고 싶다면 packet을 추가로 서버로 보냅니다. 없다면 iP 를 제거 하고 재활용합니다.

# What's inside a router

지금까지는 control plane에 대해서 다루어 보았고 이제부터는 data plane인 router내부를 정리할 예정입니다.

![image](https://user-images.githubusercontent.com/77886826/196250433-09f0d9c5-1aad-4f91-b3ec-d72a8fcc3cb9.png)

다음과 같이 input port, switching fabric , output port로 이루어져 있으며  
위아래로는 data plane, control plane으로 이루어져 있습니다.

## input port

![image](https://user-images.githubusercontent.com/77886826/196268225-a19cf11d-8488-4012-bcde-08e63a2c4efd.png)
input에서는 forwaring table을 이용하여 어떤 ouput port로 나갈지 확인합니다. 이때 queueing를 통해서 데이터가 축적됩니다.
queueing은 나가는 속도보다 input에 패킷이 들어오는 속도가 빠를시 발생합니다.

이때 forwarding에는 2가지 방법이 있습니다.
![image](https://user-images.githubusercontent.com/77886826/196268801-60de735d-ff6c-443a-8ebc-c47fa6ded92c.png)
첫번째는 detination에 따라 output port를 결정합니다. 이때 계산량을 줄이기 위해 고안된 방법이 longest prefix matching방법입니다.
매치가 되는 것들중에서 가장 길게 매치가 되는 것을 기준으로 나가게 됩니다.

![image](https://user-images.githubusercontent.com/77886826/196268944-a39dc305-4ad2-4574-be32-02666d8cd410.png)

이때 첫번째는 0번으로 가며 2번째는 더 많이 매치된 1번으로 가게 됩니다.

두번재는 일반적인 방식으로 다른 layer에서의 정보를 이용해서 forwarding하는 방법입니다

예를 들어,  
11001000 00010111 00010**\* **\*\*\*\***\* -> 0번 link interface  
11001000 00010111 00011000 \*\***\*\*\*\*\* -> 1번 link interface 일때  
11001000 00010111 00011000 11100010 -> 1번 link interface로 이동

## switching fabrics

![image](https://user-images.githubusercontent.com/77886826/196269839-08f2c2c1-5a07-47e0-b10c-79f7c74886b4.png)

switchng fabric은 input 과 output 사이에서 정보를 전달시키는 역할을 수행합니다.

- memory : 메모리를 이용한 방식으로 패킷을 복사해서 넘겨줍니다. 매우느립니다
- bus : 하나의 길을 모두 공유하며 특정한 bandwidth를 가지고 있습니다.
- crossbar : 동시에 여러개의 패킷이 처리가 가능하며 겹치지 않아 문제가 발생하지 않습니다. 처리 속도도 빠릅니다.

![image](https://user-images.githubusercontent.com/77886826/196270899-03858ad4-35fc-4798-a295-631efd7090e5.png)

어떤 fabrics를 사용함에 따라 congestion이 발생하기도 합니다. 이때, 같은 output port를 사용한다면 기다려야 하는 문제가 발생하기도 합니다. 혹은 둘중하나만 받게 되는 문제가 발생하기도 합니다. 이렇게 delay가 커지게 되어 queueing이 발생하고 queueing 사이즈를 넘치도록 data가 누적되는 경우 loss가 발생하기도 합니다.
위 사진과 같은 상황을 Head-of-the-line(HOL) blocking이라고 합니다.
cross 바를 사용하면 괜찮습니다.

## output port

![image](https://user-images.githubusercontent.com/77886826/196270873-59801bf5-182b-431c-a12b-4464e9d23f07.png)

output port를 통해 나가는 방식에도 3가지 방식이 있습니다.

1. FIFO
   ![image](https://user-images.githubusercontent.com/77886826/196272138-c4067a00-805b-4699-b032-ad761257d2dd.png)
   ouput에 buffer를 두어 FIFO로 나가게 됩니다.
2. Priority scheduling
   ![image](https://user-images.githubusercontent.com/77886826/196272166-5f58471e-f5ad-4c47-82b1-c86cdf3c804f.png)
   가장 우선순위가 높은 것이 먼저 나갑니다. 이방식을 사용하게 되면 우선순위가 낮은것은 못 나갈수도 있습니다.
3. Weighted Fair Queuing
   ![image](https://user-images.githubusercontent.com/77886826/196272677-0cf5f439-21fe-481d-918d-5a608c670ed6.png)
   우선순위를 가중치를 두어 내보냅니다.

# Reference

아직 배움의 단계라 정확한 정보가 아닐 수 있습니다.😂  
피드백은 seoungin1228@gmail.com 으로 부탁드리겠습니다☺️

<br>
 - [네트웤크 : Network Layer 정리](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jk130694&logNo=220731737874)     
 - [초크패킷이란?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=jk130694&logNo=220731737874)

# Ch4. NestJS Architecture: Services and Repositories

## Service 란?

NestJS에서 비즈니스 로직을 수행하는 주요 구성 요소 중 하나이다. <br/>
Service는 컨트롤러와 데이터베이스 간의 중개자 역할을 하며, <br/>
컨트롤러에서 받은 요청을 처리하고 결과를 반환합니다. <br/>
Service는 일반적으로 하나 이상의 Repository를 사용하여 데이터를 가져오고 조작한다.

## Repository 란?

데이터베이스와 상호 작용하는 데 사용되는 주요 구성 요소 중 하나이다. <br/>
Repository는 데이터를 가져오고 조작하는데 사용되는 일련의 메서드를 제공한다. <br/>
Repository는 Service와 밀접한 관련이 있으며, Service는 데이터를 가져오고 조작하는 데 Repository를 사용한다.

## 에러처리

```
import { NotFoundException } from '@nestjs/common';
...
throw new NotFoundException('message not found.');
...
```

### 결과

```
{
  "statusCode": 404,
  "message": "message not found.",
  "error": "Not Found"
}
```

## 의존성 주입

### 의존성 주입이란?

객체 지향 프로그래밍에서 중요한 개념 중 하나로 어떤 객체가 다른 객체에 의존하는 경우, 이를 객체 생성자나 메서드의 인자로 전달받는 방식으로 해당 객체를 사용하도록 하는 것을 말한다. 즉, 객체가 다른 객체를 직접 생성하거나 참조하는 것이 아니라, 필요한 객체를 외부에서 전달받아 사용하는 것. 이렇게 하면 객체 간의 결합도를 낮출 수 있으며, 코드의 재사용성과 유지보수성을 높일 수 있다.

### 방법 2가지

1. 첫 번째 방법은 인스턴스를 직접 생성하여 멤버 변수에 할당하는 것이다. 이는 의존성 주입의 수동적인 방법이다.

```
messagesService: MessagesService;
constructor() {
  this.messagesService = new MessagesService();
}
```

2. 두 번째 방법은 생성자 매개변수로 MessagesService를 선언하고, Angular 프레임워크가 이를 자동으로 주입하도록 한다. 이는 의존성 주입의 자동적인 방법이다. (추천)

```
constructor(private messagesService: MessagesService) {}
```

```
providers: [MessagesService]
```

## public과 private 차이

### public이란

모든 코드에서 해당 멤버 변수나 메서드에 접근할 수 있다. 즉, 클래스 외부에서도 접근 가능합니다. 이는 기본적으로 클래스 멤버에 적용되는 접근 제한자이므로 별도로 명시하지 않아도 된다.

### private이란

해당 멤버 변수나 메서드에 대한 접근을 클래스 내부에서만 허용한다. 클래스 외부에서는 접근할 수 없다. 이는 클래스 내부의 데이터와 로직을 보호하고, 외부에서의 잘못된 접근으로 인한 문제를 방지하기 위해 사용된다.

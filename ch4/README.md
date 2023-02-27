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
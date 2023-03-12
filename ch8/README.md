# Ch8. Custom Data Serialization

## Interceptor란?

Interceptor란 HTTP 요청이 처리되기 전에 중간에서 해당 요청을 가로채서 필요한 작업을 수행할 수 있도록 해주는 것을 말한다.

### Interceptor 사용 예시

아래의 코드에서 Exclude는 Entity Class를 JSON으로 직렬화할 때 해당 필드를 제외하도록 지시한다.

#### user.entity.ts

```
...
import { Exclude } from 'class-transformer'
...

@Entity()
export class User {
  ...
  @Column()
  @Exclude()
  password: string;
  ...
}
```

아래의 코드에서 @UseInterceptors()는 Interceptor를 사용하도록 한다. <br/>
ClassSerializerInterceptor의 경우 Class의 인스턴스를 JSON 객체로 직렬화하는 작업을 수행 <br/>
이를 통해 반환되는 데이터의 모양을 조정하거나, 보안 및 프라이버시와 관련된 필드를 제거하는 등의 작업을 수행한다.

#### user.controller.ts

```
import { ..., UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
...
@UseInterceptors(ClassSerializerInterceptor)
@Get('/:id')
findUser(@Param('id') id: string) {
  return this.usersService.findOne(parseInt(id));
}
...
```

### Interceptor 관련 자료

https://docs.nestjs.com/interceptors

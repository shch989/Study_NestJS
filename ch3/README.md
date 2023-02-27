# Ch3. Validating Request Data with Pipes

### HTTP Request

- Start line
  - POST /messages/5?validate=true HTTP/1.1
- Headers
  - Host: localhost:3000
  - Content-Type: application/json
- Body
  - { "content": "Hello NestJS!" }

### 본문 데코레이터

- @Body()

  ```
  @Post()
  createMessages(@Body() body: any) {
    console.log(body);
  }
  ```

- @Param('id')

  ```
  @Get('/:id')
  getMessages(@Param('id') id: string) {
    console.log(id)
  }
  ```

- @Query()
- @Headers()

## Pipe 사용

### Pipe로 유효성 검사 방법

1. DTO 클래스의 인스턴스로 본문(body)을 변환하기 위해 class-transformer를 사용
2. class-validator를 사용하여 인스턴스를 유효성 검사
3. 유효성 검사 오류가 있으면 즉시 응답. 그렇지 않으면 요청 핸들러에게 본문을 제공

### class-transformer 설치

class-transformer: TypeScript 또는 JavaScript 클래스와 객체를 변환하기 위한 라이브러리<br/>
관련자료: https://github.com/typestack/class-transformer

```
$ npm install --save class-transformer
```

### class-validator 설치

class-validator: 유효성 검사를 위해 사용<br/>
관련자료: https://github.com/typestack/class-validator

```
$ npm install --save class-validator
```

### Pipe 유효성 검사(전역)

```
...
import { ValidationPipe } from '@nestjs/common';
...
async function bootstrap() {
  ...
  app.useGlobalPipes(
    new ValidationPipe()
  )
  ...
}
bootstrap();
```

### DTO 설계

DTO: 클라이언트에서 전송하는 데이터를 서버에서 받아서 사용하기 쉽도록 구조화하는 객체

```
import { IsString } from 'class-validator';

export class createMessagesDto {
  @IsString()
  content: string;
}
```

### DTO를 사용한 유효성 검사

```
...
import { CreateMessagesDto } from './dtos/create-message.dto';
  ...
  @Post()
  createMessages(@Body() body: CreateMessagesDto) {
    console.log(body);
  }
  ...
```
#### Typescript World
```
addMessages(@Body() body: CreateMessagesDto) {...}
```
#### Javascript World
```
addMessages(body) {...}
```


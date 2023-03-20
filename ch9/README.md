# Ch11. Authentication From Scratch

## 회원가입 기능 구현

```
...
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
...
const scrypt = promisify(_scrypt);
...
  ...
  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, result);

    return user;
  }
  ...
...
```

### 코드 설명

| 코드        | 설명                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| randomBytes | 무작위로 생성된 바이트(byte) 값을 반환                                              |
| promisify   | 콜백 형태로 작성된 함수를 프로미스(Promise) 형태로 변경하는 기능을 수행             |
| scrypt      | 데이터를 입력받아, 그것을 해싱하여 다른 사용자에게 노출될 수 없도록 보안적으로 처리 |

## Cookie

### Cookie 설치

```
$ npm install --save cookie-session @types/cookie-session
```

### Cookie Session 설정

#### keys 옵션은 쿠키를 암호화하는 데 사용(현재 암호키: asdfasdf)

main.ts

```
import { NestFactory } from '@nestjs/core';
...
const cookieSession = require('cookie-session');

async function bootstrap() {
  ...
  app.use(
    cookieSession({
      keys: ['asdfasdf'],
    }),
  );
  ...
  await app.listen(3000);
}
bootstrap();
```

### Session 사용 예시

#### color Param에 입력된 글자를 Session에 저장(암호화)

```
@Get('/colors/:color')
setColor(@Param('color') color: string, @Session() session: any) {
  session.color = color;
}
```

#### session에 저장된 color 값을 불러옴

```
@Get('/colors')
getColor(@Session() session: any) {
  return session.color
}
```

## Custom route decorator
### Custom route decorator 란?
@Get, @Post와 같은 기본 라우트 데코레이터가 아닌, 사용자가 직접 만든 라우트 데코레이터를 말한다. 커스텀 라우트 데코레이터를 사용하여 코드의 재사용성을 높이는 것으로 특정한 기능을 수행하는 API 엔드포인트에 대해 반복적으로 같은 코드를 작성하지 않고, 데코레이터를 적용하여 재사용성을 높일 수 있도록 한다.

### 사용 간단 예시
user.decorator.ts
```
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

controller
```
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

## Guard
### Guard 란?
요청을 처리하기 전에 미리 정의된 로직으로 인증, 인가, 요청 검증 등의 작업을 수행하여 보안과 유효성 검사 등의 역할을 한다. 가드를 사용하여 특정 요청이 허용되는지 여부를 결정할 수 있으며, 인증된 사용자만 허용되는 요청에 대해서는 인증을 수행한다.

### Guard 가이드
#### https://docs.nestjs.com/guards

# 소스 파일(회원가입 및 로그인 기능)

## 회원가입

### Repository.ts

```
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
}
```

### Service.ts

```
async signup(email: string, password: string) {
  const users = await this.usersService.find(email);
  if (users.length) {
    throw new BadRequestException('email in use');
  }
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  const result = salt + '.' + hash.toString('hex');
  const user = await this.usersService.create(email, result);
  return user;
}
```

### Controller.ts

```
@Post('/signup')
async createUser(@Body() body: CreateUserDto, @Session() session: any) {
  const user = await this.authService.signup(body.email, body.password)
  session.userId = user.id
  return user
}
```

## 로그인

### Repository.ts

```
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
}
```

### Service.ts

```
async signin(email: string, password: string) {
  const [user] = await this.usersService.find(email);
  if (!user) {
    throw new NotFoundException('user not found');
  }

  const [salt, storedHash] = user.password.split('.');
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  if (storedHash !== hash.toString('hex')) {
    throw new BadRequestException('bad password');
  }
  return user;
}
```

### Controller.ts

```
@Post('/signin')
async signin(@Body() body: CreateUserDto, @Session() session: any) {
  const user = await this.authService.signin(body.email, body.password)
  session.userId = user.id
  return user
}
```

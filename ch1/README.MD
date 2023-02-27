# Ch1. The Basics of NestJS

## NestJS 시작 전 환경 세팅

```
$ npm install @nestjs/common@7.6.17
```

```
$ npm install @nestjs/core@7.6.17
```

```
$ npm install @nestjs/platform-express@7.6.17
```

```
$ npm install reflect-metadata@0.1.13
```

```
$ npm install typescript@4.3.2
```

## tsconfig.json 작성

```
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "es2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## NestJS가 요청을 처리하는 기본적인 절차

- Request, Response
- Pipe
- Guard
- Controller
- Service
- Repository

## NestJS 내부 도구

| 이름         | 설명                                      |
| ------------ | ----------------------------------------- |
| Controllers  | 들어오는 요청을 처리                      |
| Services     | 데이터 액세스 및 비즈니스 로직 처리       |
| Modules      | 코드 그룹화                               |
| Pipes        | 들어오는 데이터의 유효성을 확인           |
| Filters      | 요청 처리 중에 발생하는 오류를 처리       |
| Guards       | 인증 처리                                 |
| Interceptors | 수신 요청 또는 발신 응답에 추가 논리 추가 |
| Repositories | DB에 저장된 데이터를 처리                 |

## main.ts

```
import { NestFactory } from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(3000)
}

bootstrap()
```

## app.controller.ts

```
/* http://localhost:3000/api/hello */
import { Controller, Module, Get } from '@nestjs/common'

@Controller('/api')
export class AppController {
  @Get('/hello')
  getRootRoute() {
    return 'Hello NestJS!'
  }
}
```

## app.module.ts

```
import { Module } from "@nestjs/common";
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
})
export class AppModule {}
```

## 실행

```
$ npx ts-node-dev src/main.ts -y
```

# Ch2. Generationg Projects with the NestJS CLI

## NestJS CLI 설치

```
$ npm install -g @nestjs/cli
```

## NestJS 파일 생성

```
$ nest new <project-name>
```

## NestJS 실행

```
$ npm run start:dev
```

## NestJS Generate

### 생성

```
$ nest generate <code> <name>
```

```
$ nest g <code> <name>
```

### 테스트 코드와 함께 생성

```
$ nest generate <code> <name>/<name> --flat
```

```
$ nest g <code> <name>/<name> --flat
```

| 이름       | 설명               | 간략화 |
| ---------- | ------------------ | ------ |
| module     | 모듈 파일 생성     | mo     |
| controller | 컨트롤러 파일 생성 | co     |

## Controller 작성

```
@Controller()
export class Messages Controller {
  @Get('/messages')
  listMessages() {}

  @Post('/messages')
  createMessages() {}

  @Get('/messages/:id')
  getMessages() {}
}
```

## API Clients

- Postman.com
- VSCode REST Client Extension

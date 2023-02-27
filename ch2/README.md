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

| 이름          | 별칭   | 설명                                     |
| ------------- | ------ | ---------------------------------------- |
| application   | app    | 새로운 어플리케이션 워크스페이스 생성    |
| class         | cl     | 새로운 클래스 생성                       |
| configuration | config | CLI 설정 파일 생성                       |
| controller    | co     | 컨트롤러 선언 생성                       |
| decorator     | d      | 사용자 지정 데코레이터 생성              |
| filter        | f      | 필터 선언 생성                           |
| gateway       | ga     | 게이트웨이 선언 생성                     |
| guard         | gu     | 가드 선언 생성                           |
| interceptor   | itc    | 인터셉터 선언 생성                       |
| interface     | itf    | 인터페이스 생성                          |
| middleware    | mi     | 미들웨어 선언 생성                       |
| module        | mo     | 모듈 선언 생성                           |
| pipe          | pi     | 파이프 선언 생성                         |
| provider      | pr     | 프로바이더 선언 생성                     |
| resolver      | r      | GraphQL 리졸버 선언 생성                 |
| service       | s      | 서비스 선언 생성                         |
| library       | lib    | 모노레포 내에서 새로운 라이브러리 생성   |
| sub-app       | app    | 모노레포 내에서 새로운 어플리케이션 생성 |
| resource      | res    | 새로운 CRUD 리소스 생성                  |

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

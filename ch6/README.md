# Ch6. Persisting Data with TypeORM

## TypeORM 설치

```
$ npm install @nestjs/typeorm typeorm <database>
```

## DataBase 생성

#### app.module.ts

```
...
import { TypeOrmModule } from '@nestjs/typeorm';
...

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: '<SQL>',
      database: '<db.name>',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  ...
})
export class AppModule {}
```

### Entity 생성

#### user.entity.ts

```
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string
}
```

#### TypeORM Decorator 문서

- https://typeorm.io/#/decorator-reference/

#### users.module.ts

```
...
import { TypeOrmModule } from '@nestjs/typeorm';
...
import { User } from './user.entity';
...

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

```

#### app.module.ts

```
...
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
...

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: '<SQL>',
      database: '<db.name>',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  ...
})
export class AppModule {}
```

## Repository API

#### TypeORM repository api 관련 자료

- https://typeorm.io/#/repository-api/

  | 코드      | 설명                                                            |
  | --------- | --------------------------------------------------------------- |
  | create()  | 엔티티의 새로운 인스턴스를 생성하지만 DB에는 유지하지 않는다.   |
  | save()    | 레코드를 DB에 추가하거나 업데이트한다.                          |
  | find()    | 쿼리를 실행하고 엔티티의 리스트를 반환한다.                     |
  | findOne() | 검색 기준과 일치하는 첫 번째 레코드를 반환하는 쿼리를 실행한다. |
  | remove()  | 레코드를 DB에서 제거한다.                                       |

## Whitelist와 Blacklist
#### 아래의 코드에서 whitelist를 작성하였는데 설명은 아래와 같다.
```
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();
```
### Whitelist란?
whitelist 옵션을 켜놓은 상태에서 입력 데이터에 id와 name 속성만 있다면, 이 두 속성만 유효하다고 간주하고 다른 속성은 무시한다. 이렇게 하면 입력 데이터에 포함되지 않은 다른 속성이나, 악의적인 공격자가 추가한 속성을 걸러내는 보안 효과가 있다.

### Blacklist란?
whitelist와는 반대로 blacklist 옵션을 사용하면, 특정 속성을 거부하고 나머지 속성들은 허용합니다
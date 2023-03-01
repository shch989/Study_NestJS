# Ch7. Creating and Saving User Data

## TypeORM 사용

아래의 코드에서 repo는 Repository 클래스의 인스턴스를 나타내는 매개변수이다.<br/>
Repository 클래스는 데이터베이스에서 데이터를 가져오는데 사용되는데 아래의 코드에서<br/>
Repository 클래스는 User 모델의 데이터를 가져오는데 사용된다.<br/>
@InjectRepository의 경우 TypeORM의 Repository 클래스를 주입하기 위해 사용

```
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
}
```

## DataBase에 저장

create()를 사용하여 email과 password를 json 형태로 user변수에 저장
repo라는 변수의 User Repository에 save()로 저장

```
create(email: string, password: string) {
  const user = this.repo.create({ email, password });
  return this.repo.save(user);
}
```

### DataBase에 저장 과정

- Requset > 예) {email: "test@gmail.com", password: "test"}
- ValidationPipe > CreateUserDto의 형식에 맞는지 유효성 검사
- UsersController > Controller에서 Service를 요청하여 실행
- UsersService에서 데이터 저장을 위해 Repository에 요청 또는 UsersService에서 저장 > Entity의 typeORM의 형식으로 유효성 검사
- UsersService에서 요청을 받을 경우 Repository에서 데이터를 DB에 저장 > Entity의 typeORM의 형식으로 유효성 검사
- DB에서 Table형식으로 데이터 관리

## create() vs save()

- create()는 TypeORM의 Entity를 생성하는 방법 중 하나이다. 이를 통해 Entity의 인스턴스를 만들고, 해당 인스턴스에 값을 할당하면서 유효성 검사 등을 수행할 수 있다.
- save()는 인자로 전달된 plain object를 Entity로 변환하고 데이터베이스에 저장하는 방법으로 create()과 달리 유효성 검사 등을 수행하지 않으므로, 불필요한 데이터베이스 쿼리를 발생시킬 수 있다.

## Post 요청

#### users.service.ts

```
create(email: string, password: string) {
  const user = this.repo.create({ email, password });
  return this.repo.save(user);
}
```

#### users.controller.ts

```
@Post('/signup')
createUser(@Body() body: CreateUserDto) {
  this.usersService.create(body.email, body.password);
}
```

## Patch 요청

아래의 코드에서 Object.assign(user, attrs)의 코드는 user 객체와 attrs 객체를 병합한다. <br/>
attrs: Partial<User> 코드에서 Partial는 User 인터페이스의 일부 속성만을 가진 새로운 인터페이스를 만드는 것이다.

#### users.service.ts

```
async update(id: number, attrs: Partial<User>) {
  const user = await this.findOne(id);
  Object.assign(user, attrs)
  return this.repo.save(user);
}
```

#### users.controller.ts

```
@Patch('/:id')
updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
  return this.usersService.update(parseInt(id), body)
}
```

## Delete 요청

#### users.service.ts

```
async remove(id: number) {
  const user = await this.findOne(id);
  return this.repo.remove(user);
}
```

#### users.controller.ts

```
@Delete('/:id')
removeUser(@Param('id') id: string) {
  return this.usersService.remove(parseInt(id))
}
```

## TypeORM 3.0 변경 사항

### find()

#### TypeORM 3.0 이전

```
.find({ email })
```

#### TypeORM 3.0

```
.find({ where: { email } })
```

### findOne()

#### TypeORM 3.0 이전

```
.findOne(id)
```

#### TypeORM 3.0

```
findOneBy({ id })
```

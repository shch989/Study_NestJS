import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { NotFoundError } from 'rxjs';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // 이메일이 사용 중인지 확인
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // 유저 비밀번호 해쉬화
    // 1 salt 생성
    const salt = randomBytes(8).toString('hex');

    // 2 salt와 password 함께 해쉬화
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 3 해쉬화된 salt와 password를 결합
    const result = salt + '.' + hash.toString('hex');

    // 새로운 유저 생성 및 저장
    const user = await this.usersService.create(email, result);

    // 유저 반환
    return user;
  }

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
}

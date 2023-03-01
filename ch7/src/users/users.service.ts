import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    // typeORM 3.0이후 findOne(id)의 사용 방법이 바뀜
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found.');
    }
    return user;
  }

  async find(email: string) {
    // typeORM 3.0이후 find({email})의 사용 방법이 바뀜
    const user = await this.repo.find({ where: { email } });
    if (user.length === 0) {
      throw new NotFoundException('user email not found.');
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, attrs)
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}

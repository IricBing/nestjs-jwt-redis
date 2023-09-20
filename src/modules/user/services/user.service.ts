import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService implements OnModuleInit {
  private userList: UserEntity[] = [];

  onModuleInit() {
    for (let i = 1; i <= 10; i++) {
      const user = new UserEntity();
      user.uuid = uuid();
      user.name = `用户${i}`;
      this.userList.push(user);
    }
  }

  findOneByName(name: string): UserEntity {
    return this.userList.find((user) => user.name === name);
  }
}

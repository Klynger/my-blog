import { ID } from 'scalars';
import { User } from '../shared/models/user.model';
import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/models/create-user.dto';
import { UserWithPassword } from '../shared/models/user-with-password.model';
import { UpdateUserDto } from 'src/shared/models/update-user.dto';

interface UsersWithPassword {
  [key: string]: UserWithPassword;
}

@Injectable()
export class UserRepository {
  private static _idCount = 0;
  private _usersWithPassword: UsersWithPassword;

  constructor() {
    this._usersWithPassword = {};
  }

  public getUser(id: ID): User {
    if (this._usersWithPassword[id]) {
      return UserWithPassword.parseToUser(this._usersWithPassword[id]);
    }
    throw new NotFoundException(`User with id '${id}' not found`);
  }

  public addUser(userDto: CreateUserDto): User {
    const id = UserRepository._idCount.toString();
    const userWithPassword = {
      id,
      ...userDto,
    };
    this._usersWithPassword[id] = userWithPassword;
    UserRepository._idCount++;
    return UserWithPassword.parseToUser(userWithPassword);
  }

  public updateUser(userDto: UpdateUserDto, id: ID): User {
    const user = this._usersWithPassword[id];

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }

    if (userDto.name) {
      this._usersWithPassword[id] = {
        ...this._usersWithPassword[id],
        name: userDto.name,
      };
    }
    return UserWithPassword.parseToUser(this._usersWithPassword[id]);
  }

  public deleteUser(id: ID): void {
    if (!this._usersWithPassword[id]) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    delete this._usersWithPassword[id];
  }
}

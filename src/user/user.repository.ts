import { ID } from 'scalars';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../shared/models/user/user.model';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import { UserWithPasswordModel } from '../shared/models/user/user-with-password.model';
import { NotFoundByParamException } from '../shared/exceptions/not-found-by-param.exception';

interface UsersWithPassword {
  [key: string]: UserWithPasswordModel;
}

@Injectable()
export class UserRepository {
  private static _idCount = 0;
  private _usersWithPassword: UsersWithPassword;

  constructor() {
    this._usersWithPassword = {};
  }

  public getUser(id: ID): UserModel {
    if (!this._usersWithPassword[id]) {
      throw new NotFoundByParamException('User', 'id', id);
    }
    return UserWithPasswordModel.parseToUser(this._usersWithPassword[id]);
  }

  public addUser(userDto: CreateUserDto): UserModel {
    const id = UserRepository._idCount.toString();
    const userWithPassword = {
      id,
      posts: [],
      ...userDto,
    };
    this._usersWithPassword[id] = userWithPassword;
    UserRepository._idCount++;
    return UserWithPasswordModel.parseToUser(userWithPassword);
  }

  public updateUser(userDto: UpdateUserDto, id: ID): UserModel {
    const user = this._usersWithPassword[id];

    if (!user) {
      throw new NotFoundByParamException('User', 'id', id);
    }

    if (userDto.name) {
      this._usersWithPassword[id] = {
        ...this._usersWithPassword[id],
        name: userDto.name,
      };
    }
    return UserWithPasswordModel.parseToUser(this._usersWithPassword[id]);
  }

  public deleteUser(id: ID): void {
    if (!this._usersWithPassword[id]) {
      throw new NotFoundByParamException('User', 'id', id);
    }
    delete this._usersWithPassword[id];
  }

  public addPostToUser(postId: ID, userId: ID): void {
    const user = this._usersWithPassword[userId];

    if (!user) {
      throw new NotFoundByParamException('User', 'id', userId);
    }

    this._usersWithPassword = {
      ...this._usersWithPassword,
      [userId]: {
        ...user,
        posts: user.posts.concat([postId]),
      },
    };
  }
}

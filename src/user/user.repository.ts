import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import { UserWithPasswordModel } from '../shared/models/user/user-with-password.model';

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

  public getUser(id: string) {
    const user = this._usersWithPassword[id];
    return user ? UserWithPasswordModel.parseToUser(user) : null;
  }

  public addUser(userDto: CreateUserDto) {
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

  public updateUser(userDto: UpdateUserDto, id: string) {
    const user = this._usersWithPassword[id];

    if (!user) {
      return null;
    }

    this._usersWithPassword[id] = {
      ...this._usersWithPassword[id],
      ...userDto,
    };

    return UserWithPasswordModel.parseToUser(this._usersWithPassword[id]);
  }

  public deleteUser(id: string) {
    delete this._usersWithPassword[id];
  }

  public addPostToUser(postId: string, userId: string) {
    const user = this._usersWithPassword[userId];

    if (!user) {
      return null;
    }

    this._usersWithPassword = {
      ...this._usersWithPassword,
      [userId]: {
        ...user,
        posts: user.posts.concat([postId]),
      },
    };

    return this._usersWithPassword[userId];
  }
}

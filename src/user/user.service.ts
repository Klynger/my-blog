import { Injectable } from '@nestjs/common';
import { ID } from 'scalars';
import { UserRepository } from './user.repository';
import { UserModel } from '../shared/models/user/user.model';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import { NotFoundByParamException } from '../shared/exceptions/not-found-by-param.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUser(id: ID): UserModel {
    const user = this.userRepository.getUser(id);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', id);
    }
    return user;
  }

  public createUser(createUserDto: CreateUserDto): UserModel {
    return this.userRepository.addUser(createUserDto);
  }

  public updateUser(updateUserDto: UpdateUserDto, id: ID): UserModel {
    const user = this.userRepository.updateUser(updateUserDto, id);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', id);
    }

    return user;
  }

  public deleteUser(id: ID): void {
    this.getUser(id);
    this.userRepository.deleteUser(id);
  }

  public addPostToUser(postId: ID, userId: ID): void {
    const user = this.userRepository.addPostToUser(postId, userId);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', userId);
    }
  }
}

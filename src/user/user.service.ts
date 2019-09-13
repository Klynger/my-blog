import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import { NotFoundByParamException } from '../shared/exceptions/not-found-by-param.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUser(id: string) {
    const user = this.userRepository.getUser(id);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', id);
    }
    return user;
  }

  public createUser(createUserDto: CreateUserDto) {
    return this.userRepository.addUser(createUserDto);
  }

  public updateUser(updateUserDto: UpdateUserDto, id: string) {
    const user = this.userRepository.updateUser(updateUserDto, id);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', id);
    }

    return user;
  }

  public deleteUser(id: string) {
    this.getUser(id);
    this.userRepository.deleteUser(id);
  }

  public addPostToUser(postId: string, userId: string) {
    const user = this.userRepository.addPostToUser(postId, userId);

    if (!user) {
      throw new NotFoundByParamException('User', 'id', userId);
    }
  }
}

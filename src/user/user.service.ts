import { Injectable } from '@nestjs/common';
import { ID } from 'scalars';
import { UserRepository } from './user.repository';
import { UserModel } from '../shared/models/user/user.model';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public getUser(id: ID): UserModel {
    return this.userRepository.getUser(id);
  }

  public createUser(createUserDto: CreateUserDto): UserModel {
    return this.userRepository.addUser(createUserDto);
  }

  public updateUser(updateUserDto: UpdateUserDto, id: ID): UserModel {
    return this.userRepository.updateUser(updateUserDto, id);
  }

  public deleteUser(id: ID): void {
    this.userRepository.deleteUser(id);
  }

  public addPostToUser(postId: ID, userId: ID): void {
    this.userRepository.addPostToUser(postId, userId);
  }
}

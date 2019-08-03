import { Injectable } from '@nestjs/common';
import { ID } from 'scalars';
import { User } from '../shared/models/user/user.model';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUser(id: ID): User {
    return this.userRepository.getUser(id);
  }

  createUser(createUserDto: CreateUserDto): User {
    return this.userRepository.addUser(createUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto, id: ID): User {
    return this.userRepository.updateUser(updateUserDto, id);
  }

  deleteUser(id: ID): void {
    this.userRepository.deleteUser(id);
  }
}

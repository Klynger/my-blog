import { ID } from 'scalars';
import { UserService } from './user.service';
import { User } from '../shared/models/user/user.model';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: ID): User {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: ID): User {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: ID): void {
    this.userService.deleteUser(id);
  }
}

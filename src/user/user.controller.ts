import { ID } from 'scalars';
import { UserService } from './user.service';
import { UserModel } from '../shared/models/user/user.model';
import { CreateUserDto } from '../shared/models/user/create-user.dto';
import { UpdateUserDto } from '../shared/models/user/update-user.dto';
import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: ID): UserModel {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserModel {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: ID): UserModel {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: ID): void {
    this.userService.deleteUser(id);
  }
}

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../shared/models/user/create-user.dto';

describe('UserController', () => {
  let userControler: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userControler = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should create an user', () => {
      const userDto: CreateUserDto = {
        name: 'Rafael Klynger',
        password: '123456',
        username: 'klynger',
      };

      const user = userControler.createUser(userDto);
      expect(user.name).toEqual(userDto.name);
      expect(user.username).toEqual(userDto.username);
      expect(user).not.toContain('password');
    });
  });
});

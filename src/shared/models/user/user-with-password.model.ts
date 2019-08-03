import { User } from './user.model';

export class UserWithPassword extends User {
  static parseToUser(userWithPassword: UserWithPassword): User {
    const user: User = {
      id: userWithPassword.id,
      name: userWithPassword.name,
      username: userWithPassword.username,
    };
    return user;
  }

  password: string;
}

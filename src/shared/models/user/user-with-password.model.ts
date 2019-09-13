import { UserModel } from './user.model';

export class UserWithPasswordModel extends UserModel {
  static parseToUser(userWithPassword: UserWithPasswordModel) {
    const user: UserModel = {
      id: userWithPassword.id,
      name: userWithPassword.name,
      username: userWithPassword.username,
      posts: userWithPassword.posts,
    };
    return user;
  }

  password: string;
}

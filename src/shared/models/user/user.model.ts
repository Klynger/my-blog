import { ID } from 'scalars';

export class UserModel {
  public id: ID;
  public username: string;
  public name: string;
  public posts: ID[];
}

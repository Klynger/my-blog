import { ID } from 'scalars';

export class PostModel {
  public id: ID;
  public title?: string;
  public content: string;
  public creator: ID;
}

import { ID } from 'scalars';

export class CreatePostDto {
  public title?: string;
  public content: string;
  public creator: ID;
}

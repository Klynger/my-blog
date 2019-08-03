import { ID } from 'scalars';
import { Injectable } from '@nestjs/common';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';
import { NotFoundByParamException } from '../shared/exceptions/not-found-by-param.exception';

interface Posts {
  [key: string]: PostModel;
}

@Injectable()
export class PostRepository {
  private static _idCount = 0;
  private _posts: Posts;

  constructor() {
    this._posts = {};
  }

  public getPost(id: ID): PostModel {
    const post = this._posts[id];
    if (!post) {
      throw new NotFoundByParamException('Post', 'id', id);
    }
    return post;
  }

  public addPost(postDto: CreatePostDto): PostModel {
    const id = this._getNextId();
    const post = {
      id,
      ...postDto,
    };

    this._posts[id] = post;

    return post;
  }

  public updatePost(postDto: UpdatePostDto, id: ID): PostModel {
    const post = this._posts[id];

    if (!post) {
      throw new NotFoundByParamException('Post', 'id', id);
    }

    this._posts[id] = {
      id,
      ...postDto,
    };

    return this._posts[id];
  }

  public deletePost(id: ID): void {
    if (!this._posts[id]) {
      throw new NotFoundByParamException('Post', 'id', id);
    }

    delete this._posts[id];
  }

  private _getNextId(): ID {
    const availableId = PostRepository._idCount.toString();
    PostRepository._idCount++;

    return availableId;
  }
}

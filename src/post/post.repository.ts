import { ID } from 'scalars';
import { Injectable } from '@nestjs/common';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';

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

  public getPost(id: ID): PostModel | null {
    return this._posts[id] || null;
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

  public updatePost(postDto: UpdatePostDto, id: ID): PostModel | null {
    const post = this._posts[id];

    if (!post) {
      return null;
    }

    this._posts[id] = {
      id,
      creator: post.creator,
      ...postDto,
    };

    return this._posts[id];
  }

  public deletePost(id: ID): void {
    delete this._posts[id];
  }

  public getPosts(ids: ID[]) {
    return Object.keys(this._posts)
      .filter(id => ids.includes(id))
      .map(id => this._posts[id]);
  }

  private _getNextId(): ID {
    const availableId = PostRepository._idCount.toString();
    PostRepository._idCount++;

    return availableId;
  }
}

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

  public getPost(id: string) {
    return this._posts[id] || null;
  }

  public addPost(postDto: CreatePostDto) {
    const id = this._getNextId();
    const post = {
      id,
      ...postDto,
    };

    this._posts[id] = post;

    return post;
  }

  public updatePost(postDto: UpdatePostDto, id: string) {
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

  public deletePost(id: string) {
    delete this._posts[id];
  }

  public getPosts(ids: string[]) {
    return Object.keys(this._posts)
      .filter(id => ids.includes(id))
      .map(id => this._posts[id]);
  }

  private _getNextId() {
    const availableId = PostRepository._idCount.toString();
    PostRepository._idCount++;

    return availableId;
  }
}

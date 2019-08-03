import { ID } from 'scalars';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from 'src/shared/models/post/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public addPost(postDto: CreatePostDto): PostModel {
    return this.postRepository.addPost(postDto);
  }

  public getPost(id: ID): PostModel {
    return this.postRepository.getPost(id);
  }

  public updatePost(postDto: UpdatePostDto, id: ID): PostModel {
    return this.postRepository.updatePost(postDto, id);
  }

  public deletePost(id: ID): void {
    this.postRepository.deletePost(id);
  }
}

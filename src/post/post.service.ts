import { ID } from 'scalars';
import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly userService: UserService) {}

  public addPost(postDto: CreatePostDto): PostModel {
    this.userService.getUser(postDto.creator);
    const post = this.postRepository.addPost(postDto);
    this.userService.addPostToUser(post.id, post.creator);

    return post;
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

  public getPosts(ids: ID[]): PostModel[] {
    return this.postRepository.getPosts(ids);
  }
}

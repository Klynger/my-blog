import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { UserService } from '../user/user.service';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';
import { NotFoundByParamException } from '../shared/exceptions/not-found-by-param.exception';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly userService: UserService) {}

  public addPost(postDto: CreatePostDto) {
    this.userService.getUser(postDto.creator);
    const post = this.postRepository.addPost(postDto);
    this.userService.addPostToUser(post.id, post.creator);

    return post;
  }

  public getPost(id: string) {
    const post = this.postRepository.getPost(id);
    if (!post) {
      throw new NotFoundByParamException('Post', 'id', id);
    }

    return post;
  }

  public updatePost(postDto: UpdatePostDto, id: string) {
    const post = this.postRepository.updatePost(postDto, id);
    if (!post) {
      throw new NotFoundByParamException('Post', 'id', id);
    }

    return post;
  }

  public deletePost(id: string) {
    this.getPost(id);
    this.postRepository.deletePost(id);
  }

  public getPosts(ids: string[]): PostModel[] {
    return this.postRepository.getPosts(ids);
  }
}

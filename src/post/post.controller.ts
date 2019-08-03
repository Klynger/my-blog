import { ID } from 'scalars';
import { PostService } from './post.service';
import { PostModel } from '../shared/models/post/post.model';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';
import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  public getPost(@Param('id') id: ID): PostModel {
    return this.postService.getPost(id);
  }

  @Post()
  public addPost(@Body() postDto: CreatePostDto): PostModel {
    return this.postService.addPost(postDto);
  }

  @Put(':id')
  public updatePost(@Body() postDto: UpdatePostDto, @Param('id') id: ID): PostModel {
    return this.postService.updatePost(postDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deletePost(@Param('id') id: ID): void {
    this.postService.deletePost(id);
  }
}

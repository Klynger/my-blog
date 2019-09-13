import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from '../shared/models/post/create-post.dto';
import { UpdatePostDto } from '../shared/models/post/update-post.dto';
import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Query,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly userService: UserService) {}

  @Get(':id')
  public getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Get()
  public getPosts(@Query() query: QueryType) {
    const { userId }: { userId?: string } = query;
    if (userId === undefined) {
      throw new BadRequestException('You must pass the query \'userId\'');
    }
    const user = this.userService.getUser(userId);
    return this.postService.getPosts(user.posts);
  }

  @Post()
  public createPost(@Body() postDto: CreatePostDto) {
    return this.postService.addPost(postDto);
  }

  @Put(':id')
  public updatePost(@Body() postDto: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updatePost(postDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deletePost(@Param('id') id: string) {
    this.postService.deletePost(id);
  }
}

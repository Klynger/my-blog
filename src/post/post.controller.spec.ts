import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto } from 'src/shared/models/post/create-post.dto';

describe('PostController', () => {
  let postController: PostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PostRepository],
    }).compile();

    postController = app.get<PostController>(PostController);
  });

  describe('root', () => {
    it('should create an user', () => {
      const postDto: CreatePostDto = {
        title: 'My new post',
        content: 'Content of my new post',
      };

      const post = postController.createPost(postDto);
      expect(post.title).toEqual(postDto.title);
      expect(post.content).toEqual(postDto.content);
    });
  });
});

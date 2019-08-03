import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { PostModule } from '../src/post/post.module';

describe('PostController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/post/0 should return 404 status code', () => {
    return request(app.getHttpServer())
      .get('/post/0')
      .expect(HttpStatus.NOT_FOUND);
  });
});

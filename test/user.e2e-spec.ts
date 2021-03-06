import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';

describe('UserController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/0 (GET) should return 404 status code', () => {
    return request(app.getHttpServer())
      .get('/user/0')
      .expect(HttpStatus.NOT_FOUND);
  });
});

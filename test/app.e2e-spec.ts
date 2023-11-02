import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200).expect([]);
  });

  it('/category/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/category/1')
      .expect(200)
      .expect('');
  });

  it('/category (POST)', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({ name: 'Новая категория' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            name: 'Новая категория',
            is_active: true,
          }),
        );
      });
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200).expect({
      id: 1,
      name: 'Новая категория',
      is_active: true,
    });
  });

  it('/category/1 (GET)', () => {
    return request(app.getHttpServer()).get('/category/1').expect(200).expect({
      id: 1,
      name: 'Новая категория',
      is_active: true,
    });
  });

  it('/category/1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/category/1').expect(200);
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200).expect([]);
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer()).get('/posts').expect(200).expect([]);
  });

  it('/posts/1 (GET)', () => {
    return request(app.getHttpServer()).get('/posts/1').expect(200).expect('');
  });

  it('/posts (POST)', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({ name: 'Новая категория' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'Новый пост',
            description: 'Описание нового поста',
            category: 1,
          }),
        );
      });
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect({
        id: 1,
        name: 'Новый пост',
        description: 'Описание нового поста',
        category: {
          id: 1,
          name: 'Новая категория',
          is_active: true,
        },
      });
  });

  it('/posts/1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/posts/1').expect(200);
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer()).get('/posts').expect(200).expect([]);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});

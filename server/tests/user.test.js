import supertest from 'supertest';
import { assert } from 'chai';
import faker from 'faker';

import app from '../app';

require('dotenv').config();

const server = supertest.agent(app);

let token = '';

/* eslint-disable prefer-destructuring */
describe('User', () => {
  it('should return 201 when a regular user is created', (done) => {
    server.post('/api/v1/signup')
      .send({
        email: 'test@gmail.com',
        username: 'test',
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        token = res.body.token;
        assert.isNotNull(res.body.User);
        assert.deepEqual(res.body.user.local, {
          email: 'test@gmail.com',
          username: 'test'
        });
        done();
      });
  });
  it('should return 400 if email field is not present', (done) => {
    server.post('/api/v1/signup')
      .send({
        username: faker.internet.userName(),
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 409 if email or username exists', (done) => {
    server.post('/api/v1/signup')
      .send({
        email: 'test@gmail.com',
        username: 'user',
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 409);
        done();
      });
  });
  it('should return 400 if username is not provided', (done) => {
    server.post('/api/v1/signin')
      .send({
        username: '',
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 404 if user is not registered', (done) => {
    server.post('/api/v1/signin')
      .send({
        username: 'tester',
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  it('should return 200 signin is successful', (done) => {
    server.post('/api/v1/signin')
      .send({
        username: 'test',
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body.user.local, {
          email: 'test@gmail.com',
          username: 'test'
        });
        done();
      });
  });
});

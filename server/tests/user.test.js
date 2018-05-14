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
        username: faker.internet.userName(),
        password: 'people',
      })
      .end((err, res) => {
        assert.equal(res.status, 201);
        token = res.body.token;
        assert.isNotNull(res.body.User);
        done();
      });
  });
});

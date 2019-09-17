import supertest from 'supertest';
import faker from 'faker';

import app from '../../server/app';

require('dotenv').config();

const server = supertest.agent(app);

export const userToken = () => new Promise((resolve) => {
  server.post('/api/v1/signup')
    .send({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'password'
    })
    .end((err, res) => {
      const { token } = res.body;
      resolve({ token });
    });
});

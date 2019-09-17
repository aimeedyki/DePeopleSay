import supertest from 'supertest';
import chai, { assert, expect } from 'chai';
import chaiSubset from 'chai-subset';
import faker from 'faker';
import mongoose from 'mongoose';

import app from '../app';
import { userToken } from './testHooks';
import databaseConfig from '../config/databaseConfig';

chai.use(chaiSubset);

require('dotenv').config();

const server = supertest.agent(app);

let token = '';

/* eslint-disable prefer-destructuring */
describe('Poll', () => {
  before((done) => {
    userToken()
      .then((responseToken) => {
        token = responseToken.token;
        done();
      });
  });
  it('should return 201 when a poll is created', (done) => {
    const samplePoll = {
      question: 'What is the best colour for a cake',
      options: ['red', 'green', 'blue' ],
      isAnonymous: false
    };
    server.post('/api/v1/poll')
      .send(samplePoll).set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.isNotNull(res.body.poll);
        done();
      });
  });
  it('should return 400 when an empty form is sent', (done) => {
    server.post('/api/v1/poll')
      .send({}).set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        done();
      });
  });
  it('should return 400 if question has no value', (done) => {
    server.post('/api/v1/poll')
      .send({
        options: ['red', 'green', 'blue'],
        isAnonymous: false
      }).set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, '"question" is required');
        done();
      });
  });
  it('should return 400 if question field is empty', (done) => {
    server.post('/api/v1/poll')
      .send({
        question: '',
        options: [ 'red', 'green','blue' ],
        isAnonymous: false
      }).set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, '"question" is not allowed to be empty');
        done();
      });
  });
  it(
    'should return 400 if question field has a value less than 6 characters',
    (done) => {
      server.post('/api/v1/poll')
        .send({
          question: 'why',
          options: ['red' , 'green' , 'blue'],
          isAnonymous: false
        }).set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(
            res.body.message,
            '"question" length must be at least 6 characters long'
          );
          done();
        });
    }
  );
  it('should return 400 if options has no value', (done) => {
    server.post('/api/v1/poll')
      .send({
        question: 'What is the best colour for a cake',
        isAnonymous: false
      }).set('x-access-token', token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, '"options" is required');
        done();
      });
  });
  it(
    'should return 400 if options field contains less than 2 items',
    (done) => {
      server.post('/api/v1/poll')
        .send({
          question: 'What is the best colour for a cake',
          options: ['red' ],
          isAnonymous: false
        }).set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(
            res.body.message,
            '"options" must contain at least 2 items'
          );
          done();
        });
    }
  );
  it(
    'should return 400 if options field contains more than 5 items',
    (done) => {
      server.post('/api/v1/poll')
        .send({
          question: 'What is the best colour for a cake',
          options: ['red','green', 'blue', 'yellow', 'purple', 'white' ],
          isAnonymous: false
        }).set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(
            res.body.message,
            '"options" must contain less than or equal to 5 items'
          );
          done();
        });
    }
  );
  it(
    'should return 400 if optionValue field contains duplicate values',
    (done) => {
      server.post('/api/v1/poll')
        .send({
          question: 'What is the best colour for a cake',
          options: ['red','green', 'red', 'yellow', 'purple' ],
          isAnonymous: false
        }).set('x-access-token', token)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.equal(
            res.body.message,
            '"options" position 2 contains a duplicate value'
          );
          done();
        });
    }
  );
});

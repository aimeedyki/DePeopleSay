import jwt from 'jsonwebtoken';

require('dotenv').config();

const secret = process.env.SECRET;

const getUserToken = user =>
  jwt.sign({
    userId: user.id
  }, secret, { expiresIn: '10h' });

export default getUserToken;

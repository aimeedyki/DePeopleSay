import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'Not Authorized'
    });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }

    req.decoded = decoded;
    next();
  });
};

export default authenticate;

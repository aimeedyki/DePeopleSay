import { ExtractJwt } from 'passport-jwt';

// load up the user model
import User from '../models/user';
import databaseConfig from '../config/databaseConfig';

const JwtStrategy = require('passport-jwt').Strategy;

module.exports = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromHeader('authorization');
  options.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (error, user) => {
      if (error) {
        return done(error, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};

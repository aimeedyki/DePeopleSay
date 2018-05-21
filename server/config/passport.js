import { ExtractJwt } from 'passport-jwt';
import { OAuth2Strategy } from 'passport-google-oauth';

// load up the user model
import User from '../models/user';
import databaseConfig from '../config/databaseConfig';

require('dotenv').config();

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

  // Use the GoogleStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a token, tokenSecret, and Google profile), and
  //   invoke a callback with a user object.
  passport.use(new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/oauth2callback'
    },
    (token, refreshToken, profile, done) => {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(() => {
        // try to find the user based on their google id
        User.findOne({
          $or: [
            { 'google.id': profile.id },
            { 'local.email': profile.emails[0].value }]
        }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (user) {
            // if a user is found, log them in
            return done(null, user);
          }
          // if the user isnt in our database, create a new user
          const newUser = new User({
            google: {
              id: profile.id,
              token,
              name: profile.displayName,
              email: profile.emails[0].value
            }
          });

          // save the user
          newUser.save((err) => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        });
      });
    }
  ));
};

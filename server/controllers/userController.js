import jwt from 'jsonwebtoken';
import passport from 'passport';

import databaseConfig from '../config/databaseConfig';
import getUserToken from '../helpers/getUserToken';
import User from '../models/user';
import { signupValidation, signinValidation } from '../helpers/userValidations';

require('../config/passport')(passport);
require('dotenv').config();

export default {
  /** @description signs up a user
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} HTTP response object
   */
  signup: (req, res) => {
    if (signupValidation(req.body).isValid) {
      const { email, username, password } = req.body;
      User.findOne({
        $or: [
          { 'local.username': username }, { 'local.email': email }]
      }, (error, user) => {
        if (user) {
          return res.status(409).json({
            success: false,
            message: 'Username or email already exists'
          });
        }

        const newUser = new User({
          local: {
            email,
            username,
            password
          }
        });

        // save the user
        newUser.save((err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          const token = getUserToken(newUser);
          return res.status(201).json({
            success: true,
            message: 'Successful created new user',
            user: newUser,
            token
          });
        });
      });
    } else {
      res.status(400).json({
        success: 'fail',
        message: signupValidation(req.body).message
      });
    }
  },

  /** @description signs up a user
   *
   * @param {object} req HTTP request object
   * @param {object} res HTTP response object
   *
   * @returns {object} HTTP response object
   */
  signin: (req, res) => {
    if (signinValidation(req.body).isValid) {
      const { username, password } = req.body;
      User.findOne({ 'local.username': username }, (error, user) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message
          });
        }

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'Username not found, please signup'
          });
        }

        if (!user.isPasswordValid(password)) {
          return res.status(401).json({
            success: false,
            message: 'Your username or password is not correct'
          });
        }

        const token = getUserToken(user);
        return res.status(200).json({
          success: true,
          message: 'Successfully signed in user',
          user,
          token
        });
      });
    } else {
      res.status(400).json({
        success: 'fail',
        message: signupValidation(req.body).message
      });
    }
  }
};

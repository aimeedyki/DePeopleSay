import jwt from 'jsonwebtoken';
import passport from 'passport';

import databaseConfig from '../config/databaseConfig';
import getUserToken from '../helpers/getUserToken';
import User from '../models/user';

require('../config/passport')(passport);
require('dotenv').config();

export default {
  signup: (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ success: false, msg: 'Please enter username and password.' });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save((error) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }
        const token = getUserToken(newUser);
        res.status(201).json({
          success: true,
          message: 'Successful created new user',
          newUser,
          token
        });
      });
    }
  },

  signin: (req, res) => {

  }
}

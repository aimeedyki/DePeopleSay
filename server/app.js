/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

import databaseConfig from './config/databaseConfig';
import serverRoutes from './routes/index';

require('dotenv').config();

// Set up the express app
const app = express();

// sets port
const port = process.env.PORT || 5000;

const env = process.env.NODE_ENV || 'development';

// mongoose connection
mongoose.connect(databaseConfig[env])
  .then(connection => console.log('Connected to MongoDB'))
  .catch(error => console.log(`mongoDB error ${error.message}, env is ${env}`));

// initialize passport
app.use(passport.initialize());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// Require routes into the application.
app.use('/api/v1', serverRoutes);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;

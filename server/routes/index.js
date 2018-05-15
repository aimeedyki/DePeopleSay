import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController';

const app = express();

// route for registration
app.post('/signup', userController.signup);

export default app;

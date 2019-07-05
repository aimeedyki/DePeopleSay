import express from 'express';
import passport from 'passport';
import { userController } from '../controllers';

const app = express();

// route for registration
app.post('/signup', userController.signup);

// route for login
app.post('/signin', userController.signin);

export default app;

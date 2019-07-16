import express from 'express';
import { userController, pollController } from '../controllers';
import authenticate from '../middleware/authentication';

const app = express();

// route for registration
app.post('/signup', userController.signup);

// route for login
app.post('/signin', userController.signin);

// route for creating a poll
app.post('/poll', authenticate, pollController.createPoll);

export default app;

import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-in', login);
authRouter.post('/sign-up', register);

export default authRouter;

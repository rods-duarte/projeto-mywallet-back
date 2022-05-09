import { Router } from 'express';

import { login, register, logout } from '../controllers/authController.js';

import { validateToken } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-in', login);
authRouter.post('/sign-up', register);
authRouter.delete('/sign-out', validateToken, logout);

export default authRouter;

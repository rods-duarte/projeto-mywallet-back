import { Router } from 'express';
import { getUserData, updateStatus } from '../controllers/userController.js';

import { validateToken } from '../middlewares/authMiddleware.js';
import { findUser } from '../middlewares/userMiddleware.js';

const userRouter = Router();

userRouter.use(validateToken);

userRouter.get('/users/:id', findUser, getUserData);
userRouter.put('/status', updateStatus);

export default userRouter;

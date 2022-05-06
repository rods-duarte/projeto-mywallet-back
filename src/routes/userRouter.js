import { Router } from 'express';
import { getUserData, newEntry } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/users/:id', getUserData);
userRouter.post('/users/:id', newEntry);

export default userRouter;

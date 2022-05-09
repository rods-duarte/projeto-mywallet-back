import { Router } from 'express';

import { newEntry, deleteEntry } from '../controllers/recordsController.js';

import { findUser } from '../middlewares/userMiddleware.js';
import { validateToken } from '../middlewares/authMiddleware.js';

const recordsRouter = Router();

// TODO mudar nome das rotas para /records/...
recordsRouter.post('/users/:id', findUser, newEntry);
recordsRouter.delete('/users/:idRecord', validateToken, deleteEntry);

export default recordsRouter;

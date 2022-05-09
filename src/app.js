import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import recordsRouter from './routes/recordsRouter.js';

const app = express();
// middlewares
app.use(json());
app.use(cors());

// routes
app.use(authRouter);
app.use(userRouter);
app.use(recordsRouter);

dotenv.config({ path: './src/config/config.env' });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.green.bold('Servidor aberto na porta', port)); // eslint-disable-line no-console
});

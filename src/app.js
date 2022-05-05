import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import { register } from './controllers/authController.js';

const app = express();
app.use(json());
app.use(cors());
dotenv.config({ path: './src/config/config.env' });

app.post('/sign-up', register);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.green.bold('Servidor aberto na porta', port)); // eslint-disable-line no-console
});

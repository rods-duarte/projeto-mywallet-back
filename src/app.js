import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();
app.use(json());
app.use(cors());
dotenv.config({ path: './src/config/config.env' });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.green.bold('Servidor aberto na porta', port)); // eslint-disable-line no-console
});

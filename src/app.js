import express, { json } from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();
app.use(json());
app.use(cors());
dotenv.config({ path: './src/config/config.env' });

const dbName = process.env.DB_NAME || 'test';
const MongoUrl = process.env.MONGO_URL;
const client = new MongoClient(MongoUrl);
let db;

(async function () {
  try {
    console.log(chalk.yellow.bold('\nConectando a database...')); // eslint-disable-line no-console
    await client.connect();
    db = client.db(dbName);
    console.log(chalk.green.bold('Conectado a database MongoDB')); // eslint-disable-line no-console
  } catch (e) {
    console.log(chalk.red.bold('Erro ao conectar a database')); // eslint-disable-line no-console
    console.log(e); // eslint-disable-line no-console
  }
})();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.green.bold('Servidor aberto na porta', port)); // eslint-disable-line no-console
});

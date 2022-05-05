import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config({ path: './src/config/config.env' });

const dbName = process.env.DB_NAME || 'test';
const MongoUrl = process.env.MONGO_URL;
const client = new MongoClient(MongoUrl);
let database;

try {
  console.log(chalk.yellow.bold('\nConectando a database...')); // eslint-disable-line no-console
  await client.connect();
  database = client.db(dbName);
  console.log(chalk.green.bold('Conectado a database MongoDB')); // eslint-disable-line no-console
} catch (e) {
  console.log(chalk.red.bold('Erro ao conectar a database')); // eslint-disable-line no-console
  console.log(e); // eslint-disable-line no-console
}

const db = database;

export default db;

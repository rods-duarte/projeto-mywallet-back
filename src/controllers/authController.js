import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/index.js';

import UserSchema from '../models/UserSchema.js';

export async function register(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (UserSchema.validate({ name, email, password, confirmPassword }).error) {
    res.sendStatus(422);
    return;
  }

  try {
    const checkExists = await db.collection('users').findOne({ email });
    const cryptedPasword = bcrypt.hashSync(password, 10);

    if (checkExists) {
      res.sendStatus(403);
      return;
    }

    await db
      .collection('users')
      .insertOne({ name, email, password: cryptedPasword, records: [] });
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
    console.log(e); // eslint-disable-line no-console
  }
}

import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/index.js';

import UserSchema from '../models/UserSchema.js';

export async function login(req, res) {
  const { email, password } = req.body;

  //   if (UserSchema.validate({ email, password }).error) {
  //     res.sendStatus(400);
  //     return;
  //   }

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.sendStatus(404);
      return;
    }
    const token = uuid();
    const userId = user._id;
    await db.collection('sessions').insertOne({ token, userId });
    res.send({ token, userId });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.senStatus(500);
  }
}

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

import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import db from '../database/index.js';
import isActive from '../utils/is_active.js';

import UserSchema from '../models/UserSchema.js';

export async function login(req, res) {
  const { email, password } = req.body;

  const validateTypo = UserSchema.validate({ email, password }).error;

  if (validateTypo) {
    res.status(400).send('Campos preenchidos incorretamente');
    return;
  }

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      res.status(404).send('Usuario nao cadastrado');
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(404).send('Senha incorreta');
    }

    const token = uuid();
    const userId = user._id;
    await db
      .collection('sessions')
      .insertOne({ token, userId, lastStatus: Date.now() });
    isActive(userId);
    res.send({ token, userId });
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

export async function register(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const validateTypo = UserSchema.validate({
    name,
    email,
    password,
    confirmPassword,
  }).error;

  if (validateTypo) {
    res.sendStatus(400);
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

export async function logout(req, res) {
  const { session } = res.locals;

  try {
    await db.collection('sessions').deleteOne(session);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

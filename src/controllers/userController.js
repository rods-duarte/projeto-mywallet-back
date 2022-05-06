/* eslint-disable import/prefer-default-export */
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import db from '../database/index.js';

import EntrySchema from '../models/EntrySchema.js';

export async function getUserData(req, res) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) {
    res.sendStatus(403);
    return;
  }

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      res.sendStatus(404);
      return;
    }

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    delete user.password;
    delete user._id;
    delete user.email;

    res.send(user);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function newEntry(req, res) {
  const { authorization } = req.headers;
  const { value, desc, type } = req.body;
  const { id } = req.params;
  const token = authorization?.replace('Bearer', '').trim();
  const entry = { value, desc, type, date: dayjs().format('DD/MM') };

  if (EntrySchema.validate(entry).error) {
    res.sendStatus(422);
    return;
  }

  if (!token) {
    res.sendStatus(403);
    return;
  }

  try {
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const session = await db
      .collection('sessions')
      .findOne({ token, userId: new ObjectId(id) });
    if (!session) {
      res.sendStatus(403);
      return;
    }

    const records = [...user.records, entry];
    console.log(records);

    await db
      .collection('users')
      .updateOne({ _id: new ObjectId(id) }, { $set: { records } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';

import db from '../database/index.js';

import EntrySchema from '../models/EntrySchema.js';

export async function newEntry(req, res) {
  const { value, desc, type } = req.body;
  const entry = {
    value,
    desc,
    type,
    date: dayjs().format('DD/MM'),
    _id: new ObjectId(),
  };
  const { user } = res.locals;

  if (EntrySchema.validate(entry).error) {
    res.sendStatus(422);
    return;
  }

  try {
    const records = [...user.records, entry];

    await db
      .collection('users')
      .updateOne({ _id: new ObjectId(user._id) }, { $set: { records } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteEntry(req, res) {
  const { session } = res.locals;
  const { idRecord } = req.params;

  try {
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(session.userId) });

    const index = user.records.findIndex(
      (record) => record._id.toString() === idRecord
    );
    user.records.splice(index, 1);

    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { records: user.records } }
      );

    res.status(200).send(user.records);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

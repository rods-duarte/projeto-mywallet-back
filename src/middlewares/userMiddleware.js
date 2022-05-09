/* eslint-disable import/prefer-default-export */
import { ObjectId } from 'mongodb';

import db from '../database/index.js';

export async function findUser(req, res, next) {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    delete user.password;

    res.locals.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

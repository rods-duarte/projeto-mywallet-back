/* eslint-disable import/prefer-default-export */
import db from '../database/index.js';

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      res.sendStatus(401);
      return;
    }

    res.locals.session = session;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

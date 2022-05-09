import db from '../database/index.js';

export async function getUserData(req, res) {
  const { user } = res.locals;
  delete user._id;
  delete user.email;
  res.send(user);
}

export async function updateStatus(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();
  const time = Date.now();

  try {
    await db
      .collection('sessions')
      .updateOne({ token }, { $set: { lastStatus: time } });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

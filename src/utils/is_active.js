import db from '../database/index.js';

export default function isActive() {
  setInterval(async () => {
    const time = Date.now();
    const timeLimit = 10000;
    try {
      await db.collection('sessions').deleteMany({
        lastStatus: { $lte: time - timeLimit },
      });
    } catch (e) {
      console.log(e);
    }
  }, 15000);
}

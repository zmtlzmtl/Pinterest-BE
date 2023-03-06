const express = require('express');
const router = express.Router();
const { Users } = require('../../db/models');

const pinsRouter = require('./pins.route');
const commentRouter = require('./comments.route');
const userRouter = require('./user.route')

router.use('/', [pinsRouter]);

router.use('/pin/:pinId/comment', [commentRouter]);

router.use('/', [userRouter])

router.get('/', (_req, res) => {
  res.send('정상적으로 요청되었습니다.');
});

router.post('/', async (req, res) => {
  const Id = await Users.create();
  return Id;
});

module.exports = router;

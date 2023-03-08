const express = require('express');
const router = express.Router();
const { Users } = require('../../db/models');

const pinsRouter = require('./pin.route');
const commentRouter = require('./comment.route');
const userRouter = require('./user.route');

router.use('/', [userRouter]);
router.use('/', [pinsRouter]);
router.use('/pins', [commentRouter]);
router.get('/', (_req, res) => {
  res.send('정상적으로 요청되었습니다.');
});

module.exports = router;

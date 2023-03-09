const jwt = require('jsonwebtoken');
const { Users } = require('../../db/models');
const { logger } = require('../middlewares/logger');

module.exports = async (req, res, next) => {
  logger.info('LoginMiddleware Request');
  const { authorization } = req.headers;
  const [tokenType, token] = (authorization ?? '').split(' ');
  if (tokenType !== 'Bearer' || !token) {
    return res.status(401).json({
      message: '토큰 타입이 일치하지 않거나, 토큰이 존재하지 않습니다.',
    });
  }
  try {
    logger.info('Verify Request');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ message: '토큰에 해당하는 사용자가 존재하지 않습니다.' });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: '유효하지 않은 토큰입니다.',
    });
  }
};

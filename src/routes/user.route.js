const express = require('express');
const router = express.Router();
const { Users } = require('../../db/models');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  nickname: Joi.string().alphanum().min(3).max(30).required(),
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    await userSchema.validateAsync(req.body); // => validation 'user' with using Joi validator.
    const hash = await bcrypt.hash(password, 10); // => using hash to make password safer.
    const user = await Users.create({ email, password: hash, nickname });
    return res
      .status(200)
      .json([{ email: user.email }, { nickname: user.nickname }]);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(user.dataValues, process.env.KEY, {
          expiresIn: '800000', // => 13 minutes
        });
        res.cookie('token', token, {
          httpOnly: true,
        });
        return res.status(200).json({ msg: 'login successful' });
      } else {
        return res.status(400).json({ msg: 'wrong password.' });
      }
    } else {
      return res.status(400).json({ msg: 'User not found.' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err.message });
  }
});

module.exports = router;

const express = require('express');
const { logger } = require('./src/middlewares/logger');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./src/routes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieparser());

app.use(
  cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: true,
    credentials: true,
  })
);

app.use('/api', router);

app.listen(port);
logger.info(`${process.env.NODE_ENV} - API Server Listening At Port ${port}`);

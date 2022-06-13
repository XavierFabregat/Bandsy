'use strict';

const Express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const router = require('./router');
const sequelize = require('./models');
require('dotenv').config('./env');

const app = Express();
const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';

const corsConfig = {
  credentials: true,
};

app.use(cors(corsConfig));
app.use(Express.json());
app.use(morgan('dev'));

app.use(
  session({
    name: 'sid',
    secret: 'Dont know what this is...',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000, sameSite: true, httpOnly: false }, // 1 hour
  }),
);

app.use(router);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on http://${HOST}:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
})();

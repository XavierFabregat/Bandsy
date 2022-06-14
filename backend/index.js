'use strict';

const Express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const router = require('./router');
const sequelize = require('./models');
require('dotenv').config('./env');

const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || 'localhost';

const corsConfig = {
  credentials: true,
};

app.use(cors(corsConfig));
app.use(Express.json({ limit: '50mb' }));
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

io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  socket.on('message', msg => {
    io.emit('message', msg);
  });
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

app.use(router);

(async () => {
  try {
    await sequelize.sync();
    http.listen(PORT, () => {
      console.log(`Server listening on http://${HOST}:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
})();

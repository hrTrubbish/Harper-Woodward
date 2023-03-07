const express = require('express');
const ViteExpress = require('vite-express');
const morgan = require('morgan');
const router = require('./routes');
require('dotenv').config();

const app = express();

/* MIDDLEWARE */
app.use(morgan('dev'));
app.use(express.json({ limit: '32mb' }));
app.use('/api', router);

app.get('/hello', (req, res) => {
  res.send('Hello Vite + React!');
});

ViteExpress.listen(app, process.env.PORT, () => {
  console.log(
    `Server is listening on port ${process.env.PORT}...`,
  );
});

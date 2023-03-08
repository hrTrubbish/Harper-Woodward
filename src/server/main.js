// ====== IMPORTS ===========================
require('dotenv').config();
const express = require('express');
const ViteExpress = require('vite-express');
const cors = require('cors');
const morganMiddleware = require('./middleware/morgan');
const logger = require('./middleware/logger');
const router = require('./routes');

// ====== CONSTANTS =========================
const app = express();

// ====== MIDDLEWARE ========================
app.use(cors());
app.use(morganMiddleware);
app.use(express.json({ limit: '32mb' }));

app.use('/api', router);

ViteExpress.listen(app, process.env.PORT, () => {
  logger.info(
    `Server is listening on port ${process.env.PORT}`,
  );
});

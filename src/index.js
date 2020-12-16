const process = require('process');
const http = require('http');
// eslint-disable-next-line no-global-assign
Promise = require('bluebird');

const { logger } = require('./config/logger');
const { port, env } = require('./config/vars');
const { app } = require('./config/express');

async function start() {
    const httpServer = http.Server(app);
    httpServer.listen(port, () => logger.warn(`NextHuddle recorder started on port ${port} (${env})`));
}

start().catch((e) => {
    logger.error(e.message);
    process.exit();
});

module.exports = app;

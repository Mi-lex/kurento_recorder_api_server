const { logger } = require('../../config/logger');

exports.wrapWithCatch = (func, io) => async (socket) => {
    try {
        await func(socket, io);
    } catch (e) {
        logger.error(`\`${e}\``);
        socket.disconnect();
    }
};

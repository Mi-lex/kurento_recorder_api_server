const winston = require('winston');
const { TelegramTransport } = require('../externalServices/telegram/telegramTransport');
const { telegram: { chatId, botToken } } = require('./vars');

const transports = [];
if (chatId && botToken) {
    transports.push(
        new TelegramTransport({
            botToken,
            chatId,
        }),
    );
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format((info) => {
            // eslint-disable-next-line no-param-reassign
            info.message = `Log ${info.level} on recorder:\n${info.message}`;
            return info;
        })(),
    ),
    transports,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

exports.logger = logger;

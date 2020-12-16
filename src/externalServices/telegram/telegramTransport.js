const Transport = require('winston-transport');
const { sendMessage } = require('./telegram');

class TelegramTransport extends Transport {
    constructor({ botToken, chatId }) {
        super();

        this.botToken = botToken;
        this.chatId = chatId;
    }

    log(info, callback) {
        if (info.level === 'info') {
            callback();
            return;
        }
        sendMessage(this.chatId, this.botToken, info.message)
            .then(() => {
                callback();
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.error(`!!! UNABLE SEND TELEGRAM ${info.level} MESSAGE !!!:\n${info.message}`);
                // eslint-disable-next-line no-console
                console.error(e);
                callback();
            });
    }
}

exports.TelegramTransport = TelegramTransport;

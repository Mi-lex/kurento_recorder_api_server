const { sendHttpRequest } = require('../../utils/http/sendHttpRequest');

const MAX_MESSAGE_LENGTH = 4096;

exports.sendMessage = async function sendMessage(chatId, botToken, message) {
    return sendHttpRequest({
        url: `https://api.telegram.org/bot${botToken}/sendMessage`,
        method: 'POST',
        data: {
            chat_id: chatId,
            text: message.substring(0, MAX_MESSAGE_LENGTH),
        },
    });
};

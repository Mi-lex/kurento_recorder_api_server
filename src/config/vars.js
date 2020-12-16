require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.RECORDER_PORT || 9000,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    isLocal: process.env.IS_LOCAL,
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
    },
    aws: {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION || 'us-east-1',
        apiVersion: process.env.S3_API_VERSION || '2006-03-01',
    },
};

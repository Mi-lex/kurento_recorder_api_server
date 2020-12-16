const httpStatus = require('http-status');
const { PassThrough } = require('stream');

const {
    wrapAsyncMiddleware,
} = require('../../../middlewares/wrapAsyncMiddleware');
const { saveRecordingStream } = require('../../../services/recordings/saveRecordingStream');

exports.saveRecording = wrapAsyncMiddleware(async (req, res) => {
    const { bucketName, sessionId, fileName } = req.params;
    const stream = new PassThrough();

    req.on('close', () => {
        res.status(httpStatus.OK).end();
    });
    req.pipe(stream);

    await saveRecordingStream({
        bucketName,
        sessionId,
        fileName,
        stream,
    });
});

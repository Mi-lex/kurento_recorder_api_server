const CONTENT_TYPE_BY_EXTENSION = require('../../const/CONTENT_TYPE_BY_EXTENSION');
const { uploadStream } = require('../../externalServices/aws/uploadStream');
const { getExtension } = require('../../utils/files/getExtension');
const { getRecordingKey } = require('./getRecordingKey');

async function saveRecordingStream({
    bucketName, sessionId, fileName, stream,
}) {
    const ext = getExtension(fileName);
    const contentType = CONTENT_TYPE_BY_EXTENSION[ext];
    await uploadStream({
        bucketName,
        stream,
        contentType,
        ACL: 'public-read',
        key: getRecordingKey({ sessionId, fileName }),
    });
}

exports.saveRecordingStream = saveRecordingStream;

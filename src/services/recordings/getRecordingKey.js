const { RECORDINGS_PATH } = require('../../const/PATH');

exports.getRecordingKey = ({ sessionId, fileName }) => (
    `${RECORDINGS_PATH}/${sessionId}/${fileName}`
);

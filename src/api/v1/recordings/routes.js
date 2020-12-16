const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post(
    '/:bucketName/:sessionId/:fileName',
    controller.saveRecording,
);

module.exports = router;

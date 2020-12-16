const express = require('express');
const httpStatus = require('http-status');
const routesV1 = require('./v1');

const router = express.Router();

router.use('/v1', routesV1);

const startedAt = new Date();
router.get('/', (req, res) => {
    res.status(httpStatus.OK).json({
        startedAt,
        serverTime: new Date(),
    });
});

module.exports = router;

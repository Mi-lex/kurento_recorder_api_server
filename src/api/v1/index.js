const express = require('express');
const recordingsRoutes = require('./recordings/routes');

const router = express.Router();

router.use('/recordings', recordingsRoutes);

module.exports = router;

'use strict';

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);


module.exports = router;
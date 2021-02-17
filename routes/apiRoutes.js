'use strict';

const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const homeController = require('../controllers/homeController');

router.get('/quizzes/data', quizController.getData, homeController.index);

module.exports = router;

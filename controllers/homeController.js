'use strict';

module.exports = {
    index: (req, res, next) => {
        res.render('index', { title: 'Quiz App' });
    },
};
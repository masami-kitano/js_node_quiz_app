'use strict';

const request = require('request');

class Quiz {
    constructor(quizData) {
        this.quizzes = quizData.results;
        this.score = 0;
    }
}

module.exports = {
    getData: (req, res) => {
        const options = {
            url: 'https://opentdb.com/api.php?amount=10',
            method: 'GET',
        }
        request(options, (error, response, data) => {
            if (error) {
                console.log('Error: ' + error.message);
                return;
            } else {
                let quizData = data.toString();
                quizData = JSON.parse(quizData);
                const quizInstance = new Quiz(quizData);
                res.json(quizInstance);
            }
        });
    }
};
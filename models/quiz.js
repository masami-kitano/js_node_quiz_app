'use strict';

const quizCategories = [];
const quizDifficulties = [];
const quizQuestions = [];
const quizAnswers = [];
const quizCorrectAnswers = [];

class Quiz {
    constructor(quizData) {
        this.quizzes = quizData.results;
        this.length = quizData.results.length;
        this.categories = getCategories(quizData.results);
        this.difficulties = getDifficulties(quizData.results);
        this.questions = getQuestions(quizData.results);
        this.answers = getAnswers(quizData.results);
        this.correctAnswers = getCorrectAnswers(quizData.results);
        this.score = 0;
    }
}

const getCategories = (quizzes) => {
    for (let i = 0; i < quizzes.length; i++) {
        const quizCategory = unescapeHTML(quizzes[i].category);
        quizCategories.push(quizCategory);
    }
    return quizCategories;
};

const getDifficulties = (quizzes) => {
    for (let i = 0; i < quizzes.length; i++) {
        quizDifficulties.push(quizzes[i].difficulty);
    }
    return quizDifficulties;
}

const getQuestions = (quizzes) => {
    for (let i = 0; i < quizzes.length; i++) {
        const quizQuestion = unescapeHTML(quizzes[i].question);
        quizQuestions.push(quizQuestion);
    }
    return quizQuestions;
}

const getAnswers = (quizzes) => {
    for (let i = 0; i < quizzes.length; i++) {
        const answers = [
            quizzes[i].correct_answer,
            ...quizzes[i].incorrect_answers
        ];
        const shuffledAnswers = shuffle(answers);

        quizAnswers.push(shuffledAnswers);
    }
    return quizAnswers;
}

const getCorrectAnswers = (quizzes) => {
    for (let i = 0; i < quizzes.length; i++) {
        const quizCorrectAnswer = unescapeHTML(quizzes[i].correct_answer);
        quizCorrectAnswers.push(quizCorrectAnswer);
    }
    return quizCorrectAnswers;
}

const shuffle = (array) => {
    const shuffleArray = array.slice();
    for (let i = shuffleArray.length - 1; i >= 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffleArray[i], shuffleArray[rand]] = [shuffleArray[rand], shuffleArray[i]]
    }

    return shuffleArray;
};

const unescapeHTML = (str) => {
    return str.replace(/(&lt;)/g, '<')
              .replace(/(&gt;)/g, '>')
              .replace(/(&quot;)/g, '"')
              .replace(/(&#039;)/g, "'")
              .replace(/(&amp;)/g, '&');
};

module.exports = Quiz;
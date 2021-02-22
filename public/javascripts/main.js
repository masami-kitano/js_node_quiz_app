'use strict';

const quizApiUrl = 'api/quizzes/data';

const quizContainer = document.getElementById('quiz-container');
const quizTitle = document.getElementById('quiz-title');
const quizCategory = document.getElementById('quiz-category');
const quizDifficulty = document.getElementById('quiz-difficulty');
const quizContent = document.getElementById('question')
const answersContainer = document.getElementById('answers');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', (event) => {
    getQuizData(0);
});

const getQuizData = async(index) => {
    quizTitle.textContent = '取得中です';
    quizContent.textContent = '少々お待ちください';
    startButton.hidden = true;

    const res = await fetch(quizApiUrl);
    const quizData = await res.json();

    setNextQuiz(quizData, index);
};

const setNextQuiz = (quizData, index) => {
    quizTitle.textContent = '';
    quizCategory.textContent = '';
    quizDifficulty.textContent = '';
    quizContent.textContent = '';
    removeAnswers();

    if (index < quizData.length) {
        makeQuiz(quizData, index);
    } else {
        finishQuiz(quizData);
    }
};

const finishQuiz = (quizData) => {
    quizTitle.textContent = `あなたの正解数${quizData.score}です！！`;
    quizContent.textContent = `再度チャレンジしたい場合は以下をクリック！！`;
    const createTopButton = document.createElement('button');
    const returnTopButton = quizContainer.appendChild(createTopButton);
    returnTopButton.id = 'return-top-button';
    returnTopButton.textContent = 'ホーム戻る';

    returnTopButton.addEventListener('click', (event) => {
        returnTop();
    });
};

const returnTop = () => {
    quizTitle.textContent = 'ようこそ';
    quizContent.textContent = '以下のボタンをクリック';
    startButton.hidden = false;
    const topButton = document.getElementById('return-top-button');
    topButton.remove();
}

const removeAnswers = () => {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
};

const makeQuiz = (quizData, index) => {
    const answers = quizData.answers[index];

    quizTitle.textContent = `問題${index + 1}`;
    quizCategory.textContent = `【ジャンル】${quizData.categories[index]}`;
    quizDifficulty.textContent = `【難易度】${quizData.difficulties[index]}`;
    quizContent.textContent = quizData.questions[index];

    answers.forEach((answer) => {
        let answerListItem = document.createElement('li');
        answerListItem = answersContainer.appendChild(answerListItem);
        let answerButton = document.createElement('button');
        answerListItem.appendChild(answerButton);
        answerButton.textContent = answer;

        answerButton.addEventListener('click', (event) => {
            const correctAnswer = quizData.correctAnswers[index];
            if (event.target.textContent === correctAnswer) {
                quizData.score++;
            }

            index++;
            setNextQuiz(quizData, index);
        });
    });
};
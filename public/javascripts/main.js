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

    if (index < quizData.quizzes.length) {
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
    const answers = makeAnswers(quizData, index);

    quizTitle.textContent = `問題${index + 1}`;
    quizCategory.textContent = `【ジャンル】${unescapeHTML(quizData.quizzes[index].category)}`;
    quizDifficulty.textContent = `【難易度】${quizData.quizzes[index].difficulty}`;
    quizContent.textContent = unescapeHTML(quizData.quizzes[index].question);

    answers.forEach((answer) => {
        const answerListItem = document.createElement('li');
        const answerButtonItem = answersContainer.appendChild(answerListItem);
        answerButtonItem.innerHTML = `<button>${unescapeHTML(answer)}</button>`;

        answerButtonItem.addEventListener('click', (event) => {
            correctAnswer = unescapeHTML(quizData.quizzes[index].correct_answer);
            if (event.target.textContent === correctAnswer) {
                quizData.score++;
            }

            index++;
            setNextQuiz(quizData, index);
        });
    });
};

const makeAnswers = (quizData, index) => {
    const answers = [
        quizData.quizzes[index].correct_answer,
        ...quizData.quizzes[index].incorrect_answers
    ];

    const shuffledAnswers = shuffle(answers);

    return shuffledAnswers;
};

const shuffle = (array) => {
    const shuffleArray = array.slice();
    for (let i = shuffleArray.length - 1; i >= 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [shuffleArray[i], shuffleArray[rand]] = [shuffleArray[rand], shuffleArray[i]]
    }

    return shuffleArray;
};

const unescapeHTML = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str.replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/\r/g, '&#13;')
        .replace(/\n/g, '&#10;');

    return div.textContent || div.innerText;
};
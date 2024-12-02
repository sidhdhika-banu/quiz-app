const questions = [
    {
        question: "What is the study of the mind and behavior called?",
        choices: ["Biology", "Psychology", "Geography", "Chemistry"],
        correctAnswer: 1 // Psychology
    },
    {
        question: "Who developed the theory of psychoanalysis?",
        choices: ["Carl Jung", "Sigmund Freud", "Jean Piaget", "B.F. Skinner"],
        correctAnswer: 1 // Sigmund Freud
    },
    {
        question: "What is the term for a person's emotional or mental state?",
        choices: ["Consciousness", "Happiness", "Mood", "Personality"],
        correctAnswer: 2 // Mood
    },
    {
        question: "Which of the following is a symptom of depression?",
        choices: ["Euphoria", "Low energy", "Increased appetite", "Heightened libido"],
        correctAnswer: 1 // Low energy
    },
    {
        question: "What is the term for the process of learning through observation and imitation?",
        choices: ["Conditioning", "Modeling", "Reinforcement", "Acquisition"],
        correctAnswer: 1 // Modeling
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startButton = document.getElementById('startQuiz');
const containerMessage = document.getElementById('containerMessage');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const quizStartMessage = document.getElementById('quizStartMessage');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const finalScoreElement = document.getElementById('final-score');
const viewReportButton = document.getElementById('viewReport');
const reportElement = document.getElementById('report');
const retakeButton = document.getElementById('retake');
const closeButton = document.getElementById('close');
const exitMessage = document.getElementById('exit-message');
const exitButton = document.getElementById('exit');

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', checkAnswer);
retakeButton.addEventListener('click', restartQuiz);
viewReportButton.addEventListener('click', showReport);
closeButton.addEventListener('click', showExitMessage);
exitButton.addEventListener('click', exitQuiz);

function startQuiz() {
    startButton.style.display = 'none';
    quizStartMessage.style.display = 'none';
    containerMessage.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${currentQuestionData.question}`;

    choicesElement.innerHTML = '';

    currentQuestionData.choices.forEach((choice, index) => {
        const choiceLabel = document.createElement('label');
        choiceLabel.classList.add('choice');
        choiceLabel.innerHTML = `<input type="radio" name="choice" value="${index}"> ${choice}`;
        choicesElement.appendChild(choiceLabel);
    });

    resultElement.textContent = '';
}

function checkAnswer() {
    const selectedChoice = choicesElement.querySelector('input[name="choice"]:checked');
    if (!selectedChoice) {
        resultElement.textContent = 'Please select an answer.';
        return;
    }

    const selectedAnswer = parseInt(selectedChoice.value);
    const currentQuestionData = questions[currentQuestion];

    userAnswers[currentQuestion] = selectedAnswer;

    if (selectedAnswer === currentQuestionData.correctAnswer) {
        score++;
        resultElement.textContent = 'Correct!';
    } else {
        resultElement.textContent = 'Incorrect!';
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quizContainer.style.display = 'none';
    finalScoreElement.style.display = 'block';
    viewReportButton.style.display = 'inline-block';
    retakeButton.style.display = 'inline-block';
    closeButton.style.display = 'inline-block';
    document.getElementById('score').textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    finalScoreElement.style.display = 'none';
    startButton.style.display = 'block';
    viewReportButton.style.display = 'none';
    reportElement.style.display = 'none';
    retakeButton.style.display = 'none';
    closeButton.style.display = 'none';
}

function showExitMessage() {
    finalScoreElement.style.display = 'none';
    reportElement.style.display = 'none';
    exitMessage.style.display = 'block';
}

function exitQuiz() {
    exitMessage.style.display = 'none';
    close();
}

function showReport() {
    finalScoreElement.style.display = 'block';
    reportElement.style.display = 'block';

    let reportHTML = '<h3>Quiz Report</h3>';
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const userChoice = userAnswer !== undefined ? question.choices[userAnswer] : "Not answered";
        reportHTML += `<p>Question ${index + 1}: ${question.question} - Your Answer: ${userChoice} (${isCorrect ? 'Correct' : 'Incorrect'})</p>`;
    });
    reportElement.innerHTML = reportHTML;
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});

const startBtn = document.getElementById('start-btn');
const questionScreen = document.getElementById('question-screen');
// ... (rest of the file remains the same)
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const contactFormScreen = document.getElementById('contact-form-screen'); // Add this line

let currentQuestionIndex = 0;
let scores = {
    A: 0,
    B: 0,
    C: 0
};

const questions = [
    {
        question: '금요일 밤에 무엇을 하고 싶으신가요?',
        answers: [
            { text: '친구들과 밖에서 놀기', trait: 'A' },
            { text: '집에서 책 읽기', trait: 'B' },
            { text: '새롭고 흥미로운 것에 도전하기', trait: 'C' }
        ]
    },
    {
        question: '다음 중 당신을 가장 잘 표현하는 단어는 무엇인가요?',
        answers: [
            { text: '사교적인', trait: 'A' },
            { text: '창의적인', trait: 'B' },
            { text: '모험심이 강한', trait: 'C' }
        ]
    },
    {
        question: '당신이 꿈꾸는 이상적인 휴가는 무엇인가요?',
        answers: [
            { text: '할거리가 많은 활기찬 도시', trait: 'A' },
            { text: '숲속의 조용한 오두막', trait: 'B' },
            { text: '이국적이고 미지의 장소', trait: 'C' }
        ]
    }
];

startBtn.addEventListener('click', startTest);

function startTest() {
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    answersEl.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.addEventListener('click', () => selectAnswer(answer.trait));
        answersEl.appendChild(button);
    });
}

function selectAnswer(trait) {
    scores[trait]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionScreen.classList.add('hide');
    resultScreen.classList.remove('hide');

    let resultTrait = 'A';
    if (scores.B > scores.A && scores.B > scores.C) {
        resultTrait = 'B';
    } else if (scores.C > scores.A && scores.C > scores.B) {
        resultTrait = 'C';
    }

    let resultText = '';
    if (resultTrait === 'A') {
        resultText = '당신은 사교적인 나비입니다! 사람들과 어울리는 것을 좋아하고 파티의 주인공입니다.';
    } else if (resultTrait === 'B') {
        resultText = '당신은 창의적이고 내성적인 영혼입니다. 혼자만의 시간을 즐기고 풍부한 내면 세계를 가지고 있습니다.';
    } else {
        resultText = '당신은 모험심이 강한 영혼입니다! 항상 새로운 경험을 추구하며 미지의 것을 두려워하지 않습니다.';
    }
    resultEl.innerText = resultText;

    // Add contact button
    const contactButton = document.createElement('button');
    contactButton.innerText = '제휴 문의';
    contactButton.addEventListener('click', showContactForm);
    resultScreen.appendChild(contactButton);
}

function showContactForm() {
    resultScreen.classList.add('hide');
    contactFormScreen.classList.remove('hide');
}


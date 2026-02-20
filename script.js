document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Яка збірна виграла найбільшу кількість Чемпіонатів світу?",
            answers: ["Німеччина", "Італія", "Бразилія", "Аргентина"],
            correct: 2
        },
        {
            question: "Хто з цих футболістів має найбільше Золотих м'ячів?",
            answers: ["Кріштіану Роналду", "Ліонель Мессі", "Зінедін Зідан", "Роналдіньо"],
            correct: 1
        },
        {
            question: "Скільки хвилин триває основний час футбольного матчу?",
            answers: ["45 хвилин", "80 хвилин", "90 хвилин", "100 хвилин"],
            correct: 2
        },
        {
            question: "Який клуб виграв найбільше трофеїв Ліги Чемпіонів?",
            answers: ["Баварія", "Ліверпуль", "Барселона", "Реал Мадрид"],
            correct: 3
        },
        {
            question: "Як називається одинадцятиметровий удар у футболі?",
            answers: ["Офсайд", "Пенальті", "Кутовий", "Аут"],
            correct: 1
        },
        {
            question: "Хто з українців отримував Золотий м'яч у 2004 році?",
            answers: ["Андрій Шевченко", "Олег Блохін", "Ігор Бєланов", "Сергій Ребров"],
            correct: 0
        },
        {
            question: "В якій країні відбувся перший в історії Чемпіонат світу (1930)?",
            answers: ["Франція", "Англія", "Уругвай", "Бразилія"],
            correct: 2
        },
        {
            question: "Який стадіон є домашньою ареною збірної України?",
            answers: ["Донбас Арена", "НСК Олімпійський", "Арена Львів", "Металіст"],
            correct: 1
        },
        {
            question: "Скільки гравців однієї команди одночасно перебувають на полі?",
            answers: ["10", "12", "11", "9"],
            correct: 2
        },
        {
            question: "Хто став чемпіоном Європи у 2024 році?",
            answers: ["Англія", "Франція", "Іспанія", "Італія"],
            correct: 2
        },
        {
            question: "Яке прізвисько має клуб 'Ліверпуль'?",
            answers: ["Червоні", "Вершкові", "Сині", "Каноніри"],
            correct: 0
        },
        {
            question: "Який футболіст забив 'Гол століття' та 'Руку Бога'?",
            answers: ["Пеле", "Дієго Марадона", "Йоган Кройф", "Роналдо"],
            correct: 1
        },
        {
            question: "Як називається порушення 'поза грою'?",
            answers: ["Фол", "Пенальті", "Офсайд", "Вкидання"],
            correct: 2
        },
        {
            question: "Який колір картки означає видалення з поля?",
            answers: ["Жовта", "Зелена", "Біла", "Червона"],
            correct: 3
        },
        {
            question: "За який клуб виступає Олександр Зінченко?",
            answers: ["Манчестер Сіті", "Аякс", "Арсенал", "Евертон"],
            correct: 1
        },
        {
            question: "Хто є найкращим бомбардиром у світі в офіційних матчах?",
            answers: ["Пеле", "Кріштіану Роналду", "Ліонель Мессі", "Роналдо"],
            correct: 1
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score-display');


    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedButton, selectedIndex) {
        clearInterval(interval);
        
        const correctIndex = questions[questionIndex].correct;
        const allButtons = document.querySelectorAll('.answer-btn');

        if (selectedIndex === correctIndex) {
            score++;
            scoreDisplay.innerText = `Бали: ${score}`;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('wrong');
            allButtons[correctIndex].classList.add('correct');
        }

        allButtons.forEach(btn => btn.disabled = true);
        setTimeout(nextQuestion, 1500);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(interval);
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    function startGame() {
        questions.sort(() => Math.random() - 0.5);
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
        
        if (scoreDisplay) scoreDisplay.innerText = `Бали`
    }

    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
               clearInterval(interval);
               nextQuestion();
            }
        }, 1000);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

});
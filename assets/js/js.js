// const variables maintain constant values, they can only be accessed within the block they were declared (cannot be updated or re-declared)
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-content"));
const max_questions = 10;
const startBtn = document.getElementById("startBtn");
const startingMinutes = 1.5;
const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// let is now preferred for variable declaration, can be updated within its scope but no re-declared within its scope
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let time = startingMinutes * 60;
var interval = null;

// quiz questions array
let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "H Trainer Marking Language",
    choice2: "Hyper Text Marketing Language",
    choice3: "Hyper Text Markup Language",
    choice4: "Home Text Markup Leveler",
    answer: 3,
  },
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question: "What tag is used to define an unordered list that is bulleted?",
    choice1: "<li>",
    choice2: "<u>",
    choice3: "<s>",
    choice4: "<ul>",
    answer: 4,
  },
  {
    question:
      "What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
    choice1: "<br></br>",
    choice2: "<body></body>",
    choice3: "<head></head>",
    choice4: "<title></title>",
    answer: 3,
  },
  {
    question:
      "What tag can be used to insert a line break or blank line in an HTML document?",
    choice1: "<title></title>",
    choice2: "<body></body>",
    choice3: "<head></head>",
    choice4: "<br></br>",
    answer: 4,
  },
  {
    question:
      "What tag is used to define a hyperlink, or link to another page?",
    choice1: "<strong></strong>",
    choice2: "<em></em>",
    choice3: "<blockquote></blockquote>",
    choice4: "<a></a>",
    answer: 3,
  },
  {
    question: "Where is the JavaScript placed inside an HTML document or page?",
    choice1: "In the <meta> section",
    choice2: "In the <footer> section",
    choice3: "In the <body> and <head> sections",
    choice4: "In the <title> section",
    answer: 1,
  },
  {
    question:
      "What property is used to set the horizontal alignment of text or words on a page?",
    choice1: "Horizontal-align",
    choice2: "Spacing",
    choice3: "Text-align",
    choice4: "Placement",
    answer: 3,
  },
  {
    question:
      "Every HTML page must include a reference to the external file sheet file inside the ..... element",
    choice1: "<div></div>",
    choice2: "Link",
    choice3: "Body",
    choice4: "Footer",
    answer: 2,
  },
  {
    question:
      "What is the CSS property that sets the size of the whitespace outside the borders of the content?",
    choice1: "Spacer",
    choice2: "Margin",
    choice3: "Block-level",
    choice4: "Line",
    answer: 2,
  },
];

// when start quiz button is clicked, show questions that were hidden on game id
startBtn.addEventListener("click", function (event) {
  document.getElementById("game").style.display = "block";
});

// timer countdown and starter when startBtn is clicked
const countdownEl = document.getElementById("countDown");
startBtn.addEventListener("click", () => {
  interval = setInterval(updateCountdown, 1000);
});

// after startBtn is clicked it goes away
startBtn.addEventListener("click", ()=> {
  startBtn.style.display = 'none';
})

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdownEl.innerHTML = minutes + ":" + seconds;
  time--;
  time = time < 0 ? 0 : time;
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= max_questions) {
    window.alert(
      "Game is over! You will be redirected to our High Scores page!"
    );
    return window.location.assign("./highscore.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer == currentQuestion.answer);

    getNewQuestion();
  });
});

startGame();

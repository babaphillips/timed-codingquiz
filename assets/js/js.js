var question = document.getElementById("question");
var choices = document.querySelectorAll(".choice-content");
var score_points = 10;
var scoreText = document.querySelector("#score");
var startBtn = document.getElementById("startBtn");
var acceptingAnswers = true;
var score = 0;
var time = 90;
var interval;

var questions = [
  {
    question: "What does HTML stand for?",
    choice1: "H Trainer Marking Language",
    choice2: "Hyper Text Marketing Language",
    choice3: "Hyper Text Markup Language",
    choice4: "Home Text Markup Leveler",
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer:  "<script>"
  },
  {
    question: "What tag is used to define an unordered list that is bulleted?",
    choice1: "<li>",
    choice2: "<u>",
    choice3: "<s>",
    choice4: "<ul>",
    answer: "<ul>",
  },
  {
    question:
      "What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
    choice1: "<br></br>",
    choice2: "<body></body>",
    choice3: "<head></head>",
    choice4: "<title></title>",
    answer:  "<head></head>",
  },
  {
    question:
      "What tag can be used to insert a line break or blank line in an HTML document?",
    choice1: "<title></title>",
    choice2: "<body></body>",
    choice3: "<head></head>",
    choice4: "<br/>",
    answer:"<br/>",
  },
  {
    question:
      "What tag is used to define a hyperlink, or link to another page?",
    choice1: "<strong></strong>",
    choice2: "<em></em>",
    choice3: "<blockquote></blockquote>",
    choice4: "<a></a>",
    answer: "<blockquote></blockquote>",
  },
  {
    question: "Where is the JavaScript placed inside an HTML document or page?",
    choice1: "In the <meta> section",
    choice2: "In the <footer> section",
    choice3: "In the <body> and <head> sections",
    choice4: "In the <title> section",
    answer: "In the <meta> section",
  },
  {
    question:
      "What property is used to set the horizontal alignment of text or words on a page?",
    choice1: "Horizontal-align",
    choice2: "Spacing",
    choice3: "Text-align",
    choice4: "Placement",
    answer:  "Text-align",
  },
  {
    question:
      "Every HTML page must include a reference to the external file sheet file inside the ..... element",
    choice1: "<div></div>",
    choice2: "Link",
    choice3: "Body",
    choice4: "Footer",
    answer: "Link",
  },
  {
    question:
      "What is the CSS property that sets the size of the whitespace outside the borders of the content?",
    choice1: "Spacer",
    choice2: "Margin",
    choice3: "Block-level",
    choice4: "Line",
    answer: "Margin",
  },
];
var questionIndex = 0;

// timer countdown and starter when startBtn is clicked
var countdownEl = document.getElementById("countDown");

function start() {
  interval = setInterval(updateCountdown, 1000);

  startBtn.style.display = "none";
  document.getElementById("game").style.display = "block";
  getNewQuestion();
}

// timer function on page
function updateCountdown() {
  time--;
  countdownEl.textContent = time;

  // if timer goes to 0 run quizEnd function
  if (time <= 0) {
    quizEnd();
  }
}
// get new question function, if no more questions available redirect to high score page
function getNewQuestion() {
  var currentQuestion = questions[questionIndex];

  question.textContent = currentQuestion.question;

  // availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
    choice.setAttribute("value", currentQuestion["choice" + number]);

    choice.onclick = checkAnswer;

  });
}

function checkAnswer(e) {
  var currentQuestion = questions[questionIndex];
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  var selectedChoice = e.target;

  var selectedAnswer = selectedChoice.getAttribute("value");
  console.log(selectedAnswer);
  console.log(currentQuestion.answer);

  var classToApply;

  if (selectedAnswer == currentQuestion.answer) {
    classToApply = "correct";
  } else {
    classToApply = "incorrect";
  }

  questionIndex++;
  // if correct answer is picked, 10 points will be added
  if (classToApply === "correct") {
    incrementScore(score_points);
  } else {
    // if incorrect answer is picked, -10 seconds on timer
    time -= 10;
    countdownEl.textContent = time;
  }

  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(function () {
    selectedChoice.parentElement.classList.remove(classToApply);
  }, 500);

 if (questions.length === questionIndex) {
    quizEnd();
  } else {
    getNewQuestion();
  }
}

// if select answer is correct, 10 points will be added to the score
function incrementScore(num) {
  score += num;
  scoreText.textContent = score;
}

// when quizEnd function runs, it will stop timer and show a window prompt before going to the high scores page
function quizEnd() {
  // stop timer
  clearInterval(interval);
  localStorage.setItem("mostRecentScore", score);
  window.alert("Time is over! You will be redirected to our High Scores page!");
  return window.location.assign("./highscore.html");
}

startBtn.addEventListener("click", start);

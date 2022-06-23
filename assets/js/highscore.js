var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var MAX_HIGH_SCORES = 10;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  var score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
 

  highScores.splice(10);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = 'scorespage.html';
};

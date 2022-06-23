var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.sort(function (a, b){
  return b.score - a.score;
});

highScores.forEach(function(score){
  var li = document.createElement('li');
  li.textContent = score.name + ' - ' + score.score;
  
  var highScoresList = document.querySelector("#highScoresList");
  highScoresList.append(li)
});

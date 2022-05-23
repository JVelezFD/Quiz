//setting variables to get and place high scores from local storage

const hiScoreList = document.getElementById("hiScoreList")
const hiScore = JSON.parse(localStorage.getItem("hiScore")) || [];

//creating li with score and initials
hiScoreList.innerHTML = hiScore
.map(score => {
    return `<li class="hiscore">${score.name} - ${score.score}</li>`;
}).join()


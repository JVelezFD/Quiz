const initials = document.getElementById("initials");
const saveScoreBtn= document.getElementById ("saveScoreBtn");
const latestScore =  localStorage.getItem("latestScore");
const finalScore =  document.getElementById ("finalScore");

const topFiveHiScore = 10;

//loading score from local storage 
finalScore.innerText = latestScore;


///setting up local storage array for high scores viewing
const hiScore = JSON.parse(localStorage.getItem("hiScore")) || [];
console.log(hiScore);
//input text
initials.addEventListener('keyup', () => {
    console.log(initials.value);
    saveScoreBtn.disabled = !initials.value;
})


//function to save high score
saveHiScore = e =>{
    console.log("Saved Score")
    e.preventDefault();

    const score = {
        score: latestScore,
        name: initials.value
    };
    hiScore.push(score);
    //setting ranking for highscore top 10
    hiScore.sort((a,b) =>b.score - a.score)
    //Keep only top 10 scores
    hiScore.splice(10);

    localStorage.setItem("hiScore", JSON.stringify(hiScore));
    window.location.assign("../../index.html")
    console.log(score);
};





console.log("script linked")

//setting variables to select where questions and multiple choice answers will go along with the button configurations
const qQuestion = document.getElementById("qquestion");
const multichoice = Array.from(document.getElementsByClassName("mchoice-text"));
var welcomeEL= document.getElementById ("welcome");
var startBtn = document.getElementById ("start");
const scoreTxt = document.getElementById("score");
const qCountTxt = document.getElementById ("qcount");
const quiz = document.getElementById("quiz")

//setting var for score, current question, userchoices, remaining questions from array,time for quiz
let cQuestion = {};
let score = 0;
let userChoice = true;
let aQuestions = [];
let questionsLeft = 0;
var timeStart = 60;
var secsElapsed = 0;
const timer = document.getElementById("timer")



//hiding/displaying elements

function hide(element) {
    Element.style.display = "none";
}

function show(){
    Element.style.display = "block";
}

/// tracking score and setting question limit per user attempt
const userMCorrect = 20;
const limitQuestions = 5;

// setting question array for the quiz
var questions = [
    {
        quiz: "What is the world's most popular programming Language?",
        choice1: "Java",
        choice2: "Python",
        choice3: "C++",
        choice4: "JavaScript",
        answer: 4
    },

    {
        quiz: "HTML defines the content of web pages, JavaScript does?",
        choice1: "Specify the layout of web pages",
        choice2: "Program the behavior of web pages",
        choice3: "All of the above",
        choice4: "None of the above",
        answer: 2
    },

    {
        quiz: "How do you get JavaScript?",
        choice1: "Download from the web",
        choice2: "Pay for user access",
        choice3: "Already installed on our browsers via computers, tablets, smartphones",
        choice4: "It's on available on iOS device (Apple devices)",
        answer: 3
    },

    {
        quiz: "Inside which HTML element do we put the JavaScript?",
        choice1: "<javascript>",
        choice2: "<js>",
        choice3: "<link>",
        choice4: "<script>",
        answer: 4
    },
    {
        quiz: "What is the correct JavaScript syntax to change the content of the HTML element Here => <p id='demo'> This is my demo.</p> ",
        choice1: "#demo.innerHTML = 'Content Changed!;'",
        choice2: "document.getElementbyId('demo').innerHTML = 'Content Changed!;'",
        choice3: "All of the above",
        choice4: "None of the above",
        answer: 2
    },

    {
        quiz: "Where is the correct place to insert a JavaScript",
        choice1: "The <link> section",
        choice2: "The <body> section",
        choice3: "The <head> section",
        choice4: "Both the <head> and <body> section are correct",
        answer: 4
    },

    {
        quiz: "How can you add a comment in a JavaScript",
        choice1: "//This is a comment",
        choice2: "<!--This is a comment-->",
        choice3: "!(This is a comment)",
        choice4: "All of the above",
        answer: 1
    },

    {
        quiz: "How do you write 'Hello World' in an alert box?",
        choice1: "msg('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "alert('Hello World');",
        choice4: "msgBox('Hello World');",
        answer: 3
    },

    {
        quiz: "How do you create a funtion in JavaScript?",
        choice1: "function myFunction( )",
        choice2: "function = myFunction( )",
        choice3: "function: myFunction",
        choice4: "All of the above",
        answer: 1
    },

    {
        quiz: "How do you call a function named 'myFunction' in JavaScript?",
        choice1: "call myFuntion( )",
        choice2: "myFunction ( )",
        choice3: "call funciton myFunction( )",
        choice4: "All of the above",
        answer: 2
    },




]


//starting the quiz and timer

function startTimer() {
    timer.textContent = timeStart;
    interval = setInterval(function () {
        secsElapsed++;
        timer.textContent = timeStart - secsElapsed;
        if (secsElapsed >= timeStart) {
            cQuestion = questions.length;
            getQuizQuestion();
        }
    }, 1000);
}

//stops timer
function stopTimer() {
    clearInterval(interval);
}



startQuiz = () => {
    startBtn.addEventListener("click", function(){
    welcomeEL.classList.add("hidden");
    quiz.classList.remove("hidden");
    startTimer();
    questionsLeft = 0;
    score = 0;
    aQuestions = [...questions];
    getQuizQuestion();
    console.log ("moving on")
})};

getQuizQuestion = () => {        
    if(aQuestions.length ===0 || questionsLeft >= limitQuestions || timeStart === 0){
      //saving score to local storage
      localStorage.setItem("latestScore", score);
      //need to end game if timeer finishes or goes over question limit
      return window.location.assign("./assets/html/endscreen.html");
    } 
    questionsLeft++;
    //displaying overlay question counter 
    qCountTxt.innerText = `${questionsLeft} / ${limitQuestions}`;

    const getQuestion = Math.floor(Math.random() * aQuestions.length);
    cQuestion = aQuestions[getQuestion];
    qQuestion.innerText = cQuestion.quiz;

    multichoice.forEach (choice => {
        const number = choice.dataset['number'];
        choice.innerText = cQuestion['choice'+ number];
    })

    aQuestions.splice(getQuestion, 1);

    userChoice = true;

};

multichoice.forEach(choice =>{
    choice.addEventListener("click", e => {
        if (!userChoice) return;

        userChoice = false;
        const sChoice = e.target;
        const sAnswer = sChoice.dataset['number'];
        
        //We are tracking the selected choices 
        const applyClassToAns =
            sAnswer == cQuestion.answer ? "correct" : "wrong" ;
        console.log (applyClassToAns);

        //track correct answers and add to score value deduct time for wrong ans
         if (applyClassToAns === "correct") {
             scoreUpdate(userMCorrect);
         }  else {secsElapsed += 10} 
        //feedback if selected answer was correct or wrong
        sChoice.parentElement.classList.add(applyClassToAns);

        setTimeout (() => {
            sChoice.parentElement.classList.remove(applyClassToAns);            
            getQuizQuestion();
        }, 1000);      

    });
})

    scoreUpdate = num => {
        score += num;
        scoreTxt.innerText = score;
    };


startQuiz();



// NOTES

/*

start with event listener when start quiz is clicked
this should start timer and questions

hiding and removing elements from the page

use word guessing game for help as it is similar - reuse some of the code

js files: 
    > questions (holds questions)
    > qlogic (holds all main code)
    > qscores (holds high scores)

*/

// ---------------------------------------------------------------------------------------

// PSEUDOCODE
// ----------

// Objective - timed coding quiz with multiple-choice questions, that store high scores

// 5 quiz questions in questions.js file

// separate page containing high scores
// link in top left
// lists all highscores
// 1. AB - 22 points
// buttons > go back, clear highscores
// go back button takes user to start of quiz
// clear highscores button - clear localstorage

// 75 second timer
// game over when reaches 0 and user hasn't finished

// Start quiz button
// on click, start timer and take user to first question
// lists question
// lists answers as buttons
// hover effect on button
// clicking answer goes to next question
// if wrong answer -10 secs, update score, go to next question
// if right answer update score, go to next question
// display 'correct' or 'wrong' below options on following question

// if user answers all questions within time limit: 
/* All Done!
   Your final score is xx
   Enter initials: [box] [submit button]
        > on submit, go to highscore page */
// store users score

// if user does not answer all questions within time limit: 
// Game over
// Buttons - retry and View highscores

// --------------------------------------------------------------------------



// DEFINE VARIABLES

var timerElement = document.querySelector("#time");
var startScreen = document.getElementById("start-screen");
var startButton = document.querySelector("#start");
var questionScreen = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices"); // do I target the id or class?
var endScreen = document.querySelector("#end-screen");
var feedbackMsg = document.querySelector("#feedback");
var wrapper = document.querySelector(".wrapper");

var currentQuestion = 0;
var userScore = 0;
var userAnswer = "";
var isWin = false;
var timer;
var timerCount;

// array for highscores to go into
var highscoreRecords = [];


// MAIN GAME FUNCTIONS

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 75;
    startTimer();

    // hide start screen
    startScreen.classList.add("hide");

    // show questions screen
    questionScreen.classList.remove("hide");

    // start questions
    startQuestions();
}


// The winGame function is called when the win condition is met
function winGame() {
    // startTitle.textContent = "YOU WON!!!";
    // setWins() //set localstore function
    console.log("you win") // temporary to see if working
}


// The loseGame function is called when timer reaches 0
function loseGame() {
    
    // hide content and display game over message
    startScreen.style.display = "none";
    var gameOver = document.createElement("h1");
    var retryButton = document.createElement("button");
    var highscoreButton = document.createElement("button");

    gameOver.textContent = "Game over - better luck next time!";
    retryButton.textContent = "Retry"; // needs to take user back to start
    highscoreButton.textContent = "View highscores"; // needs to take user to highscore page

    // fix styling on all of the above

    wrapper.appendChild(gameOver);
    gameOver.appendChild(retryButton);
    gameOver.appendChild(highscoreButton);
    
}


// timer (75 seconds)

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }



// QUESTIONS

function startQuestions() {
    
    // check win?
    // if (currentQuestion = quizQuestions.length && timer > 0) {
    //     winGame();
    // }

    // // question
    // questionTitle.innerHTML = quizQuestions[currentQuestion].question;

    // // options
    // choices.innerHTML = "";

    // for (var i = 0; i < quizQuestions.options.length; i++) {
    //     var choice = document.createElement("button");
    //     // choice.textContent = quizQuestions[currentQuestion].options[i];
    //     choice.onclick = userAnswer;
    //     choices.appendChild(choice);



    // question
    questionTitle.innerHTML = quizQuestions[currentQuestion].question;

    // choices
    var opt1 = document.querySelector("#opt1");
    var opt2 = document.querySelector("#opt2");
    var opt3 = document.querySelector("#opt3");
    var opt4 = document.querySelector("#opt4");

    opt1.textContent = "1. " + quizQuestions[currentQuestion].options[0];
    opt2.textContent = "2. " + quizQuestions[currentQuestion].options[1];
    opt3.textContent = "3. " + quizQuestions[currentQuestion].options[2];
    opt4.textContent = "4. " + quizQuestions[currentQuestion].options[3];

    var allOptions = ("#opt1", "#opt2", "#opt3", "#opt4");
    allOptions.onclick = selectedAnswer();

}

function displayMessage(type, message) {
  feedbackMsg.classList.remove("feedback-hide");
  feedbackMsg.textContent = message;
    feedbackMsg.setAttribute("class", type);
  }

// check if answer is correct
// function selectedAnswer() {

//     correctAnswer = quizQuestions[currentQuestion].answer;

//     if (correctAnswer === userAnswer)
//     {
//         displayMessage("Correct!");
//         userScore + 10;
        
//     } else {
//         userScore - 10;
//         timerCount - 10;
//         displayMessage("Wrong answer!")
//     }

//     currentQuestion++;
//     startQuestions();
// }

// Attach event listener to start button to call startGame function on click


// button event listeners
startButton.addEventListener("click", startGame);
// retryButton.addEventListener("click", startGame); not sure this is needed
// nextQuestion.addEventListener("click", ??) not sure this ones needed
// highscoreButton.addEventListener("click", ??) not sure this ones needed



// HIGHSCORES

// get highscores from local storage if there are any
localStorage.getItem(highscoreRecords); // do I need to stringify the records?
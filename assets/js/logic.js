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



// MY CODE

// define variables

var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questionsBlock = document.querySelector("#questions");
var choices = document.querySelector("#choices"); // do I target the id or class?

var startScreen = document.getElementById("start-screen");
var questionScreen = document.querySelector("#question");
var endScreen = document.querySelector("#end-screen");
var feedbackScreen = document.querySelector("#feedback");

var wrapper = document.querySelector(".wrapper");


var userScore = 0;
var userAnswer = "";
var isWin = false;
var timer;
var timerCount;


// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 5;
    startTimer();
    // startQuestions();
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
    var highscoresButton = document.createElement("button");

    gameOver.textContent = "Game over - better luck next time!";
    retryButton.textContent = "Retry"; // needs to take user back to start
    highscoresButton.textContent = "View highscores"; // needs to take user to highscore page

    // fix styling on all of the above

    wrapper.appendChild(gameOver);
    gameOver.appendChild(retryButton);
    gameOver.appendChild(highscoresButton);
    
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


// questions
/*
function startQuestions () {
    // question one

    // question two

    // question three

    // question four
}
*/

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);





/* CODE FROM WORD GAME: 


// The init function is called when the page loads 
function init() {
    getWins();
    getlosses();
  }
  
*/
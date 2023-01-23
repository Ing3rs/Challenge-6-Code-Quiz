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
// ----------------------------------------------------------------------

var timerElement = document.querySelector("#time");
var startScreen = document.getElementById("start-screen");
var startButton = document.querySelector("#start");
var questionScreen = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var feedbackScreen = document.querySelector("#feedback");
var wrapper = document.querySelector(".wrapper");

var currentQuestion = 0;
var userScore = 0;
var userAnswer = "";
var isWin = false;
var timer;
var timerCount;

// object for highscores to go into
var highscoreRecordsArray = [];

// get stored highscores
getStoredDetails();


// BASE GAME FUNCTIONS
// ----------------------------------------------------------------------

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 75;
  startTimer();

  // hide start screen
  startScreen.classList.add("hide");

  // show questions screen
  questionScreen.classList.remove("hide");

  // set user score to 0
  userScore = 0;

  // start questions
  startQuestions();
}


// The winGame function is called when the win condition is met
function winGame() {

  // hide start screen
  startScreen.classList.add("hide");

  // hide questions screen
  questionScreen.classList.add("hide");

  // show end screen
  endScreen.classList.remove("hide");

  // display score
  finalScore.textContent = userScore;

}


// The loseGame function is called when timer reaches 0
function loseGame() {

  // hide start screen
  startScreen.classList.add("hide");

  // hide questions screen
  questionScreen.classList.add("hide");

  // show feedback screen
  feedbackScreen.classList.remove("feedback-hide");

  var gameOver = document.createElement("h1");
  var retryButton = document.createElement("button");
  var highscoreButton = document.createElement("button");

  gameOver.textContent = "Game over - better luck next time!";
  retryButton.textContent = "Retry"; // needs to take user back to start
  highscoreButton.textContent = "View highscores"; // needs to take user to highscore page

  // fix styling on all of the above

  wrapper.appendChild(gameOver); // why doesn't feedbackScreen work?
  gameOver.appendChild(retryButton);
  gameOver.appendChild(highscoreButton);

}


// TIMER (75 seconds)

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
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



// MAIN GAME FUNCTIONS
// ----------------------------------------------------------------------

// construct questions
function startQuestions() {

  // check win
  if (currentQuestion == quizQuestions.length) {
    winGame()
    isWin = true;
    clearInterval(timer);

  } else {

    // question
    questionTitle.innerHTML = quizQuestions[currentQuestion].question;

    // choices
    var opt1 = document.querySelector("#opt1");
    var opt2 = document.querySelector("#opt2");
    var opt3 = document.querySelector("#opt3");
    var opt4 = document.querySelector("#opt4");

    opt1.textContent = quizQuestions[currentQuestion].options[0];
    opt2.textContent = quizQuestions[currentQuestion].options[1];
    opt3.textContent = quizQuestions[currentQuestion].options[2];
    opt4.textContent = quizQuestions[currentQuestion].options[3];

  }
}

// display message
function displayMessage(type, message) {
  var msgDiv = document.createElement("div");
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
  questionScreen.appendChild(msgDiv)

  // remove message after 2 seconds to stop messages stacking up  
  clearTimeout(messageTimeout);
  var messageTimeout = setTimeout(function () {
    msgDiv.classList.add("hide");
  }, 2000);

}


// Highscores button goes to score.html
function viewHighscores() {
  window.location.href = 'highscores.html';
};


// store user initials and score
function storeUserDetails() {
  localStorage.setItem("highscoreRecordsArray", JSON.stringify(highscoreRecordsArray));
}


// retrieve all user initials and scores
function getStoredDetails() {
  var storedHighscores = JSON.parse(localStorage.getItem("highscoreRecordsArray"));
  
  if (storedHighscores !== null) {
      highscoreRecordsArray = storedHighscores;
  }

}


// EVENT LISTENERS
// ----------------------------------------------------------------------

// start game on start button click
startButton.addEventListener("click", startGame);


// check if answer is correct
questionScreen.addEventListener("click", function (event) {

  userAnswer = event.target.textContent;
  var correctAnswer = quizQuestions[currentQuestion].answer;

  if (correctAnswer === userAnswer) {
    displayMessage("pass", "Correct answer!")
    userScore = userScore + 10; // not sure this is working correctly

  } else {
    displayMessage("fail", "Wrong answer!")
    userScore = userScore - 10;
    timerCount = timerCount - 10;
    timerElement.textContent = timerCount;
  }

  currentQuestion++;
  startQuestions();

});


// store highscore details
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // not sure I need this?

  var userInitials = document.querySelector("#initials").value;
  userScore = userScore;

  // if initials are blank, display message - THIS DOESN'T WORK
  if (initials === "") { 
    displayMessage("error", "Please enter your initials");
    return;

  }

  // push intials and score to array
  highscoreRecordsArray.push({
    "initials": userInitials,
    "score": userScore,
  });

  userInitials.value = ""; // don't think this works?
  userScore = 0;

  storeUserDetails()

  // open highscore page
  viewHighscores()

});

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

    // create elements to contain page contents
  var gameOverDiv = document.createElement("div");
  // var gamesOverTitle = document.createElement("h1");
  var gameOverGif = document.createElement("img");
  var gameOverText = document.createElement("p");
  var retryButton = document.createElement("button");
  var highscoreButton = document.createElement("button");

  // set element attributes (styling etc.)
  gameOverDiv.setAttribute("style", "text-align: center");
  gameOverGif.setAttribute("src", "assets/images/game-over-gif.gif");
  gameOverGif.setAttribute("style", "margin: 25px;");

  // game over text
  gameOverText.textContent = "Better luck next time!";
  retryButton.textContent = "Retry";
  highscoreButton.textContent = "View highscores";

  // retry button restarts the quiz
  retryButton.addEventListener("click", function (event) {
    // hide game over screen and restart game
    gameOverDiv.classList.add("hide");
    startGame();
  });

  // highscore button opens highscores page
  highscoreButton.addEventListener("click", viewHighscores);

  // append all elements to main wrapper and div
  wrapper.appendChild(gameOverDiv);
  gameOverDiv.appendChild(gameOverGif)
  gameOverDiv.appendChild(gameOverText)
  gameOverDiv.appendChild(retryButton);
  gameOverDiv.appendChild(highscoreButton);

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

    // choice content
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

    // +10 points for correct answer
    displayMessage("pass", "Correct answer!")
    userScore = userScore + 10;

  } else {

    // add 0 points and -10 seconds from timer if incorrect answer
    displayMessage("fail", "Wrong answer!")
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

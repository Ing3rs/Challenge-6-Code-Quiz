// DEFINE VARIABLES
// ----------------------------------------------------------------------

var leaderboardArea = document.querySelector("#highscores");
var leaderboardTitle = document.querySelectorAll("h1");
var clearScoresButtton = document.querySelector("#clear");

var highscorers = [];

// get stored highscores
getStoredDetails()

// render leaderboard to display stored highscores
renderLeaderboard()


// FUNCTIONS
// ----------------------------------------------------------------------

// retrieve all user initials and scores
function getStoredDetails() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscoreRecordsArray"));
    
    if (storedHighscores !== null) {
        highscorers = storedHighscores;
    }

  }


// display current highscorers
function renderLeaderboard() {
    leaderboardArea.innerHTML = "";

    // render new li for each highscore
    for (var i = 0; i < highscorers.length; i++) {
        var initials = highscorers[i].initials;
        var score = highscorers[i].score;

        var li = document.createElement("li");
        li.textContent = initials + ", " + score;
        li.setAttribute("data-index", i);

        leaderboardArea.appendChild(li);
    }
}


// EVENT LISTENERS
// ----------------------------------------------------------------------

// clear highscore leaderboard
clearScoresButtton.addEventListener("click", function (event) {
    highscorers = [];
    leaderboardArea.innerHTML = "";
    localStorage.removeItem("highscoreRecordsArray");
});

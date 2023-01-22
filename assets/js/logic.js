// NOTES

/*

start with event listener when start quiz is clicked
this should start timer and questions

hiding and removing elements from the page

use word guessing game for help as it is similar - reuse some of the code

*/


// OBJECTIVES
// ----------

// Objective - timed coding quiz with multiple-choice questions, that store high scores

/* It must have: 

> a start button - when clicked it starts a timer and the first question appears

> timer top right counts down from 75

> questions have buttons for answers
    > if incorrect: subtract time from clock, update score
    > if correct: go to next question, update score

> quiz ends when all questions are answered or timer reaches zero
    > when game ends: 
        > display high scrore
        > give user the ability to save their initials and score

> 'View Highscores' links to separate high scores page which updates

> Option to clear high scores

> js files: 
    > questions (holds questions)
    > qlogic (holds all main code)
    > qscores (holds high scores)

*/


// PSEUDOCODE
// ----------

// 5 quiz questions

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
    // on click, start timer
    // lists question
    // lists answers as buttons
        // hover effect on button
        // clicking answer goes to next button
        // if wrong answer -10 secs
        // display 'correct' or 'wrong' below options on following question

// if user answers all questions within time limit: 
    /* All Done!
       Your final score is xx
       Enter initials: [box] [submit button]
            > on submit, go to highscore page */
    // store users score

    
// MY CODE


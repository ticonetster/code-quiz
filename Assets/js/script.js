const quiz = [
  //Question 1
  {
    "Question": "Commonly used data types DO NOT include:",
    "Answers": ["strings", "booleans", "alerts", "numbers"],
    "Correct": "alerts",
    "Passed": false
  },
  //Question 2
  {
    "Question": "The condition in an if/else statement is enclosed within ____.",
    "Answers": ["quotes", "curly brackets", "parentheses", "square brackets"],
    "Correct": "parentheses",
    "Passed": false
  },
  //Question 3
  {
    "Question": "Arrays in JavaScript can be used to store ____.",
    "Answers": ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "Correct": "all of the above",
    "Passed": false
  },
  //Question 4
  {
    "Question": "String values must be enclosed within ____ when being assigned to variables.",
    "Answers": ["commas", "curly brackets", "quotes", "parentheses"],
    "Correct": "all of the above",
    "Passed": false
  },
  //Question 5
  {
    "Question": "A very useful tool used during development and debugging for printing content to the debugger is:",
    "Answers": ["JavaScript", "terminal/bash", "for loops", "console log"],
    "Correct": "console log",
    "Passed": false
  },
];

//Count the number of Questions
var numQ = quiz.length;
//Keep score
var score = 0;

// Get html elements
var startBtn = document.querySelector("#start");
var questionEl = document.querySelector(".question");
var optionsEl = document.querySelector("#options");
var navigationEl = document.querySelector(".navigation");
var correct_wrong = document.querySelector(".correct_wrong");
//show first question
var currentQIndex = 0;

function renderPage() {
  //loop thru Questions
  if(currentQIndex < numQ){
    //Set question Obj
    var currentQ = Object.entries(quiz[currentQIndex]);
    //Clear page for next question
    questionEl.innerHTML = "";
    optionsEl.innerHTML = "";
    navigationEl.innerHTML = "";
    correct_wrong.innerHTML = "";
    //Show questionObject = currentQ
    questionEl.textContent = currentQ[0][1];
    //Show answers
    var ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'answerList');
    for (let i = 0; i < currentQ[1][1].length; i++) {
      var num = i+1;
      var optionText = currentQ[1][1][i];
      //create li element
      var liEl = document.createElement("li");
      //give li a class
      liEl.setAttribute('class', 'option');
      //create a element for li formatting
      var aEl = document.createElement("a");
      //add the a element to the li element
      liEl.appendChild(aEl);
      //Add the text to the a element
      aEl.innerHTML = num + "." + optionText;
      //Add an id=[the option] to each a element 
      aEl.setAttribute('id', optionText);
      //Add the li elements to the ul
      ulEl.appendChild(liEl);
    }
    optionsEl.appendChild(ulEl);
    //Add Next button
    var next = document.createElement("button");
    next.innerHTML = "Next >";
    navigationEl.appendChild(next);
    //Add li listener
    document.getElementById("answerList").addEventListener("click", function(event){
      //make sure they click an li
      if(event.target && event.target.matches("li.option a")){
        //compare answers
        var userClicked = event.target.id;
        var correctAnswer = currentQ[2][1];
        if(userClicked === correctAnswer){
          //correct answer do stuff
          document.getElementById(userClicked).style.background = "green";
          document.getElementById(userClicked).style.animation = "right 1s infinite";
          correct_wrong.textContent = "You got it!";
          currentQ[3][1] = true;
          score = score + 10;
        //Wrong answer do other stuff
        }else{
          document.getElementById(userClicked).style.background = "red";
          document.getElementById(userClicked).style.animation = "wrong 1s infinite";
          correct_wrong.textContent = "You suck!";
        }
      }
    }, {once : true}); //End of li Listener
    //Next question button Listener
    next.addEventListener('click', event => {
      currentQIndex = currentQIndex + 1;
      renderPage();
    }, {once : true});
  }else{

    //Show form initials with submit button, send score
    questionEl.innerHTML = "All done!";
    optionsEl.innerHTML = "You final score is: " + score;
    navigationEl.innerHTML = "";
    correct_wrong.innerHTML = "";
  }
} 


// Add event listener to Start Quiz button
startBtn.addEventListener("click", renderPage);
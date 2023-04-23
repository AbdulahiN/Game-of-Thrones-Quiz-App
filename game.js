const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions =
     [
        {
          question: "Who Killed the Night King?",
          choice1: "Tyrion Lannister",
          choice2: "Arya Stark",
          choice3: "Ned Stark",
          choice4: "Jon Snow",
          answer: 2
        },
        {
          question:
            "Who are Eddard Stark's siblings?",
          choice1: "Rickard, Brandon, Jon",
          choice2: "Brandon, Benjen, Lyanna",
          choice3: "Benjen, Lyanna, Rickon",
          choice4: "Robert, Brandon, Rickard",
          answer: 2
        },
        {
          question: " Where did Lyanna die?",
          choice1: " The Tower of Joy",
          choice2: "Winterfell",
          choice3: "Summerhall",
          choice4: "Dragon Stone",
          answer: 1
        },
        {
          question: "Who was responsible for the death of King Joffrey?",
          choice1: "Tyrion Lannister",
          choice2: "Olenna Tyrell",
          choice3: "Sansa Stark",
          choice4: "Littlefinger",
          answer: 2
        },
        {
          question: "What is the name of Jon Snow's direwolf?",
          choice1: "Summer",
          choice2: "Nymeria",
          choice3: "Ghost",
          choice4: "Grey Wind",
          answer: 3
        },
        {
          question: "Who said 'Chaos isn't a pit. Chaos is a ladder.'?",
          choice1: "Jaime Lannister",
          choice2: "Petyr Baelish",
          choice3: "Tyrion Lannister",
          choice4: "Varys",
          answer: 2
        },
        {
          question: "What is the name of Arya Stark's sword?",
          choice1: "Longclaw",
          choice2: "Needle",
          choice3: "Ice",
          choice4: "Oathkeeper",
          answer: 2
        },
        {
          question: "Who killed Tywin Lannister?",
          choice1: "Tyrion Lannister",
          choice2: "Jaime Lannister",
          choice3: "Cersei Lannister",
          choice4: "Varys",
          answer: 1
        },
        {
          question: "What is the name of Daenerys Targaryen's dragon that was killed by the Night King?",
          choice1: "Drogon",
          choice2: "Viserion",
          choice3: "Rhaegal",
          choice4: "Balerion",
          answer: 2
        },
        {
          question: "What was Hodor's real name?",
          choice1: "Hold the door",
          choice2: "Wylis",
          choice3: "Horys",
          choice4: "Hodin",
          answer: 2
        },
        {
          question: "Who gave Arya Stark the Valyrian steel dagger that she used to kill the Night King?",
          choice1: "Jaime Lannister",
          choice2: "Bran Stark",
          choice3: "Littlefinger",
          choice4: "Cersei Lannister",
          answer: 2
        },
        {
          question: "What is the name of the leader of the White Walkers?",
          choice1: "The Night King",
          choice2: "The Night's Watch",
          choice3: "The Ice King",
          choice4: "The Lord of Light",
          answer: 1
        }
      ]
      
    
    
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 12;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
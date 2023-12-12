class Question {
  constructor(title, answers, correctAnswer) {
    this.title = title;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
  isCorrect(answer) {
    return this.correctAnswer === answer;
  }
}

const questions = [
  new Question("Quelle méthode Javascript permet de filtrer les éléments d'un tableau", ["indexOf()", "map()", "filter()", "reduce()"], "filter()"),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestion = 0;
  }

  handleButtonClick = function (button) {
    if (this.questions[this.currentQuestion].isCorrect(button.innerText)) {
      console.log("yeah!");
      this.score++;
    }
    if (this.currentQuestion + 1 < this.questions.length) {
      this.currentQuestion++;
      this.questionsDisplay();
      console.log(this.score);
    } else {
      this.resultsDisplay();
    }
  };

  questionsDisplay = function () {
    document.getElementById("question").innerHTML = this.questions[this.currentQuestion].title;
    for (var i = 0; i < this.questions[this.currentQuestion].answers.length; i++) {
      document.getElementById(`choice${i}`).textContent = this.questions[this.currentQuestion].answers[i];
    }
    document.getElementById("progress").textContent = this.currentQuestion + 1 + "/" + this.questions.length;
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.onclick = () => this.handleButtonClick(button);
    });
  };

  resultsDisplay = function () {
    document.getElementById("progress").textContent = "";
    document.querySelector(".choices").style.display = "none";
    document.getElementById("question").innerHTML = "Fin du quiz";
    document.getElementById("score").innerHTML = `Vous avez ${this.score} points!`;
  };
}

window.onload = () => {
  let quiz = new Quiz(questions);
  quiz.questionsDisplay();
};

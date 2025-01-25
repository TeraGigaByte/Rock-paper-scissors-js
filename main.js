// DOM
const playerWinsElement = document.getElementById("playerWins");
const computerWinsElement = document.getElementById("computerWins");
const drawEl = document.getElementById("draw");
const waitingEl = document.getElementById("waiting");
const choiceEl = document.getElementById("choice");
const textEl = document.getElementById("text");
const computerChoiceEl = document.getElementById("computerChoice");
const choicePEl = document.getElementById("choicePlayer");
const PlayerChoiceEl = document.getElementById("playerChoice");
const resultText = document.getElementById("textOfResult");
const thinkingEl = document.getElementById("thinking");
// QuerySelector
const gameButtonsContainer = document.querySelector(".gameButtons");
const buttons = document.querySelectorAll(".gameButtons button");
const resetBtn = document.querySelector("#reset");
const playerAvatars = document.querySelectorAll(".playerAvatar");
// DOM-----

// Глобальные переменные
let playerChoice;
let ComputerChoice;

let PlayerWins = 0;
let ComputerWins = 0;
let Draw = 0;

// Игровые определения и правила
variants = ["rock", "paper", "scissors"];
variantsUI = { rock: "🗿", paper: "📃", scissors: "✂️" };

const rules = {
  rock: {
    rock: "Ничья",
    paper: "Вы победили",
    scissors: "Компьютер победил",
  },
  paper: {
    rock: "Компьютер победил",
    paper: "Ничья",
    scissors: "Вы победили",
  },
  scissors: {
    rock: "Вы победили",
    paper: "Компьютер победил",
    scissors: "Ничья",
  },
};

const avatar = {
  cool: "😎",
  happy: "😁",
  neutral: "😀",
  ohh: "😓",
  sad: "😱",
};

//Кнопка перезапуска
resetBtn.addEventListener("click", (event) => {
  PlayerWins = 0;
  ComputerWins = 0;
  Draw = 0;
  updateResults();
  showWaiting();
  updateAvatar();
  console.log("refresh...");
});

//Процесс игры

updateResults(); // Выводим для красоты текущие значения(0 по каждой вместо пустоты)

// Проходимся по каждому элементу
buttons.forEach((button) => {
  // Добавляем обработчик клика
  button.addEventListener("click", (event) => {
    if (button.classList.contains("disabled")) return;

    playerChoice = event.target.id; // event.target указывает на элемент, на который был клик
    console.log("player:", playerChoice);

    showPlayer();

    disableButtons();
    showThinking();

    const delay = Math.floor(Math.random() * 501) + 1000;
    console.log("Думал:", delay);

    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * 3);

      ComputerChoice = variants[randomNum];
      console.log("computer:", ComputerChoice);

      showComputer();

      //определяем победителя
      const result = rules[ComputerChoice][playerChoice];
      console.log(result);

      textEl.hidden = false;
      resultText.textContent = result;
      resultText.classList.remove("win", "lose", "draw");

      if (result === "Вы победили") {
        ++PlayerWins;
        playerWinsElement.textContent = PlayerWins;
        resultText.classList.add("win");
      } else if (result === "Компьютер победил") {
        ++ComputerWins;
        computerWinsElement.textContent = ComputerWins;
        resultText.classList.add("lose");
      } else {
        ++Draw;
        drawEl.textContent = Draw;
        resultText.classList.add("draw");
      }
      enableButtons();
      updateAvatar();
    }, delay);
  });
});

//Процесс игры заканчивается

// Функции
function showPlayer() {
  waitingEl.hidden = true;
  choicePEl.hidden = false;
  thinkingEl.hidden = true;
  PlayerChoiceEl.textContent = variantsUI[playerChoice];
}

function showComputer() {
  waitingEl.hidden = true;
  choiceEl.hidden = false;
  thinkingEl.hidden = true;
  computerChoiceEl.textContent = variantsUI[ComputerChoice];
}

function showWaiting() {
  waitingEl.hidden = false;
  choiceEl.hidden = true;
  choicePEl.hidden = true;
  textEl.hidden = true;
  thinkingEl.hidden = true;
}

function showThinking() {
  thinkingEl.hidden = false;
  waitingEl.hidden = true;
  choiceEl.hidden = true;
  textEl.hidden = true;
}

function updateResults() {
  playerWinsElement.textContent = PlayerWins;
  computerWinsElement.textContent = ComputerWins;
  drawEl.textContent = Draw;
}

function disableButtons() {
  buttons.forEach((button) => {
    button.classList.add("disabled"); // Добавляем класс
  });
}

function enableButtons() {
  buttons.forEach((button) => {
    button.classList.remove("disabled");
  });
}

function updateAvatar() {
  const difference = PlayerWins - ComputerWins;

  let avatarToSet;
  if (difference >= 5) {
    avatarToSet = avatar.cool; // Большая победа
  } else if (difference >= 2) {
    avatarToSet = avatar.happy; // Победа
  } else if (difference <= -5) {
    avatarToSet = avatar.sad; // Серьёзное поражение
  } else if (difference <= -2) {
    avatarToSet = avatar.ohh; // Поражение
  } else {
    avatarToSet = avatar.neutral; // Ничья или близкий счёт
  }

  playerAvatars.forEach((avatarEl) => {
    avatarEl.textContent = avatarToSet;
  });
}

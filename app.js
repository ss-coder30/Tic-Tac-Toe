let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#resetBtn");
let newButton = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let countTurns = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnX ? "X" : "O";
      turnX = !turnX;
      countTurns++;
      box.disabled = true;
      checkWinner();
    }
  });
});

function newButtonFunc() {
  turnX = true;
  countTurns = 0;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
}

function disableBoxes() {
  boxes.forEach((box) => (box.disabled = true));
}

function showWinner(winner) {
  msg.innerText = `Congratulations, Winner is ${winner} !!!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function showDraw() {
  msg.innerText = "Tough Game! It's a draw.";
  msgContainer.classList.remove("hide");
}

function checkWinner() {
  let winnerFound = false;

  // Check for a winner
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (
      pos1Value !== "" &&
      pos1Value === pos2Value &&
      pos2Value === pos3Value
    ) {
      showWinner(pos1Value);
      winnerFound = true;
      break;
    }
  }

  // If no winner and all boxes are filled, it's a draw
  if (!winnerFound && countTurns === 9) {
    showDraw();
  }
}

newButton.addEventListener("click", newButtonFunc);

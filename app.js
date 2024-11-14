let gameSequence = [];
let userSequence = [];
let highestScore = [];
let h2 = document.querySelector("h2");

let colors = ["yellow", "red", "green", "blue"];
let gameStarted = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (gameStarted == false) {
    gameStarted = true;
  }
  levelUp();
});

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = colors[randIdx];
  gameSequence.push(randColor);
  let randBtn = document.querySelector(`.${randColor}`);
  colorFlash(randBtn);
}

function colorFlash(Btn) {
  Btn.classList.add("flash");
  setTimeout(function () {
    Btn.classList.remove("flash");
  }, 250);
}

function UserBtnPress() {
  let btn = this; // complete div element
  colorFlash(btn);
  userColor = btn.getAttribute("id");
  userSequence.push(userColor);

  checkColorSeq(userSequence.length - 1);
}

function checkColorSeq(idx) {
  // curr level will be the size of the userSeq and gameSeq
  if (userSequence[idx] === gameSequence[idx]) {
    // nextlevel
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    h2.innerHTML = "Game Over! Press any key to start";
    h2.style.color = "red";

    document.addEventListener("keypress", () => {
      h2.style.color = "";
    });

    let score = document.createElement("p");
    score.innerHTML = `Your score was <b>${level}</b>`;
    score.style.color = "black";
    highestScore.push(level);

    let maxScore = document.createElement("p");
    maxScore.style.color = "black";
    maxScore.innerText =
      "Your Highest score : " +
      highestScore.reduce((max, el) => {
        if (max < el) {
          return el;
        } else {
          return max;
        }
      });

    h2.append(score);
    h2.append(maxScore);

    reset();
  }
}

let allBtns = document.querySelectorAll(".button");
for (btn of allBtns) {
  btn.addEventListener("click", UserBtnPress);
}

function reset() {
  gameStarted = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}

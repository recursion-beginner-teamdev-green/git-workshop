import { PlayArea, tetrisBlock } from "./model.js";
import { getTopScore, isTopscore, setTopscore } from "./score_localstorage.js";
import {
  addColorOfTetrisBlock,
  addScore,
  clearColorOfTetrisBlock,
  updateNextBlockArea,
  updatePlayArea,
} from "./view.js";

//dom要素はここで宣言？
const config = {
  startBtn: document.getElementById("start-button"),
  // pauseBtn: document.getElementById("pause-button"),
  score : document.getElementById("score"),
};

let playArea = new PlayArea();

updatePlayArea(playArea)

const resetPlayArea = () => {
  playArea = new PlayArea();
  updatePlayArea(playArea);
  // updateNextBlockArea();
};

// ブロックを開始位置に生成する関数
const generateBlock = () => {
  console.log("generate");
  playArea.generatetetrisBlockAtInitialPosition();
  if (playArea.isGameOn) addColorOfTetrisBlock(playArea.currenttetrisBlock);
};

// ブロックが下についた時点でスコア換算
const evaluateScore = () => {
  const score = playArea.calculateScore();
  addScore(score);
};

// game over時の関数
const gameOver = () => {
  const score = parseInt(config.score.innerHTML);
  const topScoreEle = document.getElementById("topScore");
  if (isTopscore(score)) {
    setTopscore(score);
    topScoreEle.innerHTML = score;
    alert(`Game over! Your score was ${score}. It was top score ever.`)
  }
  else {
    alert(`Game over! Your score was ${score}`);
  }
  config.score.innerHTML = "0"
  resetPlayArea()
};

// 一連のゲームサイクル
const gameCycle = () => {
  if (!playArea.isGameOn) gameOver();
  else {
    generateBlock();
    const interValId = setInterval(() => {
      if (playArea.isCurrentBlockMovableToBottom()) {
        clearColorOfTetrisBlock(playArea.currenttetrisBlock);
        playArea.moveCurrentBlockBottom();
        addColorOfTetrisBlock(playArea.currenttetrisBlock);
      } else {
        clearInterval(interValId);
        evaluateScore();
        updatePlayArea(playArea);
        gameCycle();
      }
    }, 1000);
  }
};

// 受け取ったkeyによって,その方向にブロックを動かす関数。動けない場合は動かない
const moveBlock = (key) => {
  if (key === "ArrowRight" && playArea.isCurrentBlockMovableToRight()) {
    console.log("right");
    clearColorOfTetrisBlock(playArea.currenttetrisBlock);
    playArea.moveCurrentBlockRight();
    addColorOfTetrisBlock(playArea.currenttetrisBlock);
  }
  if (key === "ArrowLeft" && playArea.isCurrentBlockMovableToLeft()) {
    console.log("left");
    clearColorOfTetrisBlock(playArea.currenttetrisBlock);
    playArea.moveCurrentBlockLeft();
    addColorOfTetrisBlock(playArea.currenttetrisBlock);
  }
  if (key === "ArrowDown" && playArea.isCurrentBlockMovableToBottom()) {
    clearColorOfTetrisBlock(playArea.currenttetrisBlock);
    playArea.moveCurrentBlockBottom();
    addColorOfTetrisBlock(playArea.currenttetrisBlock);
  }
};

config.startBtn.addEventListener("click", () => {
  if (playArea.isGameOn) return;
  else {
    playArea.setIsGameOn(true);
    gameCycle();
  }
});

document.addEventListener("keydown", (event) => {
  moveBlock(event.key);
});

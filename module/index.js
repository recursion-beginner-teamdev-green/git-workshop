import { PlayArea, tetrisBlock } from "./model.js";
import {
  addColorOfTetrisBlock,
  clearColorOfTetrisBlock,
  initializePlayArea,
} from "./view.js";

//dom要素はここで宣言？
const config = {
  playAreaPrintBtn: document.getElementById("playAreaPrint"),
  createtetrisBlockBtn: document.getElementById("createtetrisBlock"),
  startBtn: document.getElementById("start-button"),
  pauseBtn: document.getElementById("pause-button"),
};

let playArea = new PlayArea();

initializePlayArea(playArea);

// ブロックを開始位置に生成する関数
const generateBlock = () => {
  console.log("generate");
  playArea.generatetetrisBlockAtInitialPosition();
  if (playArea.isGameOn) addColorOfTetrisBlock(playArea.currenttetrisBlock);
};

// 継続的に新しいブロックを生成
const consistantlyGenerateNewBlock = () => {
  if(!playArea.isGameOn)alert("game over")
  else {
    generateBlock()
    const interValId = setInterval(() => {
      if (playArea.isCurrentBlockMovableToBottom()) {
        clearColorOfTetrisBlock(playArea.currenttetrisBlock);
        playArea.moveCurrentBlockBottom();
        addColorOfTetrisBlock(playArea.currenttetrisBlock);
      } else {
        clearInterval(interValId);
        consistantlyGenerateNewBlock()
      }
    }, 1000);
  }
}

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

// config.playAreaPrintBtn.addEventListener("click", () =>playArea.printPlayArea()
// );
// config.createtetrisBlockBtn.addEventListener("click", () => {
//   generateBlock()
// });

config.startBtn.addEventListener(
  "click",
  () => {
    consistantlyGenerateNewBlock()
    });

document.addEventListener("keydown", (event) => {
  moveBlock(event.key);
});

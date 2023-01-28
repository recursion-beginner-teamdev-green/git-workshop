import { PlayArea, TetorisBlock } from "./model.js";
import {
  addColorOfTetorisBlock,
  clearColorOfTetorisBlock,
  initializePlayArea,
} from "./view.js";

//dom要素はここで宣言？
const config = {
  playAreaPrintBtn: document.getElementById("playAreaPrint"),
  createTetorisBlockBtn: document.getElementById("createTetorisBlock"),
  startBtn: document.getElementById("start-button"),
  pauseBtn: document.getElementById("pause-button"),
};

let playArea = new PlayArea();

initializePlayArea(playArea);

// ブロックを開始位置に生成する関数
const generateBlock = () => {
  console.log("generate");
  playArea.generateTetorisBlockAtInitialPosition();
  if (playArea.isGameOn) addColorOfTetorisBlock(playArea.currentTetorisBlock);
};
// 受け取ったkeyによって,その方向にブロックを動かす関数。動けない場合は動かない
const moveBlock = (key) => {
  if (key === "ArrowRight" && playArea.isCurrentBlockMovableToRight()) {
    console.log("right");
    clearColorOfTetorisBlock(playArea.currentTetorisBlock);
    playArea.moveCurrentBlockRight();
    addColorOfTetorisBlock(playArea.currentTetorisBlock);
  }
  if (key === "ArrowLeft" && playArea.isCurrentBlockMovableToLeft()) {
    console.log("left");
    clearColorOfTetorisBlock(playArea.currentTetorisBlock);
    playArea.moveCurrentBlockLeft();
    addColorOfTetorisBlock(playArea.currentTetorisBlock);
  }
  if (key === "ArrowDown" && playArea.isCurrentBlockMovableToBottom()) {
    clearColorOfTetorisBlock(playArea.currentTetorisBlock);
    playArea.moveCurrentBlockBottom();
    addColorOfTetorisBlock(playArea.currentTetorisBlock);
  }
};

// config.playAreaPrintBtn.addEventListener("click", () =>playArea.printPlayArea()
// );
// config.createTetorisBlockBtn.addEventListener("click", () => {
//   generateBlock()
// });

config.startBtn.addEventListener("click", () => {
  while (playArea.isGameOn) {
    generateBlock();
    const interValId = setInterval(() => {
      if (playArea.isCurrentBlockMovableToBottom()) {
        clearColorOfTetorisBlock(playArea.currentTetorisBlock);
        playArea.moveCurrentBlockBottom();
        addColorOfTetorisBlock(playArea.currentTetorisBlock);
      } else {
        clearInterval(interValId);
      }
    }, 1000);
  }
});

document.addEventListener("keydown", (event) => {
  moveBlock(event.key);
});

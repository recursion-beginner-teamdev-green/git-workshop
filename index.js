import { PlayArea, TetorisBlock } from "./model.js";


//dom要素はここで宣言？
const testConfig = {
  playAreaPrintBtn: document.getElementById("playAreaPrint"),
  createTetorisBlockBtn: document.getElementById("createTetorisBlock"),
};

let playArea = new PlayArea();

testConfig.playAreaPrintBtn.addEventListener("click", () =>
  playArea.printPlayArea()
);
testConfig.createTetorisBlockBtn.addEventListener("click", () => {
  const block = new TetorisBlock("red");
  console.log(block);
  playArea.setTetorisBlock(block);
});

document.addEventListener("keydown", (event) => {
  let key = event.key;
  console.log(key);
});

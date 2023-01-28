//playAreaを受け取ってプレイエリアを生成
export function initializePlayArea(playArea) {
  let grid = document.getElementById("grid");
  for (let y = 0; y < playArea.height; y++) {
    for (let x = 0; x < playArea.width; x++) {
      let block = document.createElement("div");
      block.setAttribute("id", y + "," + x);
      block.setAttribute("color", "false");
      block.classList.add("block", "border", "empty");
      grid.append(block);
    }
  }
  let nextBlock = document.getElementById("next-block");
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let block = document.createElement("div");
      block.setAttribute("id", y + "," + x);
      block.classList.add("block", "border", "empty");
      nextBlock.append(block);
    }
  }
}

//   TetorisBlockを受け取って、そのTetorisBlockが含んでるMinBlockのdom上座標全ての色を変化させる関数
export const addColorOfTetorisBlock = (tetorisBlock) => {
  let block = tetorisBlock.block;
  for (let i = 0; i < block.length; i++) {
    addColorToMinBlock(block[i]);
  }
};
//   TetorisBlockを受け取って、そのTetorisBlockが含んでるMinBlockのdom上座標全ての色をemptyにする関数
export const clearColorOfTetorisBlock = (tetorisBlock) => {
  let block = tetorisBlock.block;
  for (let i = 0; i < block.length; i++) {
    clearMinBlock(block[i]);
  }
};

//minBlock dom要素に色をつける関数
const addColorToMinBlock = (minBlock) => {
  let positon = minBlock.y + "," + minBlock.x;
  let target = document.getElementById(positon);
  target.classList.remove("empty");
  target.classList.add(minBlock.color);
  target.setAttribute("color", "true");
};
//   minBlock dom要素をemptyにする関数
const clearMinBlock = (minBlock) => {
  let positon = minBlock.y + "," + minBlock.x;
  let target = document.getElementById(positon);
  target.classList.remove(minBlock.color);
  target.classList.add("empty");
  target.setAttribute("color", "false");
};

export function colorDown(y) {
  for (; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      let block = document.getElementById(y + "," + x);
      if (block.getAttribute("color") === "true") {
        let color = block.classList[block.classList.length - 1];
        block.classList.remove(color);
        block.classList.add("bg-light");
        block.setAttribute("color", "false");
        let downBlock = document.getElementById(y + 1 + "," + x);
        downBlock.classList.remove("bg-light");
        downBlock.classList.add(color);
        downBlock.setAttribute("color", "true");
      }
    }
  }
}

export function clearLine(y) {
  for (let x = 0; x < 10; x++) {
    let block = document.getElementById(y + "," + x);
    let color = block.classList[block.classList.length - 1];
    block.classList.remove(color);
    block.classList.add("bg-light");
    block.setAttribute("color", "false");
  }
  colorDown(--y);
}

export function isColorLine() {
  for (let y = 19; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      let block = document.getElementById(y + "," + x);
      if (block.getAttribute("color") === "false") break;
      if (x == 9) clearLine(y);
    }
  }
}

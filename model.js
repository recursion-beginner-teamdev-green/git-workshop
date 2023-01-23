export class PlayArea {
  width = 10;
  height = 20;

  constructor() {
    this.playArea = this.createPlayArea();
    //   現在の操作対象テトリスブロック
    this.currentTetorisBlock = null;
  }

  //playAreaを生成する関数
  createPlayArea() {
    let playArea = {};
    //水平方向の配列はwidth分だけemptyで埋めて作成。[empty,empty,empty,....,empty]
    for (let i = 0; i < this.height; i++)
      playArea[i] = Array(this.width).fill("empty");
    return playArea;
  }

  generateTetorisBlockAtInitialPosition() {
    //ランダムにテトリスブロックを生成
    let newTetorisBlock = TetorisBlock.generateRandomTetorisBlock();
    console.log(newTetorisBlock);
    this.setTetorisBlock(newTetorisBlock);
    this.setCurrentTetorisBlock(newTetorisBlock);
  }

  //TetorisBlockを受け取って、操作対象テトリスブロックをセットする関数
  setCurrentTetorisBlock(tetorisBlock) {
    this.currentTetorisBlock = tetorisBlock;
  }

  //MinBlockを受け取って、特定の座標の色を変化させる関数
  setMinBlock(minBlock) {
    this.playArea[minBlock.y][minBlock.x] = minBlock.color;
  }

  //TetorisBlockを受け取って、そのTetorisBlockが含んでるMinBlockの座標全ての色を変化させる関数
  setTetorisBlock(tetorisBlock) {
    let block = tetorisBlock.block;
    for (let i = 0; i < block.length; i++) {
      this.setMinBlock(block[i]);
    }
  }

  printPlayArea() {
    console.log(this.playArea);
    console.log(this.currentTetorisBlock)
  }
}

//blockの最小単位
export class MinBlock {
  //x軸座標,y軸座標をnumberで指定。colorはstring
  //x = 0~9, y= 0~19
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
//MinBlockを利用した一つ一つのテトリスブロック
const blockShapeConfig = {
  //MinBlock(x,y,color)
  red: [
    new MinBlock(5, 2, "red"),
    new MinBlock(4, 1, "red"),
    new MinBlock(5, 1, "red"),
    new MinBlock(4, 0, "red"),
  ],
  blue: [
    new MinBlock(4, 3, "blue"),
    new MinBlock(4, 2, "blue"),
    new MinBlock(4, 1, "blue"),
    new MinBlock(4, 0, "blue"),
  ],
  green: [
    new MinBlock(4, 1, "green"),
    new MinBlock(5, 1, "green"),
    new MinBlock(4, 0, "green"),
    new MinBlock(5, 0, "green"),
  ],
  yellow: [
    new MinBlock(5, 2, "yellow"),
    new MinBlock(5, 1, "yellow"),
    new MinBlock(5, 0, "yellow"),
    new MinBlock(6, 0, "yellow"),
  ],
  purple: [
    new MinBlock(5, 1, "purple"),
    new MinBlock(4, 1, "purple"),
    new MinBlock(5, 1, "purple"),
    new MinBlock(6, 0, "purple"),
  ],
};

// MinBlockで形成される各色のテトリスブロック。MinBlockの配列。
export class TetorisBlock {
  constructor(color) {
    this.color = color;
    this.block = blockShapeConfig[color];
  }
  //ランダムにテトリスブロックを生成する関数
  static generateRandomTetorisBlock() {
    let colorList = ["red", "blue", "green", "yellow", "purple"];
    let randomIndex = Math.floor(Math.random() * colorList.length);

    return new TetorisBlock(colorList[randomIndex]);
  }
}

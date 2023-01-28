export const playAreaConfig = {
  width: 10,
  height: 20,
};

export class PlayArea {
  width = playAreaConfig.width;
  height = playAreaConfig.height;
  // ゲームがプレイ中か判定するboolean

  constructor() {
    this.playArea = this.createPlayArea();
    //   現在の操作対象テトリスブロック
    this.currenttetrisBlock = null;
    this.isGameOn = true;
  }

  //playAreaを生成する関数
  createPlayArea() {
    let playArea = {};
    //水平方向の配列はwidth分だけemptyで埋めて作成。[empty,empty,empty,....,empty]
    for (let i = 0; i < this.height; i++)
      playArea[i] = Array(this.width).fill("empty");
    return playArea;
  }

  generatetetrisBlockAtInitialPosition() {
    //ランダムにテトリスブロックを生成
    let newtetrisBlock = tetrisBlock.generateRandomtetrisBlock();

    // ブロック生成先がemptyでなければgameを終わらせる
    for (let i = 0; i < newtetrisBlock.block.length; i++) {
      let cur = newtetrisBlock.block[i];
      console.log(cur);
      console.log(this.playArea);
      if (!this.isEmpty(cur.x, cur.y)) {
        console.log("setgamefalse");
        this.setIsGameOn(false);
        break;
      }
    }
    // isGameOnのままならブロックをセット
    if (this.isGameOn) {
      this.settetrisBlock(newtetrisBlock);
      this.setCurrenttetrisBlock(newtetrisBlock);
    }
  }

  moveCurrentBlockRight() {
    //元々のブロックが占めていた座標を一旦全てemptyにする
    this.cleartetrisBlock(this.currenttetrisBlock);
    //元々のブロック位置を右に一個ずらす
    this.currenttetrisBlock.movetetrisBlockRight();
    this.settetrisBlock(this.currenttetrisBlock);
  }

  moveCurrentBlockLeft() {
    //元々のブロックが占めていた座標を一旦全てemptyにする
    this.cleartetrisBlock(this.currenttetrisBlock);
    // 左に一個ずらす
    this.currenttetrisBlock.movetetrisBlockLeft();
    //ずらしたcurrentBlock部分を色で設定する
    this.settetrisBlock(this.currenttetrisBlock);
  }

  moveCurrentBlockBottom() {
    //元々のブロックが占めていた座標を一旦全てemptyにする
    this.cleartetrisBlock(this.currenttetrisBlock);
    // 左に一個ずらす
    this.currenttetrisBlock.movetetrisBlockBottom();
    //ずらしたcurrentBlock部分を色で設定する
    this.settetrisBlock(this.currenttetrisBlock);
  }
  // 右に動けるかどうかTrue/falseで返す関数
  isCurrentBlockMovableToRight() {
    for (let i = 0; i < this.currenttetrisBlock.block.length; i++) {
      let curMinBlock = this.currenttetrisBlock.block[i];
      let x = curMinBlock.getX();
      if (x === this.width - 1) return false;
      if (curMinBlock.isRightOpen && !this.isEmpty(x + 1, curMinBlock.getY())) {
        return false;
      }
    }
    return true;
  }
  // 左に動けるかどうかTrue/falseで返す関数
  isCurrentBlockMovableToLeft() {
    for (let i = 0; i < this.currenttetrisBlock.block.length; i++) {
      let curMinBlock = this.currenttetrisBlock.block[i];
      let x = curMinBlock.getX();
      if (x === 0) return false;
      if (curMinBlock.isLeftOpen && !this.isEmpty(x - 1, curMinBlock.getY())) {
        return false;
      }
    }
    return true;
  }

  // 下に動けるかどうかTrue/falseで返す関数
  isCurrentBlockMovableToBottom() {
    for (let i = 0; i < this.currenttetrisBlock.block.length; i++) {
      let curMinBlock = this.currenttetrisBlock.block[i];
      let y = curMinBlock.getY();
      if (y === this.height - 1) return false;
      if (
        curMinBlock.isBottomOpen &&
        !this.isEmpty(curMinBlock.getX(), y + 1)
      ) {
        return false;
      }
    }
    return true;
  }

  //tetrisBlockを受け取って、操作対象テトリスブロックにセットする関数
  setCurrenttetrisBlock(tetrisBlock) {
    this.currenttetrisBlock = tetrisBlock;
  }

  //MinBlockを受け取って、特定の座標の色を変化させる関数
  setMinBlock(minBlock) {
    this.playArea[minBlock.y][minBlock.x] = minBlock.color;
  }

  //MinBlockを受け取って、特定の座標の色をemptyにする関数
  clearMinblock(minblock) {
    this.playArea[minblock.y][minblock.x] = "empty";
  }

  //tetrisBlockを受け取って、そのtetrisBlockが含んでるMinBlockの座標全ての色を変化させる関数
  settetrisBlock(tetrisBlock) {
    let block = tetrisBlock.block;
    for (let i = 0; i < block.length; i++) {
      this.setMinBlock(block[i]);
    }
  }

  cleartetrisBlock(tetrisBlock) {
    let block = tetrisBlock.block;
    for (let i = 0; i < block.length; i++) {
      this.clearMinblock(block[i]);
    }
  }
  // 特定のx座標y座標が空であるか判断する関数
  isEmpty(x, y) {
    console.log(this.playArea)
    return this.playArea[y][x] === "empty";
  }

  // isGameOnにブーリアン値をセットする
  setIsGameOn(trueOrFalse) {
    this.isGameOn = trueOrFalse;
  }
  printPlayArea() {
    console.log(this.playArea);
    console.log(this.currenttetrisBlock);
    console.log(this.isGameOn);
  }
}

//blockの最小単位
export class MinBlock {
  //x軸座標,y軸座標をnumberで指定。colorはstring
  //x = 0~9, y= 0~19
  constructor(x, y, color, isRightOpen, isLeftOpen, isBottomOpen) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isRightOpen = isRightOpen;
    this.isLeftOpen = isLeftOpen;
    this.isBottomOpen = isBottomOpen;
  }

  getX() {
    return this.x;
  }

  // 数字を受け取ってそれを新しいx座標として設定する関数
  setX(x) {
    this.x = x;
  }
  getY() {
    return this.y;
  }
  // 数字を受け取ってそれを新しいy座標として設定する関数
  setY(y) {
    this.y = y;
  }
}

// MinBlockで形成される各色のテトリスブロック。MinBlockの配列。
export class tetrisBlock {
  constructor(blockArr) {
    this.block = blockArr;
  }
  //ランダムにテトリスブロックを生成する関数
  static generateRandomtetrisBlock() {
    const colorList = ["red", "blue", "green", "yellow", "purple"];
    //MinBlockを利用した一つ一つのテトリスブロック
    const blockShapeConfig = {
      //MinBlock(x,y,color)
      red: [
        new MinBlock(5, 2, "red", true, true, true),
        new MinBlock(4, 1, "red", false, true, true),
        new MinBlock(5, 1, "red", true, false, false),
        new MinBlock(4, 0, "red", true, true, false),
      ],
      blue: [
        new MinBlock(4, 3, "blue", true, true, true),
        new MinBlock(4, 2, "blue", true, true, false),
        new MinBlock(4, 1, "blue", true, true, false),
        new MinBlock(4, 0, "blue", true, true, false),
      ],
      green: [
        new MinBlock(4, 1, "green", false, true, true),
        new MinBlock(5, 1, "green", true, false, true),
        new MinBlock(4, 0, "green", false, true, false),
        new MinBlock(5, 0, "green", true, false, false),
      ],
      yellow: [
        new MinBlock(5, 2, "yellow", true, true, true),
        new MinBlock(5, 1, "yellow", true, true, false),
        new MinBlock(5, 0, "yellow", false, true, false),
        new MinBlock(6, 0, "yellow", true, false, true),
      ],
      purple: [
        new MinBlock(5, 1, "purple", true, true, true),
        new MinBlock(4, 0, "purple", false, true, true),
        new MinBlock(5, 0, "purple", false, false, false),
        new MinBlock(6, 0, "purple", true, false, true),
      ],
    };
    let randomIndex = Math.floor(Math.random() * colorList.length);

    return new tetrisBlock(blockShapeConfig[colorList[randomIndex]]);
  }

  //テトリスブロックを右に+1動かす関数
  movetetrisBlockRight() {
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentX = this.block[i].getX();
      this.block[i].setX(currentX + 1);
    }
  }
  //テトリスブロックを左に+1動かす関数
  movetetrisBlockLeft() {
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentX = this.block[i].getX();
      this.block[i].setX(currentX - 1);
    }
  }

  movetetrisBlockBottom() {
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentY = this.block[i].getY();
      this.block[i].setY(currentY + 1);
    }
  };

  rotatetetrisBlock(){
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentY = this.block[i].getY();
      this.block[i].setY(currentY + 1);
    }
  }
}

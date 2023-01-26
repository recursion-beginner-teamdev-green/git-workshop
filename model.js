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
    this.currentTetorisBlock = null;
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

  generateTetorisBlockAtInitialPosition() {
    //ランダムにテトリスブロックを生成
    let newTetorisBlock = TetorisBlock.generateRandomTetorisBlock();
    console.log(newTetorisBlock)
    // ブロック生成先がemptyでなければgameを終わらせる
    for(let i = 0; i< newTetorisBlock.block.length; i++){
      let cur = newTetorisBlock.block[i];
      console.log(cur)
      if(!this.isEmpty(cur.x,cur.y)){
        console.log("false")
        this.setIsGameOn(false);
        break;
      }
    }
    // isGameOnのままならブロックをセット
    if(this.isGameOn){
      this.setTetorisBlock(newTetorisBlock);
      this.setCurrentTetorisBlock(newTetorisBlock); 
    };
    console.log(this.isGameOn)
  }

  moveCurrentBlockRight() {
    //元々のブロックが占めていた座標を一旦全てemptyにする
    this.clearTetorisBlock(this.currentTetorisBlock);
    //元々のブロック位置を右に一個ずらす
    this.currentTetorisBlock.moveTetorisBlockRight();
    this.setTetorisBlock(this.currentTetorisBlock);
  }

  moveCurrentBlockLeft() {
    //元々のブロックが占めていた座標を一旦全てemptyにする
    this.clearTetorisBlock(this.currentTetorisBlock);
    // 左に一個ずらす
    this.currentTetorisBlock.moveTetorisBlockLeft();
    //ずらしたcurrentBlock部分を色で設定する
    this.setTetorisBlock(this.currentTetorisBlock);
  };

  moveCurrentBlockBottom(){
     //元々のブロックが占めていた座標を一旦全てemptyにする
     this.clearTetorisBlock(this.currentTetorisBlock);
     // 左に一個ずらす
     this.currentTetorisBlock.moveTetorisBlockBottom();
     //ずらしたcurrentBlock部分を色で設定する
     this.setTetorisBlock(this.currentTetorisBlock);
  }
  // 右に動けるかどうかTrue/falseで返す関数
  isCurrentBlockMovableToRight() {
    let peekRight = this.currentTetorisBlock.peekRight()
    let peekBottom = this.currentTetorisBlock.peekBottom()
    let peekTop = this.currentTetorisBlock.peekTop();
    // 右端についていたら動けない
    if (peekRight.x >= this.width - 1) return false;
    //他のブロックが右の移動先座標に既にあるか確かめるロジック
    //peekRightのブロックx座標をプラス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekRight.x + 1,peekRight.y))return false;
    //peekBottomのブロックx座標をプラス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekBottom.x + 1,peekBottom.y))return false;
    //peekTopのブロックx座標をプラス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekTop.x + 1,peekTop.y))return false;

    return true
  }
   // 左に動けるかどうかTrue/falseで返す関数
  isCurrentBlockMovableToLeft() {
    let peekLeft = this.currentTetorisBlock.peekLeft()
    let peekBottom = this.currentTetorisBlock.peekBottom()
    let peekTop = this.currentTetorisBlock.peekTop();
    // 右端についていたら動けない
    if (peekLeft.x <= 0) return false;
    //他のブロックが右の移動先座標に既にあるか確かめるロジック
    //peekRightのブロックx座標をマイナス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekLeft.x - 1,peekLeft.y))return false;
    //peekBottomのブロックx座標をマイナス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekBottom.x - 1,peekBottom.y))return false;
    //peekTopのブロックx座標をマイナス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekTop.x - 1,peekTop.y))return false;

    return true
  };

   // 下に動けるかどうかTrue/falseで返す関数
   isCurrentBlockMovableToBottom() {
    let peekLeft = this.currentTetorisBlock.peekLeft()
    let peekBottom = this.currentTetorisBlock.peekBottom()
    let peekRight = this.currentTetorisBlock.peekRight();
    // 右端についていたら動けない
    if (peekBottom.x <= 0) return false;

    //他のブロックが右の移動先座標に既にあるか確かめるロジック
    //peekRightのブロックx座標をマイナス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekLeft.x,peekLeft.y + 1))return false;
    //peekBottomのブロックx座標をマイナス１した先がemptyじゃなかったらfalse
    if(!this.isEmpty(peekBottom.x,peekBottom.y + 1))return false;
    //peekTopのブロックx座標をマイナス１した先がemptyじゃなかったらfalse

    return true
  };

  //TetorisBlockを受け取って、操作対象テトリスブロックにセットする関数
  setCurrentTetorisBlock(tetorisBlock) {
    this.currentTetorisBlock = tetorisBlock;
  }

  //MinBlockを受け取って、特定の座標の色を変化させる関数
  setMinBlock(minBlock) {
    this.playArea[minBlock.y][minBlock.x] = minBlock.color;
  }

  //MinBlockを受け取って、特定の座標の色をemptyにする関数
  clearMinblock(minblock) {
    this.playArea[minblock.y][minblock.x] = "empty";
  }

  //TetorisBlockを受け取って、そのTetorisBlockが含んでるMinBlockの座標全ての色を変化させる関数
  setTetorisBlock(tetorisBlock) {
    let block = tetorisBlock.block;
    for (let i = 0; i < block.length; i++) {
      this.setMinBlock(block[i]);
    }
  }

  clearTetorisBlock(tetorisBlock) {
    let block = tetorisBlock.block;
    for (let i = 0; i < block.length; i++) {
      this.clearMinblock(block[i]);
    }
  }
  // 特定のx座標y座標が空であるか判断する関数
  isEmpty(x, y) {
    return this.playArea[y][x] === "empty";
  };

  // isGameOnにブーリアン値をセットする
  setIsGameOn(trueOrFalse){
    this.isGameOn = trueOrFalse;
  }
  printPlayArea() {
    console.log(this.playArea);
    console.log(this.currentTetorisBlock);
    console.log(this.isGameOn)
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
    new MinBlock(5, 0, "purple"),
    new MinBlock(4, 0, "purple"),
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

  //テトリスブロックを右に+1動かす関数
  moveTetorisBlockRight() {
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentX = this.block[i].getX();
      this.block[i].setX(currentX + 1);
    }
  }
  //テトリスブロックを左に+1動かす関数
  moveTetorisBlockLeft() {
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentX = this.block[i].getX();
      this.block[i].setX(currentX - 1);
    }
  };

  moveTetorisBlockBottom(){
    for (let i = 0; i < this.block.length; i++) {
      //現在のx座標を取得
      let currentY = this.block[i].getY();
      this.block[i].setY(currentY + 1);
    }
  }

  // テトリスブロックの一番左のminBlockを返す関数
  peekLeft() {
    let block = this.block;
    let peek = block[0];
    for (let i = 1; i < block.length; i++) {
      if (peek.getX() > block[i].getX()) peek = block[i];
    }
    return peek;
  }
  // テトリスブロックの一番右のminBlockを返す関数
  peekRight() {
    let block = this.block;
    let peek = block[0];
    for (let i = 1; i < block.length; i++) {
      if (peek.getX() < block[i].getX()) peek = block[i];
    }
    return peek;
  }
  // テトリスブロックの一番下のminBlockを返す関数
  peekBottom() {
    let block = this.block;
    let peek = block[0];
    for (let i = 1; i < block.length; i++) {
      if (peek.getY() < block[i].getY()) peek = block[i];
    }
    return peek;
  };

  peekTop() {
    let block = this.block;
    let peek = block[0];
    for (let i = 1; i < block.length; i++) {
      if (peek.getY() > block[i].getY()) peek = block[i];
    }
    return peek;
  };
}

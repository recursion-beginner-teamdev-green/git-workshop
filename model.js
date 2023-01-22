export class PlayArea {
    width = 10;
    height = 20;
  
    constructor() {
      this.playArea = this.createPlayArea();
    };
  
    //playAreaを生成する関数
    createPlayArea() {
      let playArea = {};
      //水平方向の配列はwidth分だけemptyで埋めて作成。[empty,empty,empty,....,empty]
      for (let i = 0; i < this.height; i++)
        playArea[i] = Array(this.width).fill("empty");
      return playArea;
    }
    //MinBlockを受け取って、特定の座標の色を変化させる関数
    setMinBlock(minBlock) {
      this.playArea[minBlock.y][minBlock.x] = minBlock.color;
    }
  
    //TetorisBlockを受け取って、そのTetorisBlockが含んでるMinBlockの座標全ての色を変化させる関数
    setTetorisBlock(tetorisBlock) {
      for (let i = 0; i < tetorisBlock.block.length; i++) {
          this.setMinBlock(tetorisBlock.block[i]);
      }
    }
  
    printPlayArea() {
      console.log(this.playArea);
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
      new MinBlock(6, 2, "red"),
      new MinBlock(5, 1, "red"),
      new MinBlock(6, 1, "red"),
      new MinBlock(5, 0, "red"),
    ],
  };
  
  // MinBlockで形成される各色のテトリスブロック。MinBlockの配列。
export class TetorisBlock {
    constructor(color) {
      this.color = color;
      this.block = blockShapeConfig[color];
    }
  }

function Cell(xCoord, yCoord) {
  this.name = "x" + xCoord + "y" + yCoord
  this.xCoord = xCoord
  this.yCoord = yCoord
  this.symbol = ""
  this.active = "active"
  this.mark = function(symbol) {
    this.symbol = symbol
  }
}

function BoardObj() {
  this.rows = 24;
  this.cols = 10;
  this.board = {};
  this.cells = this.rows * this.cols;
  this.createBoard = function() {
    for (var yIndex = 0; yIndex < this.rows; yIndex++) {
      for (var xIndex = 0; xIndex < this.cols; xIndex++) {
        var newCell = new Cell(xIndex, yIndex);
        this.board[newCell.name] = newCell;
      }
    }
  }
  this.showBoard = function() {
    for (cell in this.board) {
      if (this.board[cell].symbol) {
        var tr = "y" + this.board[cell].yCoord;
        var td = "x" + this.board[cell].xCoord;
        $("tr#" + tr + " td#" + td).addClass(this.board[cell].symbol);
      }
    }
  }

  this.clearActive = function() {
    $("td").removeClass()
    for (cell in this.board) {
      if (this.board[cell].active === "active") {
        this.board[cell].symbol = ""
      }

    }
  }

  // this.findFirstEmpty = function(col) {
  //   debugger;
  //   for (var i = 0; i < this.rows; i++) {
  //     var checkCell = "x" + col + "y" + i;
  //     if (this.board[checkCell].symbol === 0) {
  //       return checkCell;
  //       break
  //     }
  //   }
  // }
}


function ActivePiece(type) {
  this.type = type;
  this.rotation = 0;
  this.xPosition = 3;
  this.yPosition = 0;

  this.moveLeft = function() {
    this.xPosition -= 1;
    if (this.draw() === false){
      this.xPosition += 1;
    }
    this.draw()
    tetrisBoardObj.showBoard()
  }

  this.moveRight = function() {
    this.xPosition += 1;
    if (this.draw() === false){
      this.xPosition -= 1;
    }
    this.draw();
    tetrisBoardObj.showBoard()
  }

  this.moveDown = function() {
    this.yPosition += 1;
    if (this.draw() === false){
      this.yPosition -= 1;
      this.makePassive();
      // make random piece
    }
    this.draw();
    tetrisBoardObj.showBoard();
  }

  this.rotate = function() {
    this.rotation = (this.rotation + 1) % 4;
    if (this.draw() === false){
      this.rotation -= 1;
    }
    this.draw();
    tetrisBoardObj.showBoard()
  }

  this.draw = function() {
    tetrisBoardObj.clearActive()
    var piece = pieces[this.type + this.rotation];
    for (var i = 0; i < 4; i++) {
      debugger
      cellX = piece[i][0] + this.xPosition;
      cellY = piece[i][1] + this.yPosition;
      cellPosition = "x" + cellX + "y" + cellY
      if (tetrisBoardObj.board[cellPosition]) {
        if (tetrisBoardObj.board[cellPosition].symbol === "") {
          tetrisBoardObj.board["x" + cellX + "y" + cellY].mark(this.type)
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }

  this.makePassive = function() {
    var piece = pieces[this.type + this.rotation];
    for (var i = 0; i < 4; i++) {
      cellX = piece[i][0] + this.xPosition;
      cellY = piece[i][1] + this.yPosition;
      tetrisBoardObj.board["x" + cellX + "y" + cellY].active = "passive"
    }
  }
}

var pieces = {
  "s0" : [[0,0],[1,0],[1,1],[2,1]],
  "z0" : [[0,1],[1,1],[1,0],[2,0]],
  "l0" : [[0,2],[0,1],[0,0],[1,0]],
  "j0" : [[1,2],[1,1],[1,0],[0,0]],
  "o0" : [[0,1],[1,1],[0,0],[1,0]],
  "i0" : [[0,0],[0,1],[0,2],[0,3]],
  "t0" : [[0,0],[1,0],[2,0],[1,1]],

  "s1" : [[1,1],[0,1],[1,1],[2,0]],
  "z1" : [[1,2],[1,1],[0,1],[0,0]],
  "l1" : [[2,2],[1,2],[0,2],[0,1]],
  "j1" : [[0,1],[0,0],[1,0],[2,0]],
  "o1" : [[0,1],[1,1],[0,0],[1,0]],
  "i1" : [[3,2],[2,2],[1,2],[0,2]],
  "t1" : [[0,2],[0,1],[0,0],[1,1]],


  "s2" : [[0,0],[1,0],[1,1],[2,1]],
  "z2" : [[0,1],[1,1],[1,0],[2,0]],
  "l2" : [[0,2],[1,2],[1,1],[1,0]],
  "j2" : [[1,2],[0,2],[0,1],[0,0]],
  "o2" : [[0,1],[1,1],[0,0],[1,0]],
  "i2" : [[0,0],[0,1],[0,2],[0,3]],
  "t2" : [[2,1],[1,1],[0,1],[1,0]],

  "s3" : [[1,1],[0,1],[1,1],[2,0]],
  "z3" : [[1,2],[1,1],[0,1],[0,0]],
  "l3" : [[0,0],[1,0],[2,0],[2,1]],
  "j3" : [[0,2],[1,2],[1,1],[0,1]],
  "o3" : [[0,1],[1,1],[0,0],[1,0]],
  "i3" : [[3,2],[2,2],[1,2],[0,2]],
  "t3" : [[1,0],[1,1],[1,2],[0,1]]
};

function randomPieceGenerator(){
var pieceType= Math.floor(Math.random())*7
if (pieceType <= 1 === "s0") {

} else if (pieceType <= 2 === "z0") {

}
else if (pieceType <=3 === "l0") {

}
else if (pieceType <=4 === "j0") {

}
else if (pieceType <=5 === "o0") {

}
else if (pieceType <=6 === "i0"){
}
else if (pieceType <=7 === "t0"){

}
return pieceType;


$(document).ready(function() {
  tetrisBoardObj = new BoardObj();
  tetrisBoardObj.createBoard();

  for (var yIndex = 0; yIndex < tetrisBoardObj.rows; yIndex++) {
    $("table").append("<tr id='y" + yIndex + "'>")
    $("table").append("</tr>")
  }
  for (var xIndex = 0; xIndex < tetrisBoardObj.cols; xIndex++) {
    $("table tr").append("<td id='x" + xIndex + "'>")
  }

  tetrisBoardObj.showBoard();

  activePiece = new ActivePiece("l")
  $(window).keydown(function(e) {
    if (e.keyCode == 37) { //left arrow
      activePiece.moveLeft();
    }
    else if (e.keyCode == 39) { //right arrow
      activePiece.moveRight();
    }
    else if (e.keyCode == 38) { //up arrow
      activePiece.rotate();
    }
    else if (e.keyCode == 40) { //down arrow
      activePiece.moveDown();
    }
    else if (e.keyCode == 32) { //space bar
      //move all the way down
      console.log(activePiece);
      console.log(tetrisBoardObj);
    }
  });
});

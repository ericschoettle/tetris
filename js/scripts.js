
function Cell(xCoord, yCoord) {
  this.name = "x" + xCoord + "y" + yCoord
  this.xCoord = xCoord
  this.yCoord = yCoord
  this.playerSymbol = NaN
  this.mark = function(playerSymbol) {
    this.playerSymbol = playerSymbol
  }
}

function BoardObj() {
  this.rows = 24;
  this.cols = 10;
  this.board = {};
  // this.cells = this.rows * this.cols;
  this.createBoard = function() {
    for (var yIndex = 0; yIndex < this.rows; yIndex++) {
      for (var xIndex = 0; xIndex < this.cols; xIndex++) {
        var newCell = new Cell(xIndex, yIndex);
        this.board[newCell.name] = newCell;
      }
    }
  }
  // this.findFirstEmpty = function(col) {
  //   debugger;
  //   for (var i = 0; i < this.rows; i++) {
  //     var checkCell = "x" + col + "y" + i;
  //     if (this.board[checkCell].playerSymbol === 0) {
  //       return checkCell;
  //       break
  //     }
  //   }
  // }
}


function gamePiece(type, rotation, xPosition, yPosition) {
  this.type = type;
  this.rotation = 0;
  this.xPosition = xPosition;
  this.yPosition = yPosition;

  this.moveLeft = function() {
    this.xPosition -= 1;
    // this.draw
  }
  this.moveRight = function() {
    this.xPosition += 1;
    // this.draw
  }
  this.moveDown = function() {
    this.yPosition -= 1;
    // this.draw
  }
  this.rotate = function() {
    this.rotation =(this.rotation + 1)  %4;
    // this.draw
  }
  this.draw = function() {

  }
}


  function gamePiece(s,z,l,j,o,i){
    var s0 = [[0,0][1,0][1,1][2,1]];
    var z0 = [[0,1][1,1][1,0][2,0]];
    var l0 = [[0,2][0,1][0,0][1,0]];
    var j0 = [[1,2][1,1][1,0][0,0]];
    var o0 = [[0,1][1,1][0,0][1,0]];
    var i0 = [[0,0][0,1][0,2][0,3]];

    var s1 = [[0,0][1,0][1,1][2,1]];
    var z1 = [[0,1][1,1][1,0][2,0]];
    var l1 = [[0,2][0,1][0,0][1,0]];
    var j1 = [[1,2][1,1][1,0][0,0]];
    var o1 = [[0,1][1,1][0,0][1,0]];
    var i1 = [[0,0][0,1][0,2][0,3]];

    var s2 = [[0,0][1,0][1,1][2,1]];
    var z2 = [[0,1][1,1][1,0][2,0]];
    var l2 = [[0,2][0,1][0,0][1,0]];
    var j2 = [[1,2][1,1][1,0][0,0]];
    var o2 = [[0,1][1,1][0,0][1,0]];
    var i2 = [[0,0][0,1][0,2][0,3]];
    
    var s3 = [[0,0][1,0][1,1][2,1]];
    var z3 = [[0,1][1,1][1,0][2,0]];
    var l3 = [[0,2][0,1][0,0][1,0]];
    var j3 = [[1,2][1,1][1,0][0,0]];
    var o3 = [[0,1][1,1][0,0][1,0]];
    var i3 = [[0,0][0,1][0,2][0,3]];

    this.s = s;
    this.z = z;
    this.l = l;
    this.j = j;
    this.o = o;
    this.i = i;
  }


$(document).ready(function() {
  newBoardObj = new BoardObj();
  newBoardObj.createBoard()
 for (var yIndex = 0; yIndex < newBoardObj.rows; yIndex++) {
   $("table").append("<tr id='y" + yIndex + "'>")
   $("table").append("</tr>")
 }
 for (var xIndex = 0; xIndex < newBoardObj.cols; xIndex++) {
   $("table tr").append("<td id='x" + xIndex + "'>")
 }


});

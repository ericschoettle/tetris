
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


function ActivePiece(type, rotation, xPosition, yPosition) {
  this.type = "l";
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
    var piece = pieces[this.type + this.rotation];
    for (var i = 0; i < 4; i++) {
      cellX = piece[i][0] + this.xPosition;
      cellY = piece[i][1] + this.yPosition;
      tetrisBoardObj.board["x" + cellX + "y" + cellY].mark(this.type)
    }
  }
}


$(document).ready(function() {
  tetrisBoardObj = new BoardObj();
  tetrisBoardObj.createBoard()
  for (var yIndex = 0; yIndex < tetrisBoardObj.rows; yIndex++) {
    $("table").append("<tr id='y" + yIndex + "'>")
    $("table").append("</tr>")
  }
  for (var xIndex = 0; xIndex < tetrisBoardObj.cols; xIndex++) {
    $("table tr").append("<td id='x" + xIndex + "'>")
  }


});

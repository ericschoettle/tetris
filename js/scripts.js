
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

function showBoard(boardObj) {
  for (var i = 0; i < boardObj.cells; i++) {
    array[i]
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
      debugger
      var y = this.board[cell].yCoord;
      var x = this.board[cell].xCoord;
      var table = $("table")[0]
      console.log(table)
      // var tableCell = table.rows[0].cells[0];
      // var tableCelljQuery = $(tableCell)
      // console.log(tableCell)
      // console.log(tableCelljQuery)


      // $("table tr#" + tr + " td#" + td).text("test");
      // console.log(this.board[cell].symbol);
    }
  }

  this.clearActive = function() {
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
    tetrisBoardObj.clearActive()
    this.xPosition -= 1;
    this.draw();
  }
  this.moveRight = function() {
    this.xPosition += 1;
    // this.draw
  }
  this.moveDown = function() {
    this.yPosition += 1;
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

$(document).ready(function() {
  tetrisBoardObj = new BoardObj();
  tetrisBoardObj.createBoard();
  tetrisBoardObj.showBoard();
  for (var yIndex = 0; yIndex < tetrisBoardObj.rows; yIndex++) {
    $("table").append("<tr id='y" + yIndex + "'>")
    $("table").append("</tr>")
  }
  for (var xIndex = 0; xIndex < tetrisBoardObj.cols; xIndex++) {
    $("table tr").append("<td id='x" + xIndex + "'>")
  }

  activePiece = new ActivePiece("l")
  $(window).keydown(function(e) {
    if (e.keyCode == 37) { //left arrow
      alert ("to the left");
      activePiece.moveLeft();
      console.log(activePiece);
    }
    else if (e.keyCode == 39) { //right arrow
      alert ("to the right");
      activePiece.moveRight();
      console.log(activePiece);
    }
    else if (e.keyCode == 38) { //up arrow
      activePiece.rotate();
      console.log(activePiece);
    }
    else if (e.keyCode == 40) { //down arrow
      activePiece.moveDown();
      console.log(activePiece);
    }
    else if (e.keyCode == 32) { //space bar
      //move all the way down
      console.log(activePiece);
    }
  });

  });
  // $(window).keydown([38],function() {
  //   activePiece.rotate();
  //   console.log(activePiece)
  // });
  // $(window).keydown([39],function() {
  //   activePiece.moveRight();
  //   alert("to the right");
  // });
  // $(window).keydown([40],function(){
  //   activePiece.moveDown();
  //   alert("go Down");
  // })

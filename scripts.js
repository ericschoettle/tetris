// Cell constructor makes cells in board, which is inside of BoardObj
function Cell(xCoord, yCoord) {
  this.name = "x" + xCoord + "y" + yCoord
  this.xCoord = xCoord
  this.yCoord = yCoord
  this.symbol = "" // default symbol is a blank string - pieces change symbol to the letter indicating that piece
  this.active = "active" // labeled "active" for the piece that is falling, "passive" for pieces that are fixed, and "" for empty parts of the board
}

// Constructor for new active (aka falling) pieces
function ActivePiece(type) {
  this.type = type;
  this.rotation = 0;
  this.xPosition = 3;
  this.yPosition = 0;
}

// BoardObj constructor holds the board and some basic information about it. And lots of functions.
function BoardObj() {
  this.rows = 24;
  this.cols = 10;
  this.board = {};
  this.activePiece = {};
  this.cells = this.rows * this.cols;
  // Creates the board within the boardObj.
  this.createBoard = function() {
    for (var yIndex = 0; yIndex < this.rows; yIndex++) {
      for (var xIndex = 0; xIndex < this.cols; xIndex++) {
        var newCell = new Cell(xIndex, yIndex);
        this.board[newCell.name] = newCell;
      }
    }
  }
  // Shows the board with pieces on it in the web browser.
  this.showBoard = function() {
    for (cell in this.board) { // Loops through all cells
      if (this.board[cell].symbol) { // Only runs on cells that have a value in the symbol
        var tr = "y" + this.board[cell].yCoord; // variable to target the row in the table we use to make the board visible (in the DOM)
        var td = "x" + this.board[cell].xCoord; // variable to target the cell in the above row
        $("tr#" + tr + " td#" + td).addClass(this.board[cell].symbol); // Adds a class to the cell in the table. This allows us to use CSS to give it a color.
      }
    }
  }

  // Clears the board of classes and cells labeled "active". The cycle for each movement of a piece is clear board, test if possible, redraw board.
  this.clearActive = function() {
    $("td").removeClass()
    for (cell in this.board) {
      if (this.board[cell].active === "active") {
        this.board[cell].symbol = ""
      }
    }
  }

  this.moveLeft = function() {
    this.clearActive()
    this.activePiece.xPosition -= 1; // shifts x position left
    if (this.loopCellsOfActivePiece(this.testOpen) === false){ // tests if move left is possible
      this.activePiece.xPosition += 1; // if not possible, it moves it back to its original position
    }
    this.loopCellsOfActivePiece(this.drawActivePiece, this.activePiece.type); // Draws the object in the board
    this.showBoard() // shows the board in the webBrowser
  }

  this.moveRight = function() {
    this.clearActive()
    this.activePiece.xPosition += 1;
    if (this.loopCellsOfActivePiece(this.testOpen) === false){
      this.activePiece.xPosition -= 1;
    }
    this.loopCellsOfActivePiece(this.drawActivePiece, this.activePiece.type);
    this.showBoard()
  }

  this.moveDown = function() {
    this.clearActive()
    this.activePiece.yPosition += 1;
    if (this.loopCellsOfActivePiece(this.testOpen) === false) {
      this.activePiece.yPosition -= 1;
      this.loopCellsOfActivePiece(this.drawActivePiece, this.activePiece.type);
      this.loopCellsOfActivePiece(this.makePassive)
      this.newActivePiece();
    } else {
      this.loopCellsOfActivePiece(this.drawActivePiece, this.activePiece.type);
    }
    this.showBoard();
  }

  this.rotate = function() {
    this.clearActive()
    this.activePiece.rotation = (this.activePiece.rotation + 1) % 4;
    if (this.loopCellsOfActivePiece(this.testOpen) === false){
      this.activePiece.rotation -= 1;
    }
    this.loopCellsOfActivePiece(this.drawActivePiece, this.activePiece.type);
    this.showBoard();
  }

  this.loopCellsOfActivePiece = function(callBack, optionalParam) {
    var piece = pieces[this.activePiece.type + this.activePiece.rotation]; // Selects the proper piece from the pieces object
    for (var i = 0; i < 4; i++) { // loops though the cells of the peice
      var cellX = piece[i][0] + this.activePiece.xPosition; // adds the x position of the piece to the x position of the cell within the piece
      var cellY = piece[i][1] + this.activePiece.yPosition; // adds the y position of the piece to the y position of the cell within the piece
      var cellPosition = "x" + cellX + "y" + cellY // concatenates the x and y positions to give the format of cell names. This allows the cells to be slected and modified for the piece
      if (callBack(this.board[cellPosition], optionalParam) === false) {
        return false
      }
    }
  }

  // Draws the piece to the board on the back end
  this.drawActivePiece = function(cell, type) {
    cell.symbol = type
  }

  this.testOpen = function(cell, param) {
    debugger
    if (cell) { // checks if the cell position is on the board
      if (cell.symbol === "") { // checks if the cell is empty
      } else { // if cell is occupied
        return false
      } // if cell is not on the board
    } else {
      return false
    }
  }

  // Makes pieces passive when they hit the bottom or another piece; passive is the designation for pieces that are no longer falling
  this.makePassive = function(cell) {
    cell.active = "passive" // Makes the cell passive.
  }

  this.newActivePiece = function() {
    var randNum= Math.floor(Math.random()*7)
    if (randNum <= 1) {
      pieceType = "s"
    } else if (randNum <= 2) {
      pieceType = "z"
    }
    else if (randNum <= 3) {
      pieceType = "l"
    }
    else if (randNum <= 4) {
      pieceType = "j"
    }
    else if (randNum <= 5) {
      pieceType = "o"
    }
    else if (randNum <= 6){
      pieceType = "i"
    }
    else if (randNum <= 7){
      pieceType = "t"
    }
    this.activePiece = new ActivePiece(pieceType)
  }
}

// Object containing all possible pieces and rotation states
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
  tetrisBoardObj = new BoardObj(); // Creates board object
  tetrisBoardObj.createBoard(); // creates board with that boardObj

  // loops through rows of BoardObj and crates rows of table in the DOM
  for (var yIndex = 0; yIndex < tetrisBoardObj.rows; yIndex++) {
    $("table").append("<tr id='y" + yIndex + "'>") // gives rows an ID equal to their y position
    $("table").append("</tr>")
  }
  // loops through columnts of boardObj and crates cells in the table rows
  for (var xIndex = 0; xIndex < tetrisBoardObj.cols; xIndex++) {
    $("table tr").append("<td id='x" + xIndex + "'>") // Gives cells IDs equal to their x position
  }

  // Shows the boardObj in the table in the DOM
  tetrisBoardObj.showBoard();

  tetrisBoardObj.newActivePiece(); //This makes the first active piece

  setInterval(tetrisBoardObj.moveDown(), 500);

  // Listens for arrow keys
  $(window).keydown(function(e) {
    if (e.keyCode == 37) { //left arrow
      tetrisBoardObj.moveLeft();
    }
    else if (e.keyCode == 39) { //right arrow
      tetrisBoardObj.moveRight();
    }
    else if (e.keyCode == 38) { //up arrow
      tetrisBoardObj.rotate();
    }
    else if (e.keyCode == 40) { //down arrow
      tetrisBoardObj.moveDown();
    }
    // else if (e.keyCode == 32) { //space bar
    //   while (activePiece.testOpen !== false) {
    //     activePiece.moveDown();
    //   }
    //   console.log(activePiece);
    //   console.log(tetrisBoardObj);
    // }
  });
});

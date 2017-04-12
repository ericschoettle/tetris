// Cell constructor makes cells in board, which is inside of BoardObj
function Cell(xCoord, yCoord) {
  this.name = "x" + xCoord + "y" + yCoord
  this.xCoord = xCoord
  this.yCoord = yCoord
  this.symbol = "" // default symbol is a blank string - pieces change symbol to the letter indicating that piece
  this.active = "" // labeled "active" for the piece that is falling, "passive" for pieces that are fixed, and "" for empty parts of the board
  // Changes symbol for that cell.
  this.mark = function(symbol) {
    this.symbol = symbol
  }
}

// BoardObj constructor holds the board and some basic information about it. And lots of functions.
function BoardObj() {
  this.rows = 24;
  this.cols = 10;
  this.board = {};
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

// Constructor for new active (aka falling) pieces
function ActivePiece(type) {
  this.type = type;
  this.rotation = 0;
  this.xPosition = 3;
  this.yPosition = 0;

  this.moveLeft = function() {
    this.xPosition -= 1; // shifts x position left
    if (this.draw() === false){ // tests if move left is possible
      this.xPosition += 1; // if not possible, it moves it back to its original position
    }
    this.draw() // Draws the object in the board
    tetrisBoardObj.showBoard() // shows the board in the webBrowser
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
      this.makePassive(); // if piece cannot be moved down, the piece becomes passive, and can no longer be moved
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

  // Draws the piece to the board on the back end
  this.draw = function() {
    tetrisBoardObj.clearActive()
    var piece = pieces[this.type + this.rotation]; // Selects the proper piece from the pieces object
    for (var i = 0; i < 4; i++) { // loops though the cells of the peice
      cellX = piece[i][0] + this.xPosition; // adds the x position of the piece to the x position of the cell within the piece
      cellY = piece[i][1] + this.yPosition; // adds the y position of the piece to the y position of the cell within the piece
      cellPosition = "x" + cellX + "y" + cellY // concatenates the x and y positions to give the format of cell names. This allows the cells to be slected and modified for the piece
      if (tetrisBoardObj.board[cellPosition]) { // checks if the cell position is on the board
        if (tetrisBoardObj.board[cellPosition].symbol === "") { // checks if the cell is empty
          tetrisBoardObj.board["x" + cellX + "y" + cellY].mark(this.type) // if cell is empty and on the board, changes the symbol of that cell to the symbol of the active piece.
        } else { // if cell is occupied
          return false
        } // if cell is not on the board
      } else {
        return false
      }
    }
  }

  // Makes pieces passive when they hit the bottom or another piece; passive is the designation for pieces that are no longer falling
  this.makePassive = function() {
    var piece = pieces[this.type + this.rotation]; // Calls the object "pieces" which holds all possible pieces, selects the piece in the3 curent rotation.
    for (var i = 0; i < 4; i++) { // loops through cells in piece
      cellX = piece[i][0] + this.xPosition; // Looks up the x coordinate of the cell in the pice and shifts it for the position of the piece
      cellY = piece[i][1] + this.yPosition; // same for Y coordinate
      tetrisBoardObj.board["x" + cellX + "y" + cellY].active = "passive" // Makes the cell passive.
    }
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

function randomPieceGenerator() {
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
}


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

  activePiece = new ActivePiece("l") // this will need to get replaced with our random piece generator when it exists

  // Listens for arrow keys
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

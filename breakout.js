// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

window.onload = () => {
  document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = getContext("2d"); // Used for drawing on the board
};

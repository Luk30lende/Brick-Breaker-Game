// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Player
let playerWidth = 80;
let playerHeight = 10;

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
};

window.onload = () => {
  document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = getContext("2d"); // Used for drawing on the board

  // Draw the player
  context.fillStyle = "skyblue";
  context.fillRect(player.x, player.y, player.width, player.height);
};

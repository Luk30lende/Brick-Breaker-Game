// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Player/Paddle
let playerWidth = 80;
let playerHeight = 10;
playerVelocityX = 10;

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerVelocityX,
};

window.onload = () => {
  document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = getContext("2d"); // Used for drawing on the board

  // Draw the player
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);
};

const update = () => {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height); // clear the frame before we draw something new in the canvas

  //Player/Paddle
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);
};

function outOfBounds(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth;
}

const movePlayer = (e) => {
  if (e.code == "ArrowLeft") {
    // player.x -= player.velocityX;
    let nextPlayerX = player.x - player.velocityX;
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX;
    }
  } else if (e.code == "ArrowRight") {
    // player.y += player.velocityX;
    let nextPlayerX = player.x + player.velocityX;
    if (!outOfBounds(nextPlayerX)) {
      player.x = nextPlayerX;
    }
  }
};

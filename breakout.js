// Board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// Player paddle
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10; // move player paddle 10px each time

let player = {
  x: boardWidth / 2 - playerWidth / 2,
  y: boardHeight - playerHeight - 5,
  width: playerWidth,
  height: playerHeight,
  velocityX: playerVelocityX,
};

// Ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
  x: boardWidth / 2,
  y: boardHeight / 2,
  width: ballWidth,
  height: ballHeight,
  velocityX: ballVelocityX,
  velocityY: ballVelocityY,
};

// Blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3; // add more as game goes on
let blockMaxRows = 10; // limit number of rows
let blockCount = 0;

// Starting block corner
let blockX = 15;
let blockY = 45;

// Score
let score = 0;

// Game over
let gameOver = false;

window.onload = () => {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d"); // Used for drawing on the board

  // Draw the player paddle
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(update);
  document.addEventListener("keydown", movePlayer);

  // Create blocks
  createBlocks();
};

const update = () => {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height); // clear the frame before we draw something new in the canvas

  // player paddle
  context.fillStyle = "lightgreen";
  context.fillRect(player.x, player.y, player.width, player.height);

  // ball
  context.fillStyle = "whitesmoke";
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // bounce ball off walls
  if (ball.y <= 0) {
    // if ball touches top of canvas
    ball.velocityY *= -1; // reserve direction
  } else if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
    // if ball touches left or right of canvas
    ball.velocityX *= -1; // reverse direction
  } else if (ball.y + ball.height >= boardHeight) {
    // if ball touches bottom of canvas
    // Game Over
    context.font = "25px sans-serif";
    context.fillText("Game Over: Press 'Space' To Restart", 40, 400);
    gameOver = true;
  }

  // Bounce ball off the player paddle
  if (topCollision(ball, player) || bottomCollision(ball, player)) {
    ball.velocityY *= -1; // flip y direction up or down
  } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
    ball.velocityX *= -1; // flip y direction left or right
  }

  // Draw the blocks
  context.fillStyle = "skyblue";
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockArray[i];
    if (!block.break) {
      if (topCollision(ball, block) || bottomCollision(ball, block)) {
        block.break = true;
        ball.velocityY *= -1; // flip y direction up or down
        blockCount -= -1;
        score += 10;
      } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
        block.break = true;
        ball.velocityX *= -1; // flip y direction left or right
        blockCount -= -1;
        score += 10;
      }
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  // Draw score on to the canvas
  context.font = "25px sans-serif";
  context.fillText(score, 10, 25);
};

function outOfBounds(xPosition) {
  return xPosition < 0 || xPosition + playerWidth > boardWidth;
}

// move player paddle
const movePlayer = (e) => {
  if (gameOver) {
    if (e.code == "Space") {
      resetGame();
    }
  }

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

// Function to detect collisions
const detectCollision = (a, b) => {
  return (
    a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
    a.y + a.height > b.y // a's bottom left corner passes b's top right corner
  );
};

const topCollision = (ball, block) => {
  // a is above b (ball is above block)
  return detectCollision(ball, block) && ball.y + ball.height >= block.y;
};

const bottomCollision = (ball, block) => {
  // a is below b (ball is below block)
  return detectCollision(ball, block) && block.y + block.height >= ball.y;
};

const leftCollision = (ball, block) => {
  // a is left of b (ball is left of block)
  return detectCollision(ball, block) && ball.x + ball.width >= block.x;
};

const rightCollision = (ball, block) => {
  // a is right of b (ball is right of block)
  return detectCollision(ball, block) && block.x + block.width >= ball.x;
};

const createBlocks = () => {
  blockArray = []; // clear block array
  for (let c = 0; c < blockColumns; c++) {
    for (let r = 0; r < blockRows; r++) {
      let block = {
        x: blockX + c * blockWidth + c * 10, // c * 10  -> space 10px apart columns
        y: blockY + r * blockHeight + r * 10, // r * 10  -> space 10px apart rows
        width: blockWidth,
        height: blockHeight,
        break: false,
      };
      blockArray.push(block);
    }
  }
  blockCount = blockArray.length;
};

const resetGame = () => {
  gameOver = false;
  player = {
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX,
  };
  ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY,
  };
  blockArray = [];
  score = 0;
  createBlocks();
};

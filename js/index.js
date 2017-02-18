
/* 
 * Set variables
 ----------------------*/
let   startButton   = document.querySelector('#start-button'),
      restartButton = document.querySelector('#restart-button'),
      gameModes     = document.querySelectorAll('.game-mode'),
      simonTiles    = document.querySelectorAll('.simon-btn');


/* 
 * Game configurations
 ------------------------*/
let gameConfig = {
  score: 0,
  moves: {
    computer: [],
    human: []
  },
  mode: null,
  gameStarted: false
}


/* 
 * Gameplay Logic
 ----------------------*/
function startGame() {
  if (gameConfig.mode !== null) {
    setMessage("It's your turn!");
    playSequence();
  } 
  alert('Please pick a game mode to begin!');
}

function restartGame() {
  
}

function humanError() {
  
}

function playSequence() {
  
}



/* 
 * Click Logic 
 ----------------------*/
function humanClick(e) {
  const clickedTile = e.target.offsetParent
  buzz(clickedTile);
}

function computerClick() {
  buzz(randomTile(simonTiles));
}

function getGameMode(e) {
  console.log(e.target.offsetParent.id);
  return (e.target.offsetParent.id) === 'normal-mode'
    ? gameConfig.mode = 'normal'
    : gameConfig.mode = 'strict'
}




/* 
 * Utility Functions 
 ----------------------*/
function randomTile(tiles) {
  const index = Math.floor( Math.random() * tiles.length );
  const tile = tiles[index];
  return tile;
}

function buzz(tile) {
  const audio = tile.children[0];
  // reset audio play on each click
  audio.currentTime = 0;
  audio.play();
  
  tile.classList.add('js-click');
  setTimeout(() => {
    tile.classList.remove('js-click');
  }, 400)
}

function setMessage(msg) {
  let messageBox = document.getElementById('message-box');
  messageBox.textContent = msg;
}

/* 
 * Event Listeners 
 ----------------------*/
startButton.addEventListener('click', startGame);
gameModes.forEach(modeButton => modeButton.addEventListener('click', getGameMode));
simonTiles.forEach(tile => tile.addEventListener('click', humanClick));
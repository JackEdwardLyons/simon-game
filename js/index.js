
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
  round: 0,
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
    disable(gameModes);
    playSequence();
    setMessage('round-count', `Round: ${++gameConfig.round}`)
  } else {
    alert('Please pick a game mode to begin!');
  }
}


function restartGame() {
  console.log('restart');
  gameConfig = {
    score: 0,
    round: 0,
    moves: {
      computer: [],
      human: []
    },
    mode: null,
    gameStarted: false
  }
  enable(gameModes);
  setMessage('message-box', 'Pick a game mode to begin');
  setMessage('round-count', "Jack's Simon Game");
}


function humanError() {
  
}


function playSequence() {
  setMessage("message-box","It's my turn!");
  setMessage('round-count', `Round: ${gameConfig.round}`)
  if (gameConfig.round === 0) {
    // push a random num into computer moves
    randomTile();
  }
  computerClick();
  setMessage("message-box","It's your turn!");
}


function addToSequence() {
  if (gameConfig.round > 19) {
    endgame(); // reset logic to go in endGame
  }
  gameConfig.moves.computer.push(randomTile());
  gameConfig.round++
}



/* 
 * Click Logic 
 ----------------------*/
function humanClick(e) {
  const clickedTile = e.target.offsetParent;
  buzz(clickedTile);
  // push the human move into the human array
  gameConfig.moves.human.push(clickedTile);
  
  console.log("game moves", gameConfig.moves);
  compareClicks();
}


function computerClick() {
  let computerSequence = gameConfig.moves.computer;
  // buzz for each item within the sequence
  computerSequence.forEach((tile, index) => {
    buzz(computerSequence[index]);
  });
  
}


function getGameMode(e) {
  // the offsetParent is because when the button is clicked,
  // it adds a span to create the effects (mui library default) 
  return (e.target.offsetParent.id) === 'normal-mode'
    ? gameConfig.mode = 'normal'
    : gameConfig.mode = 'strict'
}


function compareClicks(e) {
  let computerSequence = gameConfig.moves.computer,
      fistComputerMove = computerSequence[0],
      humanSequence    = gameConfig.moves.human,
      firstHumanMove   = humanSequence[0];
  

//    const comparison = computerSequence.every((tile, index) => {
//      return tile === humanSequence[index];
//    });
    
    if (firstHumanMove !== fistComputerMove) {
      alert('you lose');
      restartGame();
    } else {
      setMessage('message-box', 'Nice work, keep going!');
      console.log('comparison', gameConfig.moves)
      // addToSequence();
      // playSequence();
    }
}


/* 
 * Utility Functions 
 ----------------------*/
function randomTile(tiles = simonTiles) {
  const index = Math.floor( Math.random() * tiles.length );
  const tile = tiles[index];
  // because the computer is the only one generating a random tile,
  // it is reasonable to push the tile into the computer array.
  gameConfig.moves.computer.push(tile);
  return tile;
}


function buzz(tile) {
  const audio = tile.children[0];
  // reset audio play on each click
  audio.currentTime = 0;
  audio.play();
  // add and remove the color change
  tile.classList.add('js-click');
  setTimeout(() => {
    tile.classList.remove('js-click');
  }, 500)
}



/* 
 * DOM Manipulations
 ----------------------*/
function setMessage(el, msg) {
  let messageBox = document.getElementById(el);
  messageBox.textContent = msg;
}

function disable(element) {
  return element.forEach(el => el.disabled = true);
}

function enable(element) {
  return element.forEach(el => el.disabled = false);
}

/* 
 * Event Listeners 
 ----------------------*/
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

gameModes.forEach(modeButton => modeButton.addEventListener('click', getGameMode));
simonTiles.forEach(tile => tile.addEventListener('click', humanClick));
/* Welcome to my code
 * Built by Jack Lyons
 * www.jacklyons.me
 */
 
 
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
  round: 0,
  moves: {
    computer: [],
    human: [],
    copy: []
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
    setMessage('round-count', `Round: ${gameConfig.round = 1}`)
  } else {
    alert('Please pick a game mode to begin!');
  }
}


function restartGame() {
  gameConfig = {
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


function playSequence() {
  setMessage('round-count', `Round: ${gameConfig.round}`)
  if (gameConfig.round === 0) {
    // push a random num into computer moves
    addToSequence();  
  }
  
  setTimeout(() => {
    computerClick();
  }, 1200)
  
  setMessage("message-box","It's my turn!");
  // disallow human clicks during computer clicks
  simonTiles.forEach(tile => tile.style.pointerEvents = 'none');
}


function addToSequence() {
  if (gameConfig.round > 19) {
    setMessage("message-box","You WIN!");
    restartGame(); // reset logic to go in endGame
  }
  
  gameConfig.moves.computer.push(randomTile());
  gameConfig.round++
}


/* 
 * Click Logic 
 ----------------------*/
function humanClick(e) {
  const clickedTile = e.target;
  buzz(clickedTile);
  // push the human move into the human array
  gameConfig.moves.human.push(clickedTile);
  compareClicks();
}


function computerClick() {
  let computerSequence = gameConfig.moves.computer;
  let maxRounds = computerSequence.length;
  
  const delay = (amount) => {
    return new Promise((resolve) => {
      setTimeout(resolve, amount);
    });
  }
  
  async function loop() {
    for (let i = 0; i < maxRounds; i++) {
      buzz(computerSequence[i]);
      await delay(1000);
    }
    setMessage("message-box","It's your turn!");
    simonTiles.forEach(tile => tile.style.pointerEvents = 'auto');
  }
  
  loop();
}


function compareClicks() {
  let computerSequence = gameConfig.moves.computer,
      humanSequence    = gameConfig.moves.human;
      
  
  const comparison = computerSequence.every((tile, index) => {
    return tile === humanSequence[index];
  });


  if (humanSequence.length === computerSequence.length) {
    if (comparison) {
      addToSequence();
      playSequence();
      gameConfig.moves.human = [];
    } else {
      if (gameConfig.mode === 'strict') {
        alert("mismatch, you lose");
        restartGame();
      } else {
        alert('Woops! Try again!');
        playSequence();
        gameConfig.moves.human = [];
      }
    }
  }
}


/* 
 * Utility Functions 
 ----------------------*/
function randomTile(tiles = simonTiles) {
  const index = Math.floor( Math.random() * tiles.length );
  const tile = tiles[index];
  return tile;
}

function getGameMode(e) {
  // the offsetParent is because when the button is clicked,
  // it adds a span to create the effects (mui library default) 
  return (e.target.offsetParent.id) === 'normal-mode'
    ? gameConfig.mode = 'normal'
    : gameConfig.mode = 'strict'
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
  }, 500);

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

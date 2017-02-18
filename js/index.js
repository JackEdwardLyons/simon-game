

let   startButton   = document.querySelector('#start-button'),
      restartButton = document.querySelector('#restart-button'),
      normalMode    = document.querySelector('#normal-mode'),
      strictMode    = document.querySelector('#strict-mode'),
      simonTiles    = document.querySelectorAll('.simon-btn');



let gameConfig = {
  score: 0,
  computerMoves: [],
  humanMoves: [],
  gameMode: null
}

function randomTile(tiles) {
  const index = Math.floor( Math.random() * tiles.length );
  const tile = tiles[index];

  console.log(tile);
}


function buzz(tile) {
  const audio = tile.children[0];
  console.log(audio);
  // reset audio play on each click
  audio.currentTime = 0;
  audio.play();
  tile.classList.add('js-click');
  
  setTimeout(() => {
    tile.classList.remove('js-click');
  }, 400)
  
}

function registerClick(e) {
  buzz(e.target.offsetParent);
}




simonTiles.forEach(tile => tile.addEventListener('click', registerClick));
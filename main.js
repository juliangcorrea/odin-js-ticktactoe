const Gameboard = {
    gameboard: {
      allMoves: ['l1', 'm1', 'r1', 'l2', 'm2', 'r2', 'l3', 'm3', 'r3'],
      gridSize: 3,
      turn: 1,
      tileElement: `
      <div class="move-grid">
        <div class="choice" data-status = "0">
          <svg class="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
          <svg class="ex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>
        </div>
      </div>`
    }
    players: {
      player1Moves: [],
      player2Moves: []
    },
    gameflow: {
      
    }
}




checkWin: function(moves, limitStart = -1 - Gameboard.gameboard.gridSize){
  moves = moves.sort()
  //Chech for diagonal win (needs optimization)
  const checkLeftSide = (moves.filter(item => item[0] == 'l' && item[1] != 2)).map(item => item[1])
  const checkRightSide = (moves.filter(item => item[0] == 'r' && item[1] != 2)).map(item => item[1])
  let tempCheck
  if(checkLeftSide.length > checkRightSide.length){
    if(checkLeftSide.includes(checkRightSide[0])){
      tempCheck = true
    } else {
      tempCheck = false
    } 
  } else if(checkLeftSide.length == checkRightSide.length){
    if(checkLeftSide.includes(checkRightSide[0])){
      tempCheck = false
    } else {
      tempCheck = true
    } 
  } else {
    if(checkRightSide.includes(checkLeftSide[0])){
      tempCheck = true
    } else {
      tempCheck = false
    }
  }
  if(moves.includes('m2') && tempCheck && checkLeftSide.length != 0 && checkRightSide.length != 0){
    return true
  }
  //until all tiles have been selected check for row or column win
  if(moves.length > 0){
    const checkWinCol = moves.filter(item => item[0] == moves[0][0])
    const checkWinRow = moves.filter(item => item[1] == moves[0][1])
    if(checkWinCol.length == 3 || checkWinRow.length == 3) {
      return true
    } else {
      /* Once done the first check, uses the upper-left to bottom-right diagonal as 
        guide (using the total grid size as meassure) to leave out rows and columns 
        to call fucntion recursively*/
      const newLimit = limitStart + Gameboard.gameboard.gridSize + 1 //calculates the next diagonal tile
      const limitMove = Gameboard.gameboard.allMoves[newLimit] //gets the value of the tile
      const newMoves = moves.filter(item => item[0] > limitMove[0] || item[1] > limitMove[1])
      return Gameboard.gameflow.checkWin(newMoves, newLimit)
    }
  }
  return false
},


Game: function(Gameboard.players.player1Moves, Gameboard.players.player2Moves) {
  if (this.checkWin(player1Moves)) {
    setTimeout(() => {
      alert('Player 1 wins!');
      resetGame();
    }, 100);
    return;
  }
  if (this.checkWin(player2Moves)) {
    setTimeout(() => {
      alert('Player 2 wins!');
      resetGame();
    }, 100);
    return;
  }
  if (turn > 9) {
    setTimeout(() => {
      alert('Draw!');
      this.resetGame();
    }, 100);
    return;
  }
}




resetGame: function(){
  document.querySelector('.game-grid').innerHTML = '';
  Player1Moves = [];
  Player2Moves = [];
  Gameboard.gameboard.turn = 1;
  this.addTiles();
}




addTiles: function() {
  const getTileBoard = document.querySelector('.game-grid')
  for(i = 0; i < Gameboard.gameboard.gridSize**2; i++){
    getTileBoard.innerHTML += Gameboard.gameboard.tileElement
  }
  const allTiles = document.querySelectorAll('.move-grid')
  allTiles.forEach(element => {
    element.setAttribute('data-user-move', Gameboard.gameboard.allMoves[Array.from(allTiles).indexOf(element)])
    let tileStatus = element.querySelector('.choice')
    element.addEventListener('click', () => {
      if(Gameboard.gameboard.turn%2 != 0 && tileStatus.dataset.status == '0'){
        element.querySelector('.ex').style.display = 'block'
        Gameboard.gameboard.player1Moves.push(element.dataset.userMove)
        tileStatus.setAttribute('data-status', 1)
        Gameboard.gameboard.turn ++
        Gameboard.gameflow.Game(Gameboard.gameboard.player1Moves, Gameboard.gameboard.player2Moves)
      } else if(Gameboard.gameboard.turn%2 == 0 && tileStatus.dataset.status == '0'){
          element.querySelector('.circle').style.display = 'block'
          Gameboard.gameboard.player2Moves.push(element.dataset.userMove)
          tileStatus.setAttribute('data-status', 2)
          Gameboard.gameboard.turn ++
          Gameboard.gameflow.Game(Player1Moves, Player2Moves)
        }
    })
  });
}
const Gameboard = {
    gameboard: {},
    players: {},
    gameflow: {}
}


// Logic sketch
const allMoves = ['l1', 'l2', 'l3', 'm1', 'm2', 'm3', 'r1', 'r2', 'r3']
const gridSize = 3

function checkWin(moves, limitStart = -1 - gridSize){
  moves = moves.sort()
  //Chech for diagonal win
  const checkLeftSide = moves.filter(item => item[1] == 1)
  const checkRightSide = moves.filter(item => item[1] == 3)
  if(moves.includes('m2') && checkLeftSide.map(item => item[0]).includes(checkRightSide.map(item => item[0])[0]) > 0){
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
      const newLimit = limitStart + gridSize + 1 //calculates the next diagonal tile
      const limitMove = allMoves[newLimit] //gets the value of the tile
      const newMoves = moves.filter(item => !((item[0] == limitMove[0] && item[1] <= limitMove[1]) || item[1] <= limitMove[1]))
      return checkWin(newMoves, newLimit)
    }
  }
  return false
}

function Game(player1, player2){
  let p1 = checkWin(player1)
  let p2 = checkWin(player2)
  if(p1 && !p2){
    return 'Player 1 wins!'
  } else if(!p1 && p2){
    return'Player2 wins!'
  } else if(!p1 && !p2){
    return 'Draw!'
  } else {
    return error
  }
}


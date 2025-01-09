const Gameboard = {
    gameboard: [],
    players: {},
    gameflow: []
}

// Logic sketch

const test = ["l1", "m1", "r1", "l2", "m2", "r2", "l3", "m3", "r3"]

const player1Moves = ['l1', 'm2', 'm3', 'l2', 'r2']
const player2Moves = ['l3', 'r3', 'm1', 'r1']

function sortMoves(playerMoves){
  const sortedMoves = playerMoves.sort()
  return sortedMoves
}

function defWin1(moves){
  moves = sortMoves(moves)
  if(moves.length > 0){
    let temp1 = moves.filter(item => item[0] == moves[0][0])
    if(temp1.length == 3) {
      return true
  } else {
    defWin1(moves.filter(item => !temp1.includes(item)))
  }
  }
  return false
}

function defWin2(moves){
  moves = sortMoves(moves)
  if(moves.length > 0){
    let temp1 = moves.filter(item => item[1] == moves[0][1])
    if(temp1.length == 3) {
      return true
  } else {
    defWin2(moves.filter(item => !temp1.includes(item)))
  }
  }
  return false
}

function defWin3(moves){
  moves = sortMoves(moves)
  let test1 = moves.map(item => item[1])
  if(test1.includes('1') && test1.includes('2') && test1.includes('3')){
    return true
  }
  return false
}

function checkWin(moves){
  if(defWin1(moves) || defWin2(moves) || defWin3(moves)){
    return true
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

Game(player1Moves, player2Moves)
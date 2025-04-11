  // minimax buld whole imaginary game board After u have played in every possible move ,
  // it completes a whole game after ur turn,
  // Let me exeplain u the logic of minimax
  // it's looping on the board and search for empty cells and build tree of propabiltys 
  // to every cell until any player win or draw it will stop then give number foreach state
  // x take -1 
  // o take  1  
  // draw take 0
  // let x win in last prop fore example 
  // it will brin -1 to first recursive and saw that move lead to x win

  // simple example
  // after u have put x in index [0] ,it puts o in index [1] On its way to try all the possibilities
  // X  |  O  |  
  // -------------
  //    |     |  
  // -------------
  //    |     |  
  // then recursive the function , it choose index [2] to put x in , 
  // X  |  O  |  X
  // -------------
  //    |     |  
  // -------------
  //    |     |  
  // it will recursive that to fill whole board 
  // then undo whole trun exept bestmove
  
  // Then it trys another propability by choose another index after u put in index [0]
  // it will choose index 2 to build whole game recursivly
  //  X |    | O 
  // -------------
  //    |    |  
  // -------------
  //    |    |   
  // it will do that until try every cell then give scores for them
  //
  // x take -1
  // o take  1
  // draw take 0
  //
  //in our condition o will search for max number 1  

  
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restart');
const turn_ele =document.querySelector('.turn-restart h1 span')
const score_x = document.querySelector('#x')
const score_o = document.querySelector('#o')



let board = ['', '', '',  '', '', '','', '', ''];
const PLAYER_X = 'X'
const PLAYER_O = 'O'
let gameActive = true
let startFirst = PLAYER_X
let turn = ''
let timeOut = 300

function createBoard() {// this function fill every '' in arry board to html elements
  boardElement.innerHTML = ''; // make sure there is no element inside board
  board.forEach((cell,index)=>{
    const cell_ele = document.createElement('div');
    cell_ele.classList.add('box')
    cell_ele.textContent = cell
    cell_ele.addEventListener('click',()=> handleCellClick(index)) 
    boardElement.appendChild(cell_ele)
  })
  
}


function handleCellClick(index) {
  if (board[index] !== '' || !gameActive || (startFirst!=PLAYER_X && board.every(cell => cell))) return; // Don't allow move if cell is taken or game is over

  board[index] = PLAYER_X
  createBoard() 
  if (isGame_over()){afterWin(PLAYER_X);return}
  setTimeout(aiMove,200)
  
}


function aiMove(){
  let bestMove = minimax(board , 0 , true)
  board[bestMove.index] = PLAYER_O
  createBoard() 
  if (isGame_over()){afterWin(PLAYER_O);return;}
}

function minimax(board , depth , ismax){
  const scores = {
    [PLAYER_X]: -1,
    [PLAYER_O]: 1,
    draw: 0,
  };

  // stopping condition , there is no another problity in XO game exept win , loose , draw
  if (checkWinner(PLAYER_X)) return {score:scores[PLAYER_X] , index:-1}
  if (checkWinner(PLAYER_O)) return {score:scores[PLAYER_O] , index:-1}
  if (board.every(cell => cell)) return {score:scores.draw , index:-1}

  //put worst case score to every player
  let bestMove = {score : ismax? -Infinity : Infinity,index:-1} 
  
  for(let index=0; index<board.length;index++){
    if (!board[index]){ // If the cell is empty
      // simulate move
      board[index] = ismax? PLAYER_O:PLAYER_X
      
      // recusivly call minimax with new board stae
      const result = minimax(board ,depth +1,!ismax)
      board[index] = ''

       // update bestMove if this is a better move
      if(ismax && result.score > bestMove.score || !ismax && result.score < bestMove.score ){
        bestMove = {score: result.score , index:index}
      }

    }
  }
  return bestMove
}


function isGame_over() {
  let condition = checkWinner(PLAYER_X) || checkWinner(PLAYER_O) || board.every(cell=>cell)
  gameActive = condition ? false:true
  if (condition){
      handelTurn();
      turn_ele.innerHTML = 'Game over!'  
      turn = '' 
  }

  return condition
  
}

function checkWinner(player){
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; 

return(winningConditions.some((e)=> e.every((i)=> board[i] === player && board[i] !== '')));
}

function afterWin(player) {
  if(checkWinner(player)){
    if (player==PLAYER_O)sessionStorage.o=+sessionStorage.o+1;
    else sessionStorage.x=+sessionStorage.x+1;
    score();
  }
  setTimeout(()=> {
    alert('Game Over! ' + (checkWinner(player) ?(player==PLAYER_O?'AI Win!':'You win!') : 'It\'s a Draw!'));
    startFirst=startFirst=='X'?'O':'X'
    restart()
  },timeOut )
}

function restart(btn=false) {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true
  createBoard()
  setTimeout(()=>{
    if(!btn){
      handelTurn()
      if (startFirst==PLAYER_O){
        setTimeout(() => {
          // make ai play good random move at first ,when turn on ai
          const goodStartMoves = [0,2,4,6,8] // all good start moves in xo game
          let random = Math.floor(Math.random()*goodStartMoves.length)
          board[goodStartMoves[random]] = PLAYER_O // pick up random move
          createBoard()
        }, timeOut);
      }
    }
  },timeOut )
  
}
function handelTurn() {
  turn = turn=='X'? 'O': (turn=='O'?'X':startFirst)
  turn_ele.innerHTML = turn
  
}
function score() {
  // initial value for score
  score_x.innerHTML = sessionStorage.x?sessionStorage.x:(0,sessionStorage.x = 0) 
  score_o.innerHTML = sessionStorage.o?sessionStorage.o:(0,sessionStorage.o = 0)
  
}


/////////////////////////////////////////////////////////////////////////calling
restartButton.onclick = ()=> restart(true)
createBoard()
score()





/// for two player
    // function handleCellClick(index) {
    //   if (board[index] !== '' || !gameActive) return;
    
    //   // Update the board with the current player's move
    //   board[index] = currentPlayer;
    
    //   // Check for a winner first
    //   if (checkWinner(currentPlayer)) {
    //       let winner = currentPlayer // currentPlayer will change in line:161 before calling alert due to timeout
    //       setTimeout(()=> {alert(winner + ' is the winner!');restart()},200)
    //       gameActive = false;
    //   } else if (board.every((cell) => cell !== '')) {
    //       // Check for a draw if no winner
    //       setTimeout(()=>{ alert('Draw!');restart()},200)
    //       gameActive = false; // This line ensures no further moves can be made
    //   } 
    //   // Switch players if no winner or draw
    //   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    
    //   // Update the board display
    //   createBoard();
    // }

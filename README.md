# ❌⭕ minimax-xo

A classic **Tic-Tac-Toe** game with an unbeatable AI powered by the **Minimax algorithm**. Challenge yourself and try to win!

## 🚀 Features

- Smart AI using the Minimax algorithm
- Clean and responsive UI
- Single-player mode (you vs. AI)
- Lightweight and fast
- and I bet you won't be able to win vs him

## 🧠 How Minimax Works

The AI evaluates all possible game states and chooses the optimal move, ensuring it never loses. Great for learning how decision-making algorithms work in games.

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

## 🛠️ Tech Stack

- HTML / CSS / JavaScript *(or replace with React, Vue, etc. if you're using one)*
- Minimax algorithm for AI logic


## 📄 License
MIT License © 2025 Yahia Badr

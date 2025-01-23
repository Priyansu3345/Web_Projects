import { use, useState } from 'react';

function Square ({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ isNext, square, onPlay }) {

  function handleClick(i) {
    if(square[i] || Winner(square)){
      return
    }
    const nextSquare = square.slice()
    if(isNext){
      nextSquare[i] = "X"
    }
    else{
      nextSquare[i] = "O"
    }
    onPlay(nextSquare)
  }


  const gameWinner = Winner(square)
  let status
  if(gameWinner){
    status = "Winner:"+gameWinner
  }
  else{
    status = "Next player: "+(isNext ? "X":"O")
  }
  return(
  <>
    <div className='status'>{status}</div>
    <div className="board-row">
      <Square value = { square[0] } onSquareClick={ () => handleClick(0)}/>
      <Square value = { square[1] } onSquareClick={ () => handleClick(1)}/>
      <Square value = { square[2] } onSquareClick={ () => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value = { square[3] } onSquareClick={ () => handleClick(3)}/>
      <Square value = { square[4] } onSquareClick={ () => handleClick(4)}/>
      <Square value = { square[5] } onSquareClick={ () => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value = { square[6] } onSquareClick={ () => handleClick(6)}/>
      <Square value = { square[7] } onSquareClick={ () => handleClick(7)}/>
      <Square value = { square[8] } onSquareClick={ () => handleClick(8)}/>
    </div>
  </>
  );
}


function Winner(square){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0;i < lines.length;i++){
    const[a,b,c] = lines[i]
    if(square[a] && square[a] == square[b] && square[a] == square[c]){
      return square[a]
    }
  }
  return null   
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const isNext = currentMove % 2 === 0
  const currentSquare = history[currentMove]
  
  function handlePlay(nextSquare) {
    const nextHistory = ([...history.slice(0,currentMove+1), nextSquare])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function JumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  const moves = history.map((square, move) => {
    let description;
    if ( move > 0){
      description = 'Go to move #' + move;
    }
    else{
      description = "Go to start"
    }

    return(
      <li key={move}><button onClick={() => JumpTo(move)}>{ description }</button></li>
    )
  })

  
  return(
    <div className='game' >
      <div className='game-board'>
        <Board isNext = {isNext} square = {currentSquare} onPlay = { handlePlay } />
      </div>
      <div className='game-info'>
        <ol>{ moves }</ol>
      </div>

    </div>
  )
}
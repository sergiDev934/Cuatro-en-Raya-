import { useState } from "react";
import "./App.css";
import { TURNS } from "./constants.js";
import { Circle } from "./components/circle.jsx";
import { checkWinner, checkDraw } from "./logic/board.js";

export function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(20).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return `${TURNS[turnFromStorage]}`;
    return TURNS.red;
  });
  const [winner, setWinner] = useState(null); //FALSE EMPATE

  const checkDown = (index) => {
    if (board[index + 5] !== null) {
      const newBoard = board;
      newBoard[index] = turn;
    } else {
      checkDown(index + 5);
    }
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    //cambiar tablero
    checkDown(index);

    // comprobar ganador
    const posibleWinner = checkWinner(board);
    if (posibleWinner) setWinner(true);
    else {
      // comprobar empate
      const posiblyDraw = checkDraw(board);
      if (posiblyDraw) setWinner(false);
    }
    // cambio de turno
    const newTurn = turn === TURNS.red ? TURNS.yellow : TURNS.red;
    setTurn(newTurn);

    // Almacenar datos en el localStorage
    window.localStorage.setItem("board", JSON.stringify(board));
    window.localStorage.setItem("turn", newTurn);

    // console.log(`Ahora le toca a ${newTurn}`);
  };

  const resetGame = () => {
    setTurn(TURNS.red);
    setBoard(Array(20).fill(null));
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const modalFnc = () => {
    let className = `noWin ${winner !== null ? "winModal" : ""}`;
    return className;
  };

  return (
    <main className="board">
      <h1>Cuatro En Raya</h1>
      <button className="resetGame" onClick={resetGame}>
        Start Again
      </button>
      <section className="gameContainer">
        <div className="game">
          {board.map((_, index) => {
            return (
              <Circle key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Circle>
            );
          })}
        </div>
        <div className="turn">
          <Circle isSelected={turn === TURNS.red}>red</Circle>
          <Circle isSelected={turn === TURNS.yellow}>yellow</Circle>
        </div>
      </section>
      <section className={modalFnc()}>
        <div className="modal">
          <h1>
            {winner === false ? "It's a draw, nobody wins" : "The Winner is:"}
          </h1>
          <Circle>
            {winner ? (turn === TURNS.red ? TURNS.yellow : TURNS.red) : "-"}
          </Circle>
          <button className="resetGame" onClick={resetGame}>
            Reset the Game
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;

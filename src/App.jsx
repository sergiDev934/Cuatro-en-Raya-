import { useState, useEffect } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

export function App() {
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(42).fill(null));

  const checkDown = (index) => {
    if (board[index + 7] !== null) {
      const newBoard = board;
      newBoard[index] = turn;
      setBoard(newBoard);
    } else {
      checkDown(index + 7);
    }
  };

  const updateBoard = (index) => {
    if (board[index]) return;

    //cambiar tablero
    checkDown(index);

    // cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // console.log(`Ahora le toca a ${newTurn}`);
  };

  const Circle = ({ children, index, updateBoard, isSelected }) => {
    const handleClick = () => {
      updateBoard(index);
    };
    const className = `circle ${isSelected ? "is-selected" : ""}`;
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };
  return (
    <main className="board">
      <h1>Cuatro En Raya</h1>
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
          <Circle isSelected={turn === TURNS.X}>x</Circle>
          <Circle isSelected={turn === TURNS.O}>o</Circle>
        </div>
      </section>
    </main>
  );
}

export default App;

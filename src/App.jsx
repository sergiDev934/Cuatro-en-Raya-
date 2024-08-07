import { useState, useEffect } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

const COMBO_WINS = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [6, 7, 8, 9],
  [10, 11, 12, 13],
  [11, 12, 13, 14],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [0, 5, 10, 15],
  [1, 6, 11, 16],
  [2, 7, 12, 17],
  [3, 8, 13, 18],
  [4, 9, 14, 19],
  [0, 6, 12, 18],
  [1, 7, 13, 19],
  [3, 7, 11, 15],
  [4, 8, 12, 16],
];

export function App() {
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(20).fill(null));
  const [winner, setWinner] = useState(null); //FALSE EMPATE

  const checkDown = (index) => {
    if (board[index + 5] !== null) {
      const newBoard = board;
      newBoard[index] = turn;
      setBoard(newBoard);
    } else {
      checkDown(index + 5);
    }
  };

  const checkWinner = () => {
    COMBO_WINS.map((combo) => {
      const [a, b, c, d] = combo;
      if (
        board[a] === board[b] &&
        board[a] === board[c] &&
        board[a] === board[d]
      )
        return board[a];
    });
    return null;
  };

  const updateBoard = (index) => {
    if (board[index]) return;

    //cambiar tablero
    checkDown(index);

    // comprobar ganador
    const posibleWinner = checkWinner();
    if (posibleWinner) setWinner(true);

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

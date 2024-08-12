import { useState } from "react";
import "./App.css";

const TURNS = {
  red: "red",
  yellow: "yellow",
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
  const [turn, setTurn] = useState(TURNS.red);
  const [board, setBoard] = useState(Array(20).fill(null));
  const [winner, setWinner] = useState(null); //FALSE EMPATE

  const checkDown = (index) => {
    if (board[index + 5] !== null) {
      const newBoard = board;
      newBoard[index] = turn;
    } else {
      checkDown(index + 5);
    }
  };

  const resetGame = () => {
    setTurn(TURNS.red);
    setBoard(Array(20).fill(null));
    setWinner(null);
  };

  const checkWinner = () => {
    let winnerPos = null;
    COMBO_WINS.map((combo) => {
      const [a, b, c, d] = combo;
      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c] &&
        board[a] === board[d]
      ) {
        winnerPos = board[a];
      }
    });
    return winnerPos;
  };

  const checkDraw = () => {
    let posiblyDraw = true;
    board.map((circle) => {
      if (circle === null) {
        posiblyDraw = false;
      }
    });
    return posiblyDraw;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    //cambiar tablero
    checkDown(index);

    // comprobar ganador
    const posibleWinner = checkWinner();
    if (posibleWinner) setWinner(true);
    else {
      // comprobar empate
      const posiblyDraw = checkDraw();
      if (posiblyDraw) setWinner(false);
    }

    // cambio de turno
    const newTurn = turn === TURNS.red ? TURNS.yellow : TURNS.red;
    setTurn(newTurn);

    // console.log(`Ahora le toca a ${newTurn}`);
  };

  const Circle = ({ children, index, updateBoard, isSelected }) => {
    const handleClick = () => {
      updateBoard(index);
    };
    const className = `circle ${isSelected ? "is-selected" : ""}`;
    const back = `insideCircle ${
      children === null
        ? ""
        : children === "red"
        ? "red"
        : children === "yellow"
        ? "yellow"
        : ""
    }`;

    return (
      <div className={className} onClick={handleClick}>
        <div className={back}></div>
      </div>
    );
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

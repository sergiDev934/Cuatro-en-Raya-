import { COMBO_WINS } from "../constants";

export const checkWinner = (board) => {
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

export const checkDraw = (board) => {
  let posiblyDraw = true;
  board.map((circle) => {
    if (circle === null) {
      posiblyDraw = false;
    }
  });
  return posiblyDraw;
};

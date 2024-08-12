export const Circle = ({ children, index, updateBoard, isSelected }) => {
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

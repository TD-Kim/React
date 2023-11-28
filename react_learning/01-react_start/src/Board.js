import Dice from "./Dice";

// function Board({ name, color, num, sum, gameHistory }) {
function Board({ name, color, gameHistory }) {
  const num = gameHistory[gameHistory.length - 1] || 1;
  // a || b ==> a가 truthy 이면 a 가 결과값으로 나오고 a가 falsy 값인 경우 b가 결과값으로 나온다.
  // falsy ==> null, NaN, 0, 빈 문자열, undefined
  const sum = gameHistory.reduce((a, b) => a + b, 0);
  return (
    <div>
      <h2>{name}</h2>
      <Dice color={color} num={num} />
      <h2>총점</h2>
      <p>{sum}</p>
      <h2>기록</h2>
      <p>{gameHistory.join(", ")}</p>
    </div>
  );
}

export default Board;

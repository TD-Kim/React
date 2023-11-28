import { useState } from "react";
import Button from "./Button";
import Board from "./Board";

/* 
  리액트 컴포넌트에 전달된 속성들을 props 라고 한다.
  전달된 props 는 하나의 객체형태로 컴포넌트 함수의 첫 번째 파라미터로 전달된다. 
  아래 num 은 자바스크립트 숫자 2로 그냥 2로 쓰면 에러가 난다. 반드시 중괄호로 묶어야함
  리액트 컴포넌트에서 기본적으로 가지고 있는 prop 로 'children' 이 있음
  children 은 컴포넌트의 자식들을 값으로 갖는 prop

  State
  던지기 버튼을 누르면 화면에서 주사위 이미지가 바뀌어야함. ==> HTML 로 작성한다면 주사위 이미지 마다 화면을 만들거나
  비동기로 요소를 추가, 삭제 하는 코드를 작성해야한다.
  리액트에서는 State 라는것을 사용. State는 리액트에서 변수 같은 건데 이 State를 바뀔 때 마다 리액트가 알아서 화면을 새로 렌더링 해준다.
  useState() 함수를 import 할 때 함수형태이기 때문에 반드시 객체형으로(중괄호로 감싸서) import 해야한다.
  useState() 함수는 실행된 다음 배열의 형태로 요소 두 개를 리턴한다.
  state를 사용할때는 아래 num 이라는 변수에 새로운 값을 할당하는게 아니라 반드시 setNum 함수를 사용해야한다.
*/
/*
function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  const [num, setNum] = useState(1);
  const [sum, setSum] = useState(0);
  // 배열은 참조형이다. 그래서 gameHistory 변수는 기록들을 가진 배열 자체를 값으로 갖는게 아니라
  // 그 배열을 가리키고 있는 주소값을 가지고 있는것. 그렇기 때문에 메소드를 이용해서 배열의 새로운 요소를 집어넣더라도
  // gameHistory 변수가 가지고 있는 배열의 주소값은 전혀 변하지 않은 것이다.
  // 그래서 배열이나 객체같은 참조형 타입의 State를 변경할 때는 아예 새롭게 만든다고 생각하는 것이 좋음.
  // 가장 간단한 방법은 Spread 문법을 활용하는 것이다.
  const [gameHistory, setGameHistory] = useState([]);

  const handleRollClick = () => {
    const nextNum = random(6);
    // setNum(nextNum);
    // setSum(sum + nextNum);
    setNum(nextNum);
    setSum(sum + nextNum);
    // gameHistory.push(nextNum);
    // setGameHistory(gameHistory);
    setGameHistory([...gameHistory, nextNum]);
  };

  const handleClearClick = () => {
    setNum(1);
    setSum(0);
    setGameHistory([]);
  };

  return (
    <div>
      <div>
        <Button onClick={handleRollClick}>던지기</Button>
        <Button onClick={handleClearClick}>처음부터</Button>
      </div>
      <div>
        <h2>나</h2>
        <Dice color="red" num={num} />
        <h2>총점</h2>
        <p>{sum}</p>
        <h2>기록</h2>
        <p>{gameHistory.join(", ")}</p>
      </div>
    </div>
  );
}
*/

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  // Board.js 에 있는 State를 옮겨온다. ==> 한 곳에서 관리하기 위해
  // 이렇게 자식 컴포넌트의 State를 부모 컴포넌트로 올려 주는걸 State Lifting 이라고 한다.
  // 내 주사위, 점수
  // const [num, setNum] = useState(1);
  // const [sum, setSum] = useState(0);
  // const [gameHistory, setGameHistory] = useState([]);

  // 상대 주사위, 점수
  // const [otherNum, setOtherNum] = useState(1);
  // const [otherSum, setOtherSum] = useState(0);
  // const [otherGameHistory, setOtherGameHistory] = useState([]);

  const [myHistory, setMyHistory] = useState([]);
  const [otherHistory, setOtherHistory] = useState([]);

  const handleRollClick = () => {
    // const nextNum = random(6);
    // const nextOtherNum = random(6);
    // setNum(nextNum);
    // setSum(sum + nextNum);
    // setGameHistory([...gameHistory, nextNum]);
    // setOtherNum(nextOtherNum);
    // setOtherSum(sum + nextOtherNum);
    // setOtherGameHistory([...otherGameHistory, nextOtherNum]);
    const nextMyNum = random(6);
    const nextOtherNum = random(6);
    setMyHistory([...myHistory, nextMyNum]);
    setOtherHistory([...otherHistory, nextOtherNum]);
  };

  const handleClearClick = () => {
    // setNum(1);
    // setSum(0);
    // setGameHistory([]);
    // setOtherNum(1);
    // setOtherSum(0);
    // setOtherGameHistory([]);
    setMyHistory([]);
    setOtherHistory([]);
  };

  return (
    <div>
      <div>
        <Button onClick={handleRollClick}>던지기</Button>
        <Button onClick={handleClearClick}>처음부터</Button>
      </div>
      <div>
        {/*
        <Board
          name="나"
          color="blue"
          num={num}
          sum={sum}
          gameHistory={gameHistory}
        />
        <Board
          name="상대"
          color="red"
          num={otherNum}
          sum={otherSum}
          gameHistory={otherGameHistory}
        />
      */}
        <Board name="나" color="blue" gameHistory={myHistory} />
        <Board name="상대" color="red" gameHistory={otherHistory} />
      </div>
    </div>
  );
}

export default App;

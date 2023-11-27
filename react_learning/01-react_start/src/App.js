import Dice from "./Dice";

// 리액트 컴포넌트에 전달된 속성들을 props 라고 한다.
function App() {
  return (
    <div>
      {/* 전달된 props 는 하나의 객체형태로 컴포넌트 함수의 첫 번째 파라미터로 전달된다. */}
      <Dice color="red" />
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
// import Cleanup from "./Cleanup";
// import ToDoList from "./ToDoList";
// import CoinTracker from "./CoinTracker";
// import MovieApp from "./MovieApp";
import ReactRouter from "./ReactRouter";

ReactDOM.render(
  // <App />
  // <Cleanup />
  // <ToDoList />
  // <CoinTracker />
  // <MovieApp />
  <ReactRouter />,
  document.getElementById("root")
);

// rendering이 두번되는 현상이 있어서 찾아보았더니 index.js에
// React.StrictMode 태그에 감싸져 있어서 그렇다고 합니다.
// StrictMode는 create-react-app로 설치했을 때 기본적으로 생성되는 태그로,
// 해당 태그로 감싸져 있는 경우 자손까지 검사한다해서 두 번 실행된다고 합니다.
// React.StrictMode 테그를 지우시고 해보세요.

// 해당 태그로 감싸져 있는 경우에는 코드의 문제를 감지하고 경고하기 위해서
// 구성 요소를 두 번 렌더링 한다고 합니다.(개발용이 아닌 프로덕션용)

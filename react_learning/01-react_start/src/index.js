import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// JSX는 자바스크립트의 확장문법. 실행될 때 자바스크립트 코드로 변환되어 실행된다.
// JSX 문법을 활용할 때는 반드시 하나의 요소로 감싸주어야 한다.
// JSX 에서는 객체지향 개념이 적용되기 때문에 class가 아니라 className 으로 써야한다.
// for ==> htmlFor, onblur ==> onBlur, onfocus ==> onFocus, onclick ==> onClick
// 리엑트 엘리먼트 즉, JSX문법으로 작성한 요소는 결과적으로 자바스크립트 객체가 된다.
// 함수형 컴포넌트 : 컴포넌트를 함수형으로 만든것(변수형태로 만들수도 있음) but 이때의 함수명은 반드시 첫글자가 대문자여야 하고,
//                   JSX 문법으로 만든 리액트 엘리먼트를 리턴해 줘야 한다.
// const product = "MacBook";
// root.render(
//   <>
//     {/* div 가 생기는게 싫다면 이렇게 Fragment 를 사용할 수 있고, 축약형으로 꺽쇠안에 아무것도 안넣어도 된다. */}
//     <h1>나만의 {product} 주문하기</h1>
//     <h1 id="title">가 위 바 위 보</h1>
//     <button className="hand">가위</button>
//     <button className="hand">바위</button>
//     <button className="hand">보위</button>
//   </>
// );
root.render(
  <>
    <App />
  </>
);

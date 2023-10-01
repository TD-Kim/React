const Laptop1 = (props) => {
  return (
    <>
      <h3>내 노트북은 {props.brand} 노트북입니다.</h3>
      <h3>내 노트북의 OS는 {props.os} 입니다.</h3>
    </>
  );
};
const Laptop2 = ({ brand, os }) => {
  return (
    <>
      <h3>내 노트북은 {brand} 노트북입니다.</h3>
      <h3>내 노트북의 OS는 {os} 입니다.</h3>
    </>
  );
};
const Laptop3 = ({ brand, os, graphic }) => {
  return (
    <>
      <h3>내 노트북은 {brand} 노트북입니다.</h3>
      <h3>내 노트북의 OS는 {os} 입니다.</h3>
      <h3>내 노트북의 그래픽카드는 {graphic} 입니다.</h3>
    </>
  );
};
Laptop3.defaultProps = {
  brand: "애플",
  os: "Linux",
  graphic: "GTX4080",
};
const Wrapper = (props) => {
  console.log(props);
  return <h3>{props.children.length}</h3>;
};

const Data = () => {
  return (
    <div>
      <h1>데이터 관리</h1>
      <ul>
        <li>
          Prop
          <br />
          props는 함수에서 인수(argument)의 개념과 비슷하게 이해할 수 있다.
          props는 컴포넌트에 데이터를 전달하고자 할 때 사용하며, 이렇게 전달된
          값은 변수를 통해 참조할 수 있다. 전달된 props를 사요하는 방법은
          자바스크립트 함수에 인수를 전달하는 문법과 동일하다. 또한 props는 객체
          형태로 전달되기 때문에 props의 값을 참조하기 위해서는 자바스크립트의
          속성 접근자(.)를 사용해야 한다.
          <Laptop1 brand="Samsung" os="window" />
          <Laptop2 brand="Samsung" os="window" />
          <Laptop3 brand="LG" os="window" />
          <Wrapper>
            <Laptop1 brand="Samsung" os="window" />
            <Laptop2 brand="Samsung" os="window" />
            <Laptop3 brand="LG" os="window" />
          </Wrapper>
        </li>
      </ul>
    </div>
  );
};

// props는 읽기 전용이다.
// props는 부모 컴포넌트에서 그 값을 설정하므로, 자식 컴포넌트에서는 해당
// props를 읽을 수 밖에 없다. 만약 해당 props의 값을 변경하고 싶다면
// 부모 컴포넌트에서 그 값을 다시 설정해야 한다.

// 반면에 다음 함수는 동일한 입력값을 받아도 변수 c에 따라 결과값이
// 달라질 수 있기 때문에 순수 함수가 아닌 비순수 함수라고 부른다.
// 비순수 함수(impure function)의 예시
// let c = 5;
// function Add(a, b) {
//   return a + b + c;
// }
// React에서는 모든 컴포넌트가 자신의 props를 다룰 때 반드시 이와 같은
// 순수 함수처럼 동작할 것을 요구하고 있다. 물론 실제 애플리케이션에서
// UI는 언제나 동적으로 변화하기 때문에 사용자의 입력, 네트워크 응답이나
// 다른 엘리먼트에 대한 응답에 따라 값을 수정해야 할 필요가 생길 수 있다.
// React에서는 이러한 경우 상태(state)라는 개념을 사용하여 이 문제를
// 해결하고 있다.

export default Data;

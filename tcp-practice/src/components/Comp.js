import React from "react";

const Comp = () => {
  return (
    <div>
      <h1>컴포넌트</h1>
      <ul>
        <li>엘리먼트</li>
        <li>컴포넌트</li>
        <li>export와 import</li>
      </ul>
    </div>
  );
};

// class test extends React.Component {
//   render() {
//     return <h1>ttt</h1>;
//   }
// }

// 위와 같이 React 애플리케이션에는 id 속성값이 root인 <div>요소가 하나 존재합니다.
// 이를 루트 DOM 노드(Root DOM Node)라고 부르며, 이 내부에 들어가는 모든
// 요소들은 React DOM에서 관리하게 됩니다.

export default Comp;

// State
// React에서는 props와 state라는 객체를 가지고 데이터를 다루게 된다.
// 두 객체 모두 View를 렌더링하는데 사용되는 데이터를 가지고 있다는 공통점을
// 가지고 있지만, 한 가지 중요한 차이점이 있다.

import { useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

// props는 함수의 매개변수처럼 부모 컴포넌트로부터 데이터를 전달받지만,
// state는 함수 내에서 선언된 변수처럼 컴포넌트 내에서 관리된다는 점이다.
// 따라서 컴포넌트에서는 props의 값을 변경할 수 없지만, state의 값은
// 변경할 수 있다.

// React v16.8 이전까지는 함수 컴포넌트에서는 state를 사용할 수 없었다.
// 따라서 state를 사용하기 위해서는 어쩔 수 없이 클래스 컴포넌트를
// 사용해야 했지만, React v16.8 부터 도입된 useState Hook을 사용하면
// 함수 컴포넌트에서도 state를 사용할 수 있게 되었다.

const Counter = () => {
  // 0을 쵝값으로 하는 state 생성
  const [state, setState] = useState(0);

  return (
    <div>
      <h3>State 값 : {state}</h3>
      {/* setState를 사용하여 state의 값을 1씩 증가시킴 */}
      <button onClick={() => setState(state + 1)}>1씩 증가</button>
    </div>
  );
};

const Area = () => {
  const [size, setSize] = useState({ width: 200, height: 100 });
  return (
    <div>
      <h3>
        너비 : {size.width}, 높이 : {size.height}
      </h3>
      <button
        onClick={() => {
          const copy = { ...size };
          copy.width += 20;
          setSize(copy);
        }}
      >
        너비증가
      </button>
      <button
        onClick={() => {
          const copy = { ...size };
          copy.height += 10;
          setSize(copy);
        }}
      >
        높이증가
      </button>
    </div>
  );
};

const List = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="counter">Counter 증가</Link>
        </li>
        <li>
          <Link to="area">Area 증가</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const State = () => {
  return (
    <>
      <h1>State</h1>
      <Routes>
        <Route path="" element={<List />}>
          <Route path="counter" index element={<Counter />} />
          <Route path="area" element={<Area />} />
        </Route>
      </Routes>
    </>
  );
};

// state를 직접 수정해서는 안된다.
// React에서 state를 사용할 때에는 몇 가지 주의해야 할 사항들이 있다.
// React에서는 참조 타입인 객체나 배열의 경우 불변성(immutability)을
// 지켜야만 한다. 즉, 객체나 배열을 직접 수정해서는 안된다는 의미이며,
// 해당 객체를 업데이트 하기 위해서는 원하는 값으로 새로운 객체를 만들어
// 덮어쓰는 방식으로 업데이트 해야만 한다.
// 그 이유는 렌더링에서의 최적화 방식 때문이다. React에서는 부모 컴포넌트가
// 업데이트 될 경우에 해당 컴포넌트의 자식 컴포넌트들도 모두 함께 리렌더링
// 된다. React의 Virtual DOM은 특정 컴포넌트의 업데이트 필요성을 컴포넌트가
// 가지고 있는 이전의 state 값과 새로 업데이트 된 state 값을 비교하여 판단한다.
// 즉, 불변성이 지켜지지 않는다면 개겣나 배열의 내부 데이터가 변경되어도
// React는 해당 데이터가 바뀐것을 감지하지 못하게 되는 것이다.

export default State;

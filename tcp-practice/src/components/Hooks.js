import { createContext, useContext, useRef, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./styles.css";

const WhatIsHooks = () => {
  return (
    <div>
      <h3>Hooks 개요</h3>
      <p>
        Hook이란? <br></br>Hook은 React v16.8 부터 새롭게 도입된 기능으로, 이를
        활용하면 클래스 컴포넌트를 작성할 필요 없이 함수 컴포넌트에서도 state
        관리와 생명 주기(lifecycle) 메소드 등 여러 다양한 React 기능들을 사용할
        수 있다. Hook은 state, context, ref, lifecycle 등과 같은 다양한 React
        개념을 사용자가 손쉽게 사용할 수 있도록 좀 더 직관적인 API(내장 Hook)를
        제공합니다. 또한, 컴포넌트 사이의 state 관련 로직을 재사용하기 위해
        사용자가 직접 자신만의 Hook을 만들어 사용할 수도 있다.<br></br>
        <br></br>
        Hook의 사용 규칙<br></br> Hook을 사용할 때는 반드시 다음 두 가지 규칙을
        지키면서 사용해야만, Hook이 제대로 동작할 수 있다. <br></br>1. Hook은
        반복문이나 조건문, 중첩된 함수 등에서 호출해서는 안되며, 반드시
        컴포넌트의 최상위 레벨에서 호출해야 한다. <br></br>2. Hook은 일반
        자바스크립트 함수에서 호출해서는 안되며, React의 함수 컴포넌트 내에서만
        호출해야 한다.
      </p>
    </div>
  );
};

const StateHooks = () => {
  const Counter = () => {
    // 0을 초기값으로 하는 state와 setState() 함수 생성
    const [state, setState] = useState(0);

    return (
      <div>
        <h4>State 값 : {state}</h4>
        {/* setState() 함수를 사용하여 state의 값을 1씩 증가시킴 */}
        <button onClick={() => setState(state + 1)}>1씩 증가</button>
      </div>
    );
  };

  return (
    <div>
      <h3>State Hooks</h3>
      <p>
        State Hooks<br></br> React 컴포넌트는 state를 활용하여 가변적인
        상태(state)를 기억할 수 있다. 예를 들어, Form 컴포넌트는 사용자 입력을
        저장하기 위해 state를 사용할 수 있으며, Counter 컴포넌트는 현재 카운터를
        저장하기 위해 state를 사용할 수 있다.<br></br>
        <br></br> React에서 함수 컴포넌트에 state를 추가하려면 다음 Hook 중
        하나를 사용하면 된다.<br></br> 1. useState는 사용자가 직접 업데이트할 수
        있는 state 변수를 선언한다.<br></br> 2. useReducer는 reducer 함수 내부의
        업데이트 로직을 사용하여 state 변수를 선언한다.
      </p>
      <Counter />
    </div>
  );
};

const ContextHooks = () => {
  const HelloContext = createContext();

  const FirstComponent = ({ content }) => {
    return <SecondComponent />;
    // return <SecondComponent content={content} />;
  };

  const SecondComponent = ({ content }) => {
    return <ThirdComponent />;
    // return <ThirdComponent content={content} />;
  };

  const ThirdComponent = ({ content }) => {
    return <ComponentRequiringData />;
    // return <ComponentRequiringData content={content} />;
  };

  const ComponentRequiringData = ({ content }) => {
    const value = useContext(HelloContext);
    return (
      <HelloContext.Consumer>
        {(value) => <h1>{value}</h1>}
      </HelloContext.Consumer>
    );
    // return <h1>{content}</h1>;
  };

  const ThemeContext = createContext("light");

  const ChangeTheme = () => {
    const [theme, setTheme] = useState("light");
    return (
      <>
        {/* ThemeContext를 구독하고 있는 하위 레벨의 컴포넌트들에게 value값을 전달함 */}
        <ThemeContext.Provider value={theme}>
          <Box text="Hello, React!">테마를 변경해 봅시다!</Box>
        </ThemeContext.Provider>
        <button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          테마 변경하기
        </button>
      </>
    );
  };

  const Box = ({ text, children }) => {
    //ThemeContext를 theme라는 이름으로 구독함
    const theme = useContext(ThemeContext);
    const className = "box-" + theme;
    return (
      <section className={className}>
        <h1>{text}</h1>
        {children}
      </section>
    );
  };

  return (
    <div>
      <h3>Context란?</h3>
      <p>
        React에서 컴포넌트가 데이터를 다루는 방법에는 우리가 앞서 살펴본 props와
        state 외에도 context라는 기능이 있다. <br></br>
        <br></br>context는 데이터의 흐름이 부모 컴포넌트로부터 자식 컴포넌트에게
        전달되는 props와 state와는 달리 데이터의 흐름과 상관없는 전역적인
        데이터를 다룰 때 사용할 수 있다. 즉, context를 사용하면 사용자의 계정
        정보나 설정 파일 등 해당 애플리케이션에 포함된 모든 컴포넌트에서 접근할
        필요가 있는 데이터를 손쉽게 관리할 수 있다. <br />
        <br />
        조금 복잡한 설정을 통해 Redux와 같은 전역 상태 관리 라이브러리를
        활용하여 context를 사용할 수도 있지만, Context API나 useContext Hook을
        사용하여 좀 더 손쉽게 context를 사용할 수 있다.
        <br />
        <br />
        Prop Drilling 을 피하기 위해 사용된다.
        <br />
        Prop Drilling은 prop을 전달할 때 거쳐야 할 컴포넌트의 개수가 적으면 전혀
        문제가 되지 않는다. 하지만 prop이 거쳐야 할 컴포넌트의 개수가 10개,
        20개가 넘어가게 되면 코드를 통해 해당 prop을 추적하는 것이 어려워지며,
        코드의 유지보수 또한 힘들어진다. 또한, 거쳐야 하는 모든 컴포넌트에서
        prop을 설정해줘야 하기 때문에 개발자가 실수를 할 확률도 높아진다.
      </p>
      {/* <FirstComponent content="Hello, React!" />; */}
      <HelloContext.Provider value="Hello, React!">
        <FirstComponent />
      </HelloContext.Provider>
      <ChangeTheme />
    </div>
  );
};

const RefHooks = () => {
  // false를 초기값으로 하는 state 생성
  const [isPlaying, setIsPlaying] = useState(false);
  // null을 초기값으로 하는 ref 객체 생성
  const ref = useRef(null);
  const handleClick = () => {
    console.log(ref);
    // ref.current를 사용하여
    // 동영상이 재생 중이면 버튼의 동작을 pause로 설정하고,
    // 정지 중이면 버튼의 동작을 play로 설정함
    if (isPlaying) {
      ref.current.pause();
    } else {
      ref.current.play();
    }

    setIsPlaying(!isPlaying);
  };
  return (
    <div>
      <h3>Ref Hooks</h3>
      <p>
        React 컴포넌트는 렌더링에 사용되지 않는 일부 데이터를 가지고 있을 수
        있으며, 이러한 데이터를 저장하기 위해서 ref를 사용한다. ref는 state와는
        달리 해당 값이 업데이트되도 컴포넌트가 리렌더링되지 않는다. useRef
        Hook은 함수 컴포넌트에서 이러한 ref를 참조할 수 있게 해준다.
        <br />
        <br />
        useRef Hook
        <br />
        useRef는 인수로 전달된 값(initialValue)으로 초기화 된 변경 가능한 ref
        객체를 반환하며, 이 객체는 컴포넌트의 전 생명 주기 동안 유지된다. ref
        객체는 current라는 프로퍼티 하나만을 가지고 있으며, 이 current 값이 실제
        엘리먼트를 가리키게 된다.
      </p>
      <video
        width="240"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying}
      >
        <source src="/video_sample.mp4" type="video/mp4" />
      </video>
      <br />
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

const List = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="">Hooks 개요</Link>
        </li>
        <li>
          <Link to="stateHook">State Hooks</Link>
        </li>
        <li>
          <Link to="contextHook">Context Hooks</Link>
        </li>
        <li>
          <Link to="refHook">Ref Hooks</Link>
        </li>
        <li>
          <Link to="effectHook">Effect Hooks</Link>
        </li>
        <li>
          <Link to="performanceHook">Performance Hooks</Link>
        </li>
        <li>
          <Link to="customHook">Custom Hooks</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

const Hooks = () => {
  return (
    <>
      <h1>Hooks</h1>
      <Routes>
        <Route path="" element={<List />}>
          <Route index element={<WhatIsHooks />} />
          <Route path="stateHook" element={<StateHooks />} />
          <Route path="contextHook" element={<ContextHooks />} />
          <Route path="refHook" element={<RefHooks />} />
        </Route>
      </Routes>
    </>
  );
};

export default Hooks;

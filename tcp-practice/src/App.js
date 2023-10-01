import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoMatch from "./components/NoMatch";
import JSX from "./components/JSX";
import Comp from "./components/Comp";
import Props from "./components/Props";
import State from "./components/State";
import Menu from "./Menu";

function App() {
  return (
    <div>
      <h1>React Router</h1>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jsx" element={<JSX />} />
          <Route path="/comp" element={<Comp />} />
          <Route path="/props" element={<Props />} />
          <Route path="/state/*" element={<State />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
// Link기능이 되기는 하나 이렇게 하면 메뉴에 포함된 링크를 클릭하게 되면
// Menu 컴포넌트는 사라지고 링크된 페이지만이 화면에 렌더링됩니다.
// 그런데 화면에서 메뉴가 사라지게 되면 사용자는 이전 페이지나 다른
// 페이지로 이동할 수 없어지기 때문에 일반적으로 메뉴는 화면에 계속
// 표시되어 있어야 한다.

export default App;

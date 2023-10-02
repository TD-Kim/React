import { Link, Outlet } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/jsx">JSX</Link>
          </li>
          <li>
            <Link to="/comp">Component</Link>
          </li>
          <li>
            <Link to="/props">Props</Link>
          </li>
          <li>
            <Link to="/state">State</Link>
          </li>
          <li>
            <Link to="/css">Css Styling</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};

// Outlet 컴포넌트는 중첩된 Route 컴포넌트 중에서 하위 레벨의 Route 컴포넌트가
// 렌더링될 때 중첩된 UI를 표시할 수 있게 해 준다.
// 상위 레벨의 Route가 정확히 일치하면 하위 레벨의 Index Route를 렌더링하거나,
// Index Route가 존재하지 않으면 아무것도 렌더링하지 않는다.

export default Menu;

import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Link to='subMenu'>
        <li>1. subMenu</li>
      </Link>
      <Link to='treeSideBar'>
        <li>2. treeSideBar</li>
      </Link>
      <Outlet />
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import SubMenuPage from './components/subMenu/SubMenuPage';
import Sb from './components/treeSideBar/Sb';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='subMenu' element={<SubMenuPage />} />
          <Route path='treeSideBar' element={<Sb />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

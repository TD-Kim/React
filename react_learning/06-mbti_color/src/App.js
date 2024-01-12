import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import New from './New';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.onbeforeunload = () => window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='new' element={<New />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

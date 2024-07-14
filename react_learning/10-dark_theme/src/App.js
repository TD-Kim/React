import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeChangeProvider } from './context/ThemeContext';
import { GlobalStyle } from './theme/GlobalStyle';
import { Suspense } from 'react';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyle />
        {/* <Suspense fallback={<div>...Loading</div>}> */}
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<MainPage />} />
              <Route path='about' element={<AboutPage />} />
            </Route>
          </Routes>
        {/* </Suspense> */}
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;

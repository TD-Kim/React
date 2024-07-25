import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ViewPage from './pages/ViewPage/ViewPage';
import WritePage from './pages/WritePage/WritePage';

import { signOut } from 'firebase/auth';
import { auth } from './firebase_setup/firebase';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  // 헤더에 넘겨줄 로그아웃 이벤트처리기
  const handleSignOutClick = () => {
    signOut(auth)
      .then(() => {
        console.log('로그아웃완');
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = '/login';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              handleSignOutClick={handleSignOutClick}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainPage isAuth={isAuth} handleSignOutClick={handleSignOutClick} />
          }
        />
        <Route
          path="/view"
          element={
            <ViewPage isAuth={isAuth} handleSignOutClick={handleSignOutClick} />
          }
        />
        <Route
          path="/write"
          element={
            <WritePage
              isAuth={isAuth}
              handleSignOutClick={handleSignOutClick}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

import React, { useRef, useState } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';
import SignOut from './components/SignOut';
import { getUserAuth } from './api/firebase';

function App() {
  // Android, ios 확인
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      <header>
        <h4> 🙏 소원을 빌어주세요</h4>
        <SignOut auth={auth}/>
      </header>
      <section>{user ? <ChatRoom auth={auth}/> : <SignIn auth={auth} />}</section>
    </div>
  );
}

export default App;

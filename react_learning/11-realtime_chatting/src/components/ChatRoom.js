import {
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { addDatas, db, getDatasOrderByLimit, getRealTimeMessages } from '../api/firebase';
import ChatMessage from './ChatMessage';
import * as FaIcons from 'react-icons/fa';

function ChatRoom({ auth }) {
  const dummy = useRef();
  const [formValue, setFormValue] = useState('');

  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    const resultData = await getDatasOrderByLimit('messages', 'createdAt', 500);
    setMessages(resultData);
  };
  console.log(messages)
  const handleLoad = async () => {
    const [datas, unsubscribe] = await getRealTimeMessages('messages', 'createdAt', 500);
    setMessages(datas);
  }

  // const messagesCollect = collection(db, 'messages');
  // const q = query(messagesCollect, orderBy('createdAt'), limit(500));

  // const [messages] = useCollectionData(q);
  // console.log(messages);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth?.currentUser;
    const addObj = {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    };
    await addDatas('messages', addObj);
    setFormValue('');
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
    // getMessages();
    // getMessages().then(() => {
    //   dummy.current.scrollIntoView({ behavior: 'smooth' });
    // });
  };

  useEffect(() => {
    handleLoad()
  }, []);

  // useEffect(() => {
  //   getMessages();
  // }, []);

  // useEffect(() => {
  //   // scrollIntoView() 메소드는 자신이 호출된 요소가 사용자에게 표시되도록
  //   // 상위 컨테이너를 스크롤한다.
  //   dummy.current.scrollIntoView(false, { behavior: 'smooth' });
  // }, [messages]);
  return (
    <>
      <main>
        {messages &&
          messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} auth={auth} />
          ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder=''
        />
        <button type='submit' disabled={!formValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;

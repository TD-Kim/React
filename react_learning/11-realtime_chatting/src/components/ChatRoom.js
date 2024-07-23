import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { addDatas, db, getDatasOrderByLimit } from '../api/firebase';
import ChatMessage from './ChatMessage';
import * as FaIcons from 'react-icons/fa';

function ChatRoom({ auth }) {
  const dummy = useRef();
  const [formValue, setFormValue] = useState('');

  //   const [messages, setMessages] = useState([]);
  //   const getMessages = async () => {
  //     const resultData = await getDatasOrderByLimit('messages', 'createdAt', 500);
  //     setMessages(resultData);
  //     dummy.current.scrollIntoView({ behavior: 'smooth' });
  //   };

  const messagesCollect = collection(db, 'messages');
  const q = query(messagesCollect, orderBy('createdAt'), limit(500));

  const [messages] = useCollectionData(q);

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
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    // getMessages().then(() => {
    //   dummy.current.scrollIntoView({ behavior: 'smooth' });
    // });
  };

  useEffect(() => {
    // getMessages();
    dummy.current.scrollIntoView(false, { behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dummy.current.scrollIntoView(false, { behavior: 'smooth' });
  }, [messages]);
  return (
    <>
      <main ref={dummy}>
        {messages &&
          messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} auth={auth} />
          ))}
        <span></span>
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

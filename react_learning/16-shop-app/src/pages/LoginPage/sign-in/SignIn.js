import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/form/Form';
import { getUserAuth } from '../../../firebase';
import { setUserId } from '../../../store/cart/cartSlice';
import { setUser } from '../../../store/user/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            token: userCredential.user.refreshToken,
            id: userCredential.user.uid,
          })
        );
        dispatch(setUserId(userCredential.user.uid));
        navigate('/');
      })
      .catch((error) => {
        setFirebaseError('이메일 또는 비밀번호가 잘못되었습니다.');
      });
  };

  return (
    <Form
      title={'로그인'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
};

export default SignIn;

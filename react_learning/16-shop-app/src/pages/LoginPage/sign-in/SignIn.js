import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/form/Form';
import { app, asyncCart, getUserAuth } from '../../../firebase';
import { asyncCartAndStorage, setUserId } from '../../../store/cart/cartSlice';
import { setUser } from '../../../store/user/userSlice';

const SignIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 로컬 스토리지에서 장바구니 데이터 읽기
      const { user } = userCredential;
      const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];
      // await asyncCart(user.uid, { cart: cartItems });
      // await asyncCart(user.uid, cartItems);
      dispatch(asyncCartAndStorage({ uid: user.uid, cartItems }));
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      // dispatch(setUserId(user.uid));
      navigate('/');
    } catch (error) {
      console.log(error);
      setFirebaseError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
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

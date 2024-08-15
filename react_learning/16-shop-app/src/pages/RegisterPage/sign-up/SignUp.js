import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/form/Form';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { asyncCart, getUserAuth, joinUser } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/userSlice';
import { setUserId } from '../../../store/cart/cartSlice';
import { addDatasRest, API_KEY, asyncCartRest, signUpUser } from '../../../api';

const SignUp = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');

  const dispatch = useDispatch();
  const auth = getUserAuth();

  const handleSignupAndLogin = async (email, password) => {
    // ID 토큰: 사용자가 로그인하면 Firebase가 ID 토큰을 생성한다.
    // 이 토큰은 Firebase 서비스에 요청할 때 사용된다. ID 토큰은 보통 1시간 동안
    // 유효하다. 이 토큰에는 사용자 정보(예: UID, 이메일 등)가 포함된다.
    // 리프레시 토큰: 리프레시 토큰은 ID 토큰이 만료된 후 새로운 ID 토큰을 얻기 위해
    // 사용된다. 이 토큰은 상대적으로 긴 수명을 가지며, 클라이언트 측에서 안전하게 저장된다.
    // 리프레시 토큰을 사용하면 사용자가 다시 로그인하지 않고도 세션을 유지할 수 있다.
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const userCredential = await signUpUser(
      //   `signUp?key=${API_KEY}`,
      //   email,
      //   password
      // );
      const { user } = userCredential;
      console.log(user);
      // 로컬 스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

      // await joinUser(user.uid, user.email);
      // await asyncCart(user.uid, cartItems);
      await addDatasRest(`/users/${user.uid}`, { email: user.email });
      await asyncCartRest(user.uid, cartItems);
      // Update Redux store
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          uid: user.uid,
        })
      );
      // dispatch(setUserId(userCredential.user.uid));
      navigate('/');
    } catch (error) {
      console.log(error);
      setFirebaseError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Form
      title={'가입하기'}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  );
};

export default SignUp;

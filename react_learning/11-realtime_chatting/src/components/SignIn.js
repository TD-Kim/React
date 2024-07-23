import React from 'react';
import CrossBrowser from '../CrossBrowser';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as FcIcons from 'react-icons/fc';

function SignIn({auth}) {
  CrossBrowser();
  const signInWithGoogle = () => {
    // firebase ➡️ console로 이동 ➡️ Authentication ➡️ sign in method
    // ➡️ 로그인 제공업체의 '새 제공업체 추가' 버튼 ➡️ 사용 설정하기
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  };

  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span> </span>

        <span>
          <b>구글로 로그인하기</b>
        </span>
      </button>
      <span className='notice'>
        🙀 아이폰(ios)은 safari, chrome <br />
        등으로 로그인 해주세요. 🙏
      </span>
    </>
  );
}

export default SignIn;

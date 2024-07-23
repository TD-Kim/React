import React from 'react';

function SignOut({auth}) {
  return (
    auth?.currentUser && (
      <button className='sign-out' onClick={() => auth.signOut()}>
        <b>로그아웃</b>
      </button>
    )
  );
}

export default SignOut;

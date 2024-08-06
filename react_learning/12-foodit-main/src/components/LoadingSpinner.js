import React from 'react';
import './LoadingSpinner.css'; // CSS 파일에 애니메이션 스타일을 정의해야 합니다.

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

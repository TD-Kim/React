// 페이지의 공통 요소 템플릿
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const BasicTemplate = ({ children, isAuth, handleSignOutClick }) => {
  return (
    <>
      <div className="container mx-auto px-4 font-mono ">
        <Header isAuth={isAuth} handleSignOutClick={handleSignOutClick} />
      </div>

      <div className="container mx-auto">
        <main>{children}</main>
      </div>

      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </>
  );
};

export default BasicTemplate;

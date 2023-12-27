import { useCallback, useEffect, useState } from 'react';
import personIcon from '../assets/person.png';
import styles from './UserMenu.module.css';
import { Link } from 'react-router-dom';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // const handleButtonClick = useCallback((e) => {
  //   e.stopPropagation();
  //   setIsOpen((nextIsOpen) => !nextIsOpen);
  // }, []);
  const handleButtonClick = (e) => {
    // uesEffect 에서 window 에 click 이벤트 핸들러를 달아주면
    // 같이 작동하기 때문에 stopPropagation() 를 호출해준다.
    e.stopPropagation();
    setIsOpen((nextIsOpen) => {
      // console.log(nextIsOpen);
      return !nextIsOpen;
    });
  };

  // useEffect 는 컴포넌트의 렌더링 이후에 실행된다.
  // clean-up 함수는 컴포넌트의 update 이전에 실행된다.
  useEffect(() => {
    console.log(isOpen);
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    // const handleClickOutside = () => {
    //   alert('test');
    // };
    window.addEventListener('click', handleClickOutside);

    return () => {
      console.log('언제냐?');
      // isOpen이 바뀌는 시점에 return 의 콜백함수가 실행된다.
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        <img src={personIcon} alt='유저 메뉴' />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <Link to='/wishlist'>
            <li>위시리스트</li>
          </Link>
          <li className={styles.disabled}>회원가입</li>
          <Link to='/login'>
            <li>로그인</li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;

import Container from './Container';
import UserMenu from './UserMenu';
import logoImg from '../assets/logo.svg';
import styles from './Nav.module.css';
import { Link, NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  // isActive prop : 현재 페이지의 경로가 내비게이션의 링크에 해당하면 true
  // 리액트 인라인 스타일 객체 리턴
  return {
    textDecoration: isActive ? 'underline' : undefined,
  };
}

function Nav() {
  console.log(localStorage.getItem("token"))
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to='/'>
          <div className={styles.logo}>
            <span>DW</span>
            OS
          </div>
          {/* <img src={logoImg} alt='Codethat Logo' /> */}
        </Link>
        <ul className={styles.menu}>
          <li>
            {/* <Link to='/courses'>카탈로그</Link> */}
            <NavLink to='/courses' style={getLinkStyle}>
              카탈로그
            </NavLink>
          </li>
          <li>
            {/* <Link to='/questions'>커뮤니티</Link> */}
            <NavLink to='/questions' style={getLinkStyle}>
              커뮤니티
            </NavLink>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;

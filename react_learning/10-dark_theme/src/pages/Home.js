import React from 'react';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useTheme } from '../context/ThemeContext';
import styles from './Home.module.css';

function Home(props) {
  const [themeMode, toggleTheme] = useTheme();
  return (
    <div>
      <Nav className={styles.nav}/>
      <div className={styles.body}>
        <Outlet />
      </div>
      <ThemeToggleButton toggle={toggleTheme} mode={themeMode} />
    </div>
  );
}

export default Home;

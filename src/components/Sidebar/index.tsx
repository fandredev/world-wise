import { Outlet } from 'react-router-dom';
import Logo from '../Logo';
import NavigationApp from '../NavigationApp';
import styles from './sidebar.module.css';

export default function Sidebar() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.sidebar}>
      <Logo />
      <NavigationApp />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {year} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

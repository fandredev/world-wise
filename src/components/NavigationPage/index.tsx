import { NavLink } from 'react-router-dom';
import styles from './navigation-page.module.css';
import Logo from '../Logo';

export default function NavigationPage() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Log in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

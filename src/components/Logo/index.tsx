import { Link } from 'react-router-dom';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

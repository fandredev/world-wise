import { useState } from 'react';
import styles from './styles/login.module.css';
import NavigationPage from '../components/NavigationPage';

const FAKE_EMAIL = 'jack@example.com';
const FAKE_PASSWORD = 'qwerty';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState(FAKE_EMAIL);
  const [password, setPassword] = useState(FAKE_PASSWORD);

  return (
    <main className={styles.login}>
      <NavigationPage />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}

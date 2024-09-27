import { useEffect, useState } from 'react';
import styles from './styles/login.module.css';
import NavigationPage from '../components/NavigationPage';
import { FAKE_USER } from '../utils/auth-user';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState(FAKE_USER.email);
  const [password, setPassword] = useState(FAKE_USER.password);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

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
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

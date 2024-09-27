import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import styles from './user.module.css';

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      {user && (
        <div className={styles.user}>
          <img src={user.avatar} alt={user.name} />
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
}

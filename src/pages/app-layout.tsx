import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import styles from './styles/app-layout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

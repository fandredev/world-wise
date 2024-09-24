import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const latitude = searchParams.get('lat') || 0;
  const longitude = searchParams.get('lng') || 0;

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('form');
      }}
    >
      Map
    </div>
  );
}

export default Map;

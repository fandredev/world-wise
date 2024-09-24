import { ICity } from './city-list';
import styles from './city-item.module.css';
import { formatDate } from '../../utils/format-date';
import { Link } from 'react-router-dom';

interface CityItemProps {
  city: ICity;
}

export default function CityItem({ city }: CityItemProps) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji} </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>

        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

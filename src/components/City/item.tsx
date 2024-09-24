import { City } from './city-list';
import styles from './city-item.module.css';

const formatDate = (date: number | string | Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

interface CityItemProps {
  city: City;
}

export default function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji} </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>

      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

import { ICity } from './city-list';
import styles from './city-item.module.css';
import { formatDate } from '../../utils/format-date';
import { Link } from 'react-router-dom';
import { useCities } from '../../hooks/use-cities';
import React from 'react';

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

  const { currentCity, deleteCity } = useCities();

  function handleDeleteCity(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji} </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>

        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

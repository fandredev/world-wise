import { useCities } from '../../hooks/use-cities';
import Message from '../Message';
import Spinner from '../Spinner';
import styles from './city-list.module.css';
import CityItem from './item';

export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export default function CityList() {
  const { cities, isLoadingCities } = useCities();

  if (isLoadingCities) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

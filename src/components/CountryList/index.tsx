import { ICity, CityListProps } from '../City/city-list';
import CountryItem, { Country } from '../CountryItem';
import Message from '../Message';
import Spinner from '../Spinner';
import styles from './country-list.module.css';

type CountriesListProps = CityListProps;

export default function CountryList({
  cities,
  isLoadingCities,
}: CountriesListProps) {
  if (isLoadingCities) {
    return <Spinner />;
  }

  if (cities.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce((arr: Country[], city: ICity) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      arr.push({
        country: city.country,
        emoji: city.emoji,
      });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

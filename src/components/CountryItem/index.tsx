import styles from './country-item.module.css';

interface CountryProps {
  country: {
    emoji: string;
    country: string;
  };
}

function CountryItem({ country }: CountryProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

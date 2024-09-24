import styles from './country-item.module.css';

export type Country = {
  country: string;
  emoji: string;
};
interface CountryProps {
  country: Country;
}

export default function CountryItem({ country }: CountryProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

import { Country } from '../shared/types';
import styles from './CountryItem.module.css';

interface Props {
  country: Country;
}

function CountryItem({ country }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

import { City } from '../shared/types';
import styles from './CityItem.module.css';

interface Props {
  city: City;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }: Props) {
  const { cityName, emoji, date } = city;
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button type="button" className={styles.deleteBtn}>
        &times;
      </button>
    </li>
  );
}

export default CityItem;

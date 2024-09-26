import { useNavigate, useParams } from 'react-router-dom';
import styles from './city.module.css';
import { useEffect } from 'react';
import Button from '../Button';
import { useCities } from '../../hooks/use-cities';
import Spinner from '../Spinner';

export default function City() {
  const { cityId } = useParams();
  const navigate = useNavigate();

  const { getCityById, currentCity, isLoadingCities } = useCities();

  useEffect(() => {
    getCityById(cityId ? cityId : '');
  }, [cityId, getCityById]);

  if (isLoadingCities) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{currentCity?.date.toString()}</p>
      </div>

      {currentCity?.notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          color="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

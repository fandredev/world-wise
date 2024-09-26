import { useEffect, useState } from 'react';

import styles from './form.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/use-url-position';
import Message from '../Message';
import Spinner from '../Spinner';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ICity } from '../City/city-list';
import { useCities } from '../../hooks/use-cities';

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlPosition();
  const { createCity, isLoadingCities } = useCities();

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [country, setCountry] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName) {
      alert('City name is required');
      return;
    }

    if (!date) {
      alert('Country is required');
      return;
    }

    const newCity: Omit<ICity, 'id'> = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app');
  }

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');

        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click on the map to select a city"
          );

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        if (error instanceof Error) {
          setGeocodingError(error.message);
        } else {
          setGeocodingError('An unknown error occurred');
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat || !lng)
    return <Message message="Click on the map to select a city" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoadingCities ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={new Date(date)}
          dateFormat="dd/MM/yyyy"
          withPortal
          excludeDateIntervals={[
            {
              start: new Date(),
              end: new Date(new Date().setDate(new Date().getDate() + 2)),
            },
          ]}
          onChange={(date) => {
            if (date !== null) {
              setDate(date);
            }
          }}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} color="primary">
          Add
        </Button>
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
    </form>
  );
}

export default Form;

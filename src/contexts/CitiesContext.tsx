import { createContext, useCallback, useEffect, useReducer } from 'react';
import { ICity } from '../components/City/city-list';
import { INITIAL_STATE, reducerCities } from './reducer';

const API_URL = 'http://localhost:8000';

type OmitCityId = Omit<ICity, 'id'>;
interface CitiesProviderProps {
  children: React.ReactNode;
}

interface CitiesContextData {
  cities: ICity[];
  isLoadingCities: boolean;
  currentCity: ICity | null;
  error: string | null;
  getCityById: (cityId: string) => Promise<void>;
  createCity: (newCity: OmitCityId) => Promise<void>;
  deleteCity: (cityId: number) => Promise<void>;
}

export const CitiesContext = createContext<CitiesContextData | undefined>(
  undefined
);

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoadingCities, currentCity, error }, dispatch] =
    useReducer(reducerCities, INITIAL_STATE);

  const getCityById = useCallback(
    async (cityId: string) => {
      if (Number(cityId) === currentCity?.id) return;

      dispatch({ type: 'loading' });

      try {
        const response = await fetch(`${API_URL}/cities/${cityId}`);
        const data = await response.json();

        dispatch({ type: 'city/loaded', payload: data as ICity });
      } catch (error) {
        console.error('Error fetching city', error);
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the city...',
        });
      }
    },
    [currentCity?.id]
  );

  const createCity = async (newCity: OmitCityId) => {
    dispatch({ type: 'loading' });

    try {
      const response = await fetch(`${API_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });

      const data = await response.json();
      dispatch({ type: 'cities/created', payload: data });
    } catch (error) {
      console.error('Error creating city', error);
      dispatch({
        type: 'rejected',
        payload: `There was an error create the city: ${newCity.cityName}`,
      });
    }
  };

  const deleteCity = async (cityId: number) => {
    dispatch({ type: 'loading' });

    try {
      await fetch(`${API_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/deleted', payload: cityId });
    } catch (error) {
      console.error('Error deleting city', error);
      dispatch({
        type: 'rejected',
        payload: `There was an error deleting the city.`,
      });
    }
  };

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();

        dispatch({ type: 'cities/loaded', payload: data as ICity[] });
      } catch (error) {
        console.error('Error fetching cities', error);
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities',
        });
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoadingCities,
        currentCity,
        error,
        getCityById,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };

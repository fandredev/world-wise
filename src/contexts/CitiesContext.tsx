import { createContext, useCallback, useEffect, useState } from 'react';
import { ICity } from '../components/City/city-list';

const API_URL = 'http://localhost:8000';

type OmitCityId = Omit<ICity, 'id'>;
interface CitiesProviderProps {
  children: React.ReactNode;
}

interface CitiesContextData {
  cities: ICity[];
  isLoadingCities: boolean;
  currentCity: ICity;
  getCityById: (cityId: string) => Promise<void>;
  createCity: (newCity: OmitCityId) => Promise<void>;
  deleteCity: (cityId: number) => Promise<void>;
}

export const CitiesContext = createContext<CitiesContextData | undefined>(
  undefined
);

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [currentCity, setCurrentCity] = useState({} as ICity);

  const getCityById = useCallback(async (cityId: string) => {
    try {
      const response = await fetch(`${API_URL}/cities/${cityId}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error('Error fetching city', error);
    } finally {
      setIsLoadingCities(false);
    }
  }, []);

  const createCity = async (newCity: OmitCityId) => {
    try {
      const response = await fetch(`${API_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });

      const data = await response.json();
      setCities([...cities, data]);
    } catch (error) {
      console.error('Error creating city', error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const deleteCity = async (cityId: number) => {
    try {
      setIsLoadingCities(true);
      await fetch(`${API_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      setCities(cities.filter((city) => city.id !== cityId));
    } catch (error) {
      console.error('Error deleting city', error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();

        setCities(data);
      } catch (error) {
        console.error('Error fetching cities', error);
      } finally {
        setIsLoadingCities(false);
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

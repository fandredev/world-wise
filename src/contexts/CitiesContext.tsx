import { createContext, useCallback, useEffect, useState } from 'react';
import { ICity } from '../components/City/city-list';

const API_URL = 'http://localhost:8000';

interface CitiesProviderProps {
  children: React.ReactNode;
}

interface CitiesContextData {
  cities: ICity[];
  isLoadingCities: boolean;
  currentCity: ICity;
  getCityById: (cityId: string) => Promise<void>;
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

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();
        console.log(data);

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
      value={{ cities, isLoadingCities, currentCity, getCityById }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };

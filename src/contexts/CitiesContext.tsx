import { createContext, useEffect, useState } from 'react';
import { ICity } from '../components/City/city-list';

const API_URL = 'http://localhost:8000';

interface CitiesProviderProps {
  children: React.ReactNode;
}

interface CitiesContextData {
  cities: ICity[];
  isLoadingCities: boolean;
}

export const CitiesContext = createContext<CitiesContextData | undefined>(
  undefined
);

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

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
    <CitiesContext.Provider value={{ cities, isLoadingCities }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };

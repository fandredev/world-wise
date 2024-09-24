import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import Pricing from './pages/pricing';
import NotFound from './pages/not-found';
import AppLayout from './pages/app-layout';
import Login from './pages/login';
import CityList, { ICity } from './components/City/city-list';
import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const URL = 'http://localhost:8000';

function App() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`${URL}/cities`);
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={
              <CityList cities={cities} isLoadingCities={isLoadingCities} />
            }
          />
          <Route path="cities/:cityId" element={<City />} />
          <Route
            path="countries"
            element={
              <CountryList cities={cities} isLoadingCities={isLoadingCities} />
            }
          />
          <Route path="form" element={<Form />} />
        </Route>

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

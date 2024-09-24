import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import Pricing from './pages/pricing';
import NotFound from './pages/not-found';
import AppLayout from './pages/app-layout';
import Login from './pages/login';
import CityList, { City } from './components/City/city-list';
import { useEffect, useState } from 'react';

const URL = 'http://localhost:8000';

function App() {
  const [cities, setCities] = useState<City[]>([]);
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
          <Route index element={<></>} />
          {/* default route */}
          <Route
            path="cities"
            element={
              <CityList cities={cities} isLoadingCities={isLoadingCities} />
            }
          />
          <Route path="countries" element={<div>Countries</div>} />
          <Route path="form" element={<div>Form</div>} />
        </Route>

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

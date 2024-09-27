import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import CityList from './components/City/city-list';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import { lazy, Suspense } from 'react';
import SpinnerFullPage from './components/SpinnerFull';

const Homepage = lazy(() => import('./pages/homepage'));
const Product = lazy(() => import('./pages/product'));
const Pricing = lazy(() => import('./pages/pricing'));
const NotFound = lazy(() => import('./pages/not-found'));
const AppLayout = lazy(() => import('./pages/app-layout'));
const Login = lazy(() => import('./pages/login'));
const ProtectedRoute = lazy(() => import('./pages/protected-route'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:cityId" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              {/* 404 */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

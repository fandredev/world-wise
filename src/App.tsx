import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import Pricing from './pages/pricing';
import NotFound from './pages/not-found';
import AppLayout from './pages/app-layout';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

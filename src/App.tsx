import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContexts';

function App() {
  return (
    <CitiesProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* redirect */}
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CitiesProvider>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;

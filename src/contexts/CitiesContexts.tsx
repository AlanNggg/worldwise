import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { City, NewCity } from '../shared/types';

const BASE_URL = 'http://localhost:8000';

interface CitiesContextValue {
  cities: City[];
  isLoading: boolean;
  getCity(id: number): Promise<void>;
  currentCity: City | null;
  createCity(city: NewCity): Promise<void>;
  deleteCity(id: number): Promise<void>;
}

const CitiesContext = createContext<CitiesContextValue | undefined>(undefined);

function CitiesProvider({ children }: PropsWithChildren) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (err) {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    },
    [setCurrentCity, setIsLoading]
  );

  const createCity = useCallback(
    async (newCity: NewCity) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setCities((c) => [...c, data]);
      } catch (err) {
        alert('There was an error creating data.');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const deleteCity = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: 'DELETE',
        });
        setCities((c) => c.filter((city) => city.id !== id));
      } catch (err) {
        alert('There was an error deleting data.');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const value = useMemo(
    () => ({ cities, isLoading, currentCity, getCity, createCity, deleteCity }),
    [cities, isLoading, currentCity, getCity, createCity, deleteCity]
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };

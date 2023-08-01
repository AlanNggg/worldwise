import { LatLngLiteral } from 'leaflet';
import { useState } from 'react';

type DefaultPosition = LatLngLiteral | null;

export function useGeolocation(defaultPosition: DefaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

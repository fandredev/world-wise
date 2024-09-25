import { useState } from 'react';

interface Position {
  lat: number;
  lng: number;
}

export function useGeolocation(defaultPosition = null) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [position, setPosition] = useState<Position | null>(defaultPosition);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return {
    getPosition,
    position,
    error,
    isLoading,
  };
}

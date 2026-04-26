import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/weatherService';

export function useWeather(city = 'New York') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(city);

  const fetchWeather = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getWeatherByCity(cityName);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(currentCity);
  }, [currentCity, fetchWeather]);

  const changeCity = (newCity) => setCurrentCity(newCity);
  const refresh = () => fetchWeather(currentCity);

  return { weather, loading, error, changeCity, refresh };
}

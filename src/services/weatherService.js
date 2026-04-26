import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
// Use your own OpenWeatherMap API key here
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo';

export const weatherService = {
  async getWeatherByCity(city = 'New York') {
    if (API_KEY === 'demo') {
      return getMockWeather(city);
    }
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: { q: city, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      console.error('Weather API error:', error);
      return getMockWeather(city);
    }
  },

  async getWeatherByCoords(lat, lon) {
    if (API_KEY === 'demo') {
      return getMockWeather('Your Location');
    }
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: { lat, lon, appid: API_KEY, units: 'metric' },
      });
      return response.data;
    } catch (error) {
      return getMockWeather('Your Location');
    }
  },
};

function getMockWeather(city) {
  const conditions = [
    { main: 'Clear', description: 'clear sky', icon: '☀️', temp: 24 },
    { main: 'Clouds', description: 'partly cloudy', icon: '⛅', temp: 18 },
    { main: 'Rain', description: 'light rain', icon: '🌧️', temp: 14 },
    { main: 'Snow', description: 'light snow', icon: '❄️', temp: -2 },
    { main: 'Thunderstorm', description: 'thunderstorm', icon: '⛈️', temp: 16 },
  ];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  return {
    name: city,
    main: {
      temp: condition.temp,
      feels_like: condition.temp - 2,
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: 1015,
    },
    weather: [{ main: condition.main, description: condition.description, icon: condition.icon }],
    wind: { speed: Math.floor(Math.random() * 15) + 5 },
    visibility: 10000,
    sys: { country: 'US' },
    isMock: true,
  };
}

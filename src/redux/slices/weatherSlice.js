import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ latitude, longitude }) => {
    const weatherUrl = `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const airQualityUrl = `${BASE_URL}/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    const uvIndexUrl = `${BASE_URL}/uvi?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    const [weatherResponse, forecastResponse, airQualityResponse, uvIndexResponse] = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl),
      axios.get(airQualityUrl),
      axios.get(uvIndexUrl),
    ]);

    const covidData = { total: '10,51,666', new: '+1,045' };

    return {
      location: weatherResponse.data.name,
      date: new Date(weatherResponse.data.dt * 1000).toLocaleDateString(),
      temperature: weatherResponse.data.main.temp,
      minTemp: weatherResponse.data.main.temp_min,
      maxTemp: weatherResponse.data.main.temp_max,
      description: weatherResponse.data.weather[0].description,
      icon: weatherResponse.data.weather[0].icon,
      details: {
        feels_like: weatherResponse.data.main.feels_like,
        humidity: weatherResponse.data.main.humidity,
        visibility: weatherResponse.data.visibility / 1000,
        wind_speed: weatherResponse.data.wind.speed,
        wind_direction: weatherResponse.data.wind.deg,
        precipitation: weatherResponse.data.clouds.all,
        dew_point: weatherResponse.data.main.temp - ((100 - weatherResponse.data.main.humidity) / 5),
      },
      forecast: forecastResponse.data.list.slice(0, 5).map(item => ({
        day: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: item.main.temp,
        precipitation: item.pop * 100,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
      hourlyForecast: forecastResponse.data.list.slice(0, 6).map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather,
      })),
      airQuality: {
        index: airQualityResponse.data.list[0].main.aqi,
        level: airQualityResponse.data.list[0].components.pm10,
        description: airQualityResponse.data.list[0].components.pm2_5,
        pollutant: "PM10",
        aqi: airQualityResponse.data.list[0].main.aqi,
      },
      uvIndex: uvIndexResponse.data.value,
      covidData,
      sunrise: new Date(weatherResponse.data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weatherResponse.data.sys.sunset * 1000).toLocaleTimeString(),
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const selectWeatherData = (state) => state.weather.weatherData;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;

export default weatherSlice.reducer;
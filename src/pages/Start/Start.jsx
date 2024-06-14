import React, { useEffect } from 'react';
import { Forecast, Precipitation, Radar, Today } from './components';
import { Tabs, Tab } from '@/components/Tabs/';
import { FaBars, FaEllipsisV } from 'react-icons/fa';
import { fetchWeatherData, selectWeatherData, selectWeatherStatus, selectWeatherError } from '@/redux/slices/weatherSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUserLocation } from '@/helpers/locationHelpers';
import { Loader } from '../../components/common/Loader';

const Start = () => {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector(selectWeatherData);
  const weatherStatus = useAppSelector(selectWeatherStatus);
  const error = useAppSelector(selectWeatherError);

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const location = await getUserLocation();
        dispatch(fetchWeatherData(location));
      } catch (err) {
        console.error(err);
      }
    };

    if (weatherStatus === 'idle') {
      fetchLocationAndWeather();
    }
  }, [weatherStatus, dispatch]);

  if (weatherStatus === 'loading') {
    return <Loader />;
  }

  if (weatherStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) return <div>No data available</div>;

  return (
    <div className="min-h-screen bg-[#2C2D35] text-white">
      <div className="p-4 text-white flex justify-between items-center">
        <FaBars className="text-2xl" />
        <h1 className="text-xl">{weatherData.location}</h1>
        <FaEllipsisV className="text-2xl" />
      </div>

      <Tabs>
        <Tab component={<Today />} active>Today</Tab>
        <Tab component={<Forecast />} >Forecast</Tab>
        <Tab component={<Precipitation />} >Precipitation</Tab>
        <Tab component={<Radar />} >Radar</Tab>
      </Tabs>
    </div>
  );
};

export default Start;
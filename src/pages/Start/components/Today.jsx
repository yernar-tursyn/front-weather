import { HourlyForecast } from '@/pages/Start/components/HourlyForecast';
import { selectWeatherData } from '@/redux/slices/weatherSlice';
import { useAppSelector } from '@/redux/hooks';
import { SvgIcon } from '@/components/common';
import { WeeklyForecast } from './WeeklyForecast';
import { Details } from './Details';
import { AirQuality } from './AirQuality';
import { CovidStats } from './CovidStats';
import { SunMoon } from './SunMoon';
import { format, parse } from 'date-fns';
import { getWeatherIcon } from '@/helpers/weatherHelpers';
import { sunIcon, sunCloudBigIcon, sunCloudIcon, precipitationIcon, moonIcon } from '@/assets/icons';

export const Today = () => {
  const weather = useAppSelector(selectWeatherData);
  if (!weather) return <div>Loading...</div>;

  // Нужны большие иконки (
  // const weatherIcon = getWeatherIcon(weather.icon);
  const formattedDate = format(parse(weather.date, 'dd.MM.yyyy', new Date()), 'EEEE, d MMM');

  return (
    <div className="p-4 bg-[#484B5B] text-white rounded-lg">
      <div className="text-center mb-4 bg-[#32333E] mx-auto rounded-full w-[200px] py-[7px] px-md">
        <h3 className="text-[#9B9EAD] text-sm">{formattedDate}</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <SvgIcon src={sunCloudBigIcon} className="mr-4" />
          <div className="ml-4">
            <h2 className="text-5xl bg-gradient-to-r from-[#A2A4B5] to-[#545760] bg-clip-text text-transparent">{weather.temperature}°</h2>
            <p>{weather.description}</p>
          </div>
        </div>
      </div>
      <div className="text-center my-4 text-gray-400">
        <p className="text-sm">
          <span className="">{weather.minTemp}°/{weather.maxTemp}°</span>
          <span className="mx-4">| Feels like <span className="text-white">{weather.details.feels_like}°C</span></span>
          <span className="mx-4">| Wind <span className="text-white">{weather.details.wind_speed} km/h</span> {weather.details.wind_direction}</span>
        </p>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <div className="flex items-start my-4">
            <SvgIcon src={precipitationIcon} className="w-6 h-6 mb-2" />
            <p>Precipitation: {weather.details.precipitation}%</p>
          </div>
          <div className="flex items-start">
            <SvgIcon src={sunIcon} className="w-6 h-6 mb-2" />
            <p>Wind: {weather.details.wind_speed} km/h</p>
          </div>
        </div>
        <div>
          <div className="flex items-start my-4">
            <SvgIcon src={sunCloudIcon} className="w-6 h-6 mb-2" />
            <p>Humidity: {weather.details.humidity}%</p>
          </div>
          <div className="flex items-start">
            <SvgIcon src={moonIcon} className="w-6 h-6 mb-2" />
            <p>Sunset: {weather.sunset}</p>
          </div>
        </div>
      </div>
      <HourlyForecast forecast={weather.hourlyForecast} />
      <WeeklyForecast forecast={weather.forecast} hourlyForecast={weather.hourlyForecast} />
      <Details weather={weather} />
      <AirQuality airQuality={weather.airQuality} />
      <CovidStats covidData={weather.covidData} />
      <SunMoon weather={weather} />
    </div>
  );
};
import { formatDate } from '@/helpers/dateHelpers';

export const HourlyForecast = ({ forecast }) => {
  return (
    <div className="p-4 text-white rounded-lg">
      <div className="flex overflow-x-auto space-x-4">
        {forecast.map((hour, index) => (
          <div key={index} className="flex flex-col items-center bg-[#3b3c49] rounded-full py-4 px-3">
            <p className="text-gray-400 text-sm">{formatDate(new Date(hour.dt * 1000), 'HH:mm')}</p>
            <img className='mb-[10px]' src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt={hour.weather[0].description} />
            <p >{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};
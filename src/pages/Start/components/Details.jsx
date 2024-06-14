import { SvgIcon } from '@/components/common/';
import { sunCloudBigIcon } from '@/assets/icons';

export const Details = ({ weather }) => {
  return (
    <div className="p-4 bg-[#2C2D35] text-white rounded-lg mb-4">
      <h2 className="text-lg font-bold mb-2">Details</h2>
      <div className="flex items-center mb-4">
        <SvgIcon src={sunCloudBigIcon} className="mr-4" />
        <div className="flex flex-col space-y-2 ml-auto text-right">
          <div className="flex justify-between">
            <p className="text-[#929396]">Feels like</p>
            <span className="text-[#fff] font-bold ml-2">{weather.details.feels_like}°</span>
          </div>
          <div className="flex justify-between">
            <p className="text-[#929396]">Humidity</p>
            <span className="text-[#fff] font-bold ml-2">{weather.details.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <p className="text-[#929396]">Visibility</p>
            <span className="text-[#fff] font-bold ml-2">{weather.details.visibility} mi</span>
          </div>
          <div className="flex justify-between">
            <p className="text-[#929396]">UV Index</p>
            <span className="text-[#fff] font-bold ml-2">Low {weather.uvIndex}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-[#929396]">Dew point</p>
            <span className="text-[#fff] font-bold ml-2">{weather.dewPoint}°</span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-[20px]">
        Tonight - Clear. Winds from SW to SSW at 10 to 11 mph (16.1 to 17.7 kph). The overnight low will be {weather.lowTemp}° F ({weather.lowTempC} °C).
      </p>
    </div>
  );
};



import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react';

import { parse, format } from 'date-fns';
import { SvgIcon } from '@/components/common/';
import { getWeatherIcon } from '@/helpers/weatherHelpers';

export const WeeklyForecast = ({ forecast, hourlyForecast }) => {
  const groupHourlyByDay = (hourlyForecast) => {
    return hourlyForecast.reduce((acc, hour) => {
      const date = new Date(hour.dt * 1000);
      const day = format(date, 'dd.MM.yyyy');
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(hour);
      return acc;
    }, {});
  };

  const groupedHourlyForecast = groupHourlyByDay(hourlyForecast);

  return (
    <div className="p-4 bg-[#2C2D35] text-white rounded-lg mb-4">
      {forecast.map((dayForecast, index) => {
        const date = parse(dayForecast.day, 'dd.MM.yyyy', new Date());
        const formattedDay = format(date, 'EEEE');
        const hourlyData = groupedHourlyForecast[dayForecast.day] || [];
        const weatherIcon = getWeatherIcon(dayForecast.icon);

        return (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <DisclosureButton
                  className="flex relative justify-between items-center w-full px-4 py-2 text-sm font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                >
                  <span>{formattedDay}</span>
                  <div className="flex items-center">
                    <SvgIcon src={weatherIcon} className="w-6 h-6 ml-2 absolute left-[180px] right-0" />
                    <svg
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-400 ml-2`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 00-.707.293l-7 7a1 1 0 101.414 1.414L10 5.414l6.293 6.293a1 1 0 001.414-1.414l-7-7A1 1 0 0010 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </DisclosureButton>
                <DisclosurePanel className="px-4 pt-2 pb-2 text-sm">
                  <div className="flex overflow-x-auto space-x-4 mt-4">
                    {hourlyData.map((hour, idx) => {
                      const hourlyIcon = getWeatherIcon(hour.weather[0].icon);
                      return (
                        <div key={idx} className="flex flex-col items-center bg-[#35363c] rounded-full py-3 px-2">
                          <SvgIcon src={hourlyIcon} className="w-6 h-6 mb-2" />
                          <p>{hour.temp}°</p>
                          <p className="text-[#9d9da4]">{format(new Date(hour.dt * 1000), 'h a')}</p>
                        </div>
                      );
                    })}
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
};
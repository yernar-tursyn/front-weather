import { useAppSelector } from '@/redux/hooks';
import { selectWeatherData } from '@/redux/slices/weatherSlice';
import ReactECharts from 'echarts-for-react';
import { parseDateString, formatDate } from '@/helpers/dateHelpers';
import { SvgIcon } from '@/components/common/';
import { sunIcon, sunCloudIcon, precipitationIcon, moonIcon } from '@/assets/icons';

const getWeatherIcon = (icon) => {
  switch (icon) {
    case '01d':
    case '01n':
      return sunIcon;
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return sunCloudIcon;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return precipitationIcon;
    case '50d':
    case '50n':
      return moonIcon;
    default:
      return sunIcon;
  }
};

export const Forecast = () => {
  const weatherData = useAppSelector(selectWeatherData);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { forecast } = weatherData;

  const validForecast = forecast.filter(day => {
    try {
      const date = parseDateString(day.day);
      return !isNaN(date.getTime()) && day.temperature !== null && !isNaN(day.temperature);
    } catch {
      return false;
    }
  });

  const averageTemperature = validForecast.length > 0
    ? validForecast.reduce((acc, day) => acc + day.temperature, 0) / validForecast.length
    : 0;

  const option = {
    xAxis: {
      type: 'category',
      data: validForecast.map((day) => {
        const date = parseDateString(day.day);
        return formatDate(date, 'EEE');
      }),
      axisLabel: {
        color: '#929396'
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#929396'
      },
    },
    series: [
      {
        data: validForecast.map((day) => day.temperature),
        type: 'bar',
        itemStyle: {
          color: (params) => {
            const date = parseDateString(validForecast[params.dataIndex].day).getDate();
            return date === 14 || date === 16 ? '#FFD700' : '#35363c';
          },
        },
        barWidth: '60%',
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
  };

  return (
    <div className="p-4 bg-[#2C2D35] text-white">
      <div className="flex space-x-9 overflow-x-auto">
        {validForecast.map((day, index) => {
          const date = parseDateString(day.day);
          return (
            <div key={index} className="text-center">
              <p>{formatDate(date, 'EEE')}</p>
              <SvgIcon src={getWeatherIcon(day.icon)} className="w-6 h-6 mx-auto mb-2" />
              <p>{day.temperature}°C</p>
            </div>
          );
        })}
      </div>
      <ReactECharts option={option} style={{ height: 300 }} />
      <div className="mt-4 text-left">
        <p className="text-lg">Average: {isNaN(averageTemperature) ? 'N/A' : averageTemperature.toFixed(2)}°C</p>
      </div>
    </div>
  );
};
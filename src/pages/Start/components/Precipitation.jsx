import { useAppSelector } from '@/redux/hooks';
import { selectWeatherData } from '@/redux/slices/weatherSlice';
import ReactECharts from 'echarts-for-react';
import { parseDateString, formatDate } from '@/helpers/dateHelpers';
import { PrecipitationDetails } from './PrecipitationDetails';

export const Precipitation = () => {
  const weatherData = useAppSelector(selectWeatherData);

  const { forecast } = weatherData;

  const validForecast = forecast.filter(day => day.precipitation !== null && !isNaN(day.precipitation));

  const option = {
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#929396',
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
        data: validForecast.map((day) => day.precipitation),
        type: 'bar',
        itemStyle: {
          color: '#35363c',
        },
        barWidth: '60%',
      },
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
  };
  return (
    <div className="p-4 bg-[#2C2D35] text-white">
      <h2 className="text-lg mb-4 text-left">Precipitation</h2>
      <div className="flex justify-between mb-2">
        {validForecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm text-gray-400">{formatDate(parseDateString(day.day), 'EEE').toUpperCase()}</p>
          </div>
        ))}
      </div>
      <ReactECharts option={option} style={{ height: 300 }} />
      <PrecipitationDetails />
    </div>
  );
};
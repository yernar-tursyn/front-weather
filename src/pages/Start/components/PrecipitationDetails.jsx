import React from 'react';
import { SvgIcon } from '../../../components/common/SvgIcon';
import { sunCloudIcon } from '@/assets/icons';
import { useAppSelector } from '@/redux/hooks';
import { selectWeatherData } from '@/redux/slices/weatherSlice';
import { formatDate, parseDateString } from '@/helpers/dateHelpers';

export const PrecipitationDetails = () => {
    const weatherData = useAppSelector(selectWeatherData);

    const { forecast } = weatherData;

    return (
        <div className="mt-10 bg-[#2C2D35] text-white">
            <h3 className='text-md text-left mb-[16px]'>Precipitation</h3>
            {forecast.map((day, index) => (
                <div key={index} className="flex justify-between items-center bg-[#484B5B] p-4 mb-2 rounded-lg">
                    <div className="flex items-center mr-3">
                        <div className="text-center mr-4">
                            <p className="text-sm text-gray-400">{formatDate(parseDateString(day.day), 'EEE').toUpperCase()}</p>
                            <p className="text-sm">{formatDate(parseDateString(day.day), 'MMM dd').toUpperCase()}</p>
                        </div>
                        <SvgIcon src={sunCloudIcon} className="w-10 h-10 mr-4 text-sm" />
                        <div className='text-sm'>
                            <p className="text-yellow-500">{day.description}</p>
                            <p className="text-gray-400">ssw 11 km/h</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="mr-4">
                            <p>{day.temperature}° / 28°</p>
                            <p>{day.precipitation}%</p>
                        </div>
                        <span className="w-5 h-5 text-white">&gt;</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
import { IoIosInformationCircleOutline } from "react-icons/io";

const getAirQualityDetails = (index) => {
    if (index <= 50) return { level: 'Good', description: 'Enjoy your outdoor activities.' };
    if (index <= 100) return { level: 'Moderate', description: 'You have good air quality - enjoy your outdoor activities.' };
    if (index <= 150) return { level: 'Unhealthy for Sensitive Groups', description: 'Limit prolonged outdoor exertion.' };
    if (index <= 200) return { level: 'Unhealthy', description: 'Everyone may begin to experience health effects; limit outdoor exertion.' };
    if (index <= 300) return { level: 'Very Unhealthy', description: 'Health alert: everyone may experience more serious health effects.' };
    return { level: 'Hazardous', description: 'Health warnings of emergency conditions. Avoid all outdoor activity.' };
};

const getGradientColor = (index) => {
    if (index <= 50) return 'from-green-400 to-yellow-400';
    if (index <= 100) return 'from-yellow-400 to-orange-400';
    if (index <= 150) return 'from-orange-400 to-red-400';
    if (index <= 200) return 'from-red-400 to-purple-400';
    return 'from-purple-400 to-red-600';
};

export const AirQuality = ({ airQuality }) => {
    const { level, description } = getAirQualityDetails(airQuality.index);
    const gradientColor = getGradientColor(airQuality.index);

    return (
        <div className="p-4 bg-[#2C2D35] text-white rounded-lg mb-4 text-sm">
            <div className='flex justify-between items-center'>
                <h2 className="text-lg font-bold mb-2">Air Quality</h2>
                <IoIosInformationCircleOutline className='text-2xl' />
            </div>
            <div className="flex items-center mb-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${gradientColor} rounded-full flex items-center justify-center text-black font-bold text-2xl`}>
                            {airQuality.index}
                        </div>
                        <span className="text-sm">{level}</span>
                    </div>
                </div>
                <div className="ml-4 text-left">
                    <p>{level}</p>
                    <p className="text-gray-400">{description}</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <p className="text-gray-400">
                    US EPA AQI <span className='text-[#fff]'>{airQuality.index}/500</span>
                </p>
                <p className="text-gray-400">
                    Dominant pollutant <span className="text-[#fff]">{airQuality.pollutant}</span>
                </p>
            </div>
        </div>
    );
};

import { SvgIcon } from '@/components/common/';
import { sunIcon, moonIcon } from '@/assets/icons';

export const SunMoon = ({ weather }) => {
    const sunriseTime = new Date(`1970-01-01T${weather.sunrise}Z`).getHours() * 3600 + new Date(`1970-01-01T${weather.sunrise}Z`).getMinutes() * 60 + new Date(`1970-01-01T${weather.sunrise}Z`).getSeconds();
    const sunsetTime = new Date(`1970-01-01T${weather.sunset}Z`).getHours() * 3600 + new Date(`1970-01-01T${weather.sunset}Z`).getMinutes() * 60 + new Date(`1970-01-01T${weather.sunset}Z`).getSeconds();
    const currentTime = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();

    const getSunPosition = (current, sunrise, sunset) => {
        const totalDuration = sunset - sunrise;
        const currentDuration = current - sunrise;
        return (currentDuration / totalDuration) * 100; // процентное положение по горизонтали
    };

    const sunPosition = getSunPosition(currentTime, sunriseTime, sunsetTime);

    // Определяем, должно ли быть солнце или луна 
    const isDayTime = currentTime >= sunriseTime && currentTime <= sunsetTime;
    const icon = isDayTime ? sunIcon : moonIcon;

    return (
        <div className="p-4 bg-[#2C2D35] text-white rounded-lg mb-4">
            <h2 className="text-lg font-bold mb-2">Sun & Moon</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                    <p className="text-white text-xl">{weather.sunrise}</p>
                    <p className="text-gray-400">Sunrise</p>
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg width="112" height="57" viewBox="0 0 112 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M111 56C111 25.6243 86.3757 1 56 1C25.6243 1 1 25.6243 1 56"
                            stroke="#9B9EAD"
                            strokeLinecap="round"
                            strokeDasharray="1 2"
                        />
                    </svg>
                    <div
                        className="absolute"
                        style={{
                            left: `${sunPosition}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <SvgIcon src={icon} className="w-6 h-6" />
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-white text-xl">{weather.sunset}</p>
                    <p className="text-gray-400">Sunset</p>
                </div>
            </div>
        </div>
    );
};
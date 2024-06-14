import { sunIcon, sunCloudIcon, precipitationIcon, moonIcon } from '@/assets/icons';

export const getWeatherIcon = (icon) => {
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

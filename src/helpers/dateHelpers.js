import { parse, format } from 'date-fns';

export const parseDateString = (dateString) => {
    return parse(dateString, 'dd.MM.yyyy', new Date());
};

export const formatDate = (date, dateFormat) => {
    return format(date, dateFormat);
};

import { zonedTimeToUtc } from 'date-fns-tz';

export const getCurrentDate = () => {
    return zonedTimeToUtc(new Date(), import.meta.env.TIMEZONE);
}

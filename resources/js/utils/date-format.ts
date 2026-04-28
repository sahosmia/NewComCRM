import { format, parseISO, isValid } from 'date-fns';

export const DATE_FORMATS = {
    default: 'MMM dd, yyyy',
    datetime: 'MMM dd, yyyy hh:mm a',
    time: 'hh:mm a',
    iso: 'yyyy-MM-dd',
    sql: 'yyyy-MM-dd HH:mm:ss',
    display: 'PPP',
    monthDay: 'LLL dd',
};

type DateInput = Date | string | number | null | undefined;

const ensureDate = (date: DateInput): Date | null => {
    if (!date) return null;
    if (date instanceof Date) return date;
    const parsed = typeof date === 'string' ? parseISO(date) : new Date(date);
    return isValid(parsed) ? parsed : null;
};

export const formatDate = (date: DateInput, formatStr: string = DATE_FORMATS.default): string => {
    const d = ensureDate(date);
    if (!d) return 'N/A';
    return format(d, formatStr);
};

export const formatDateTime = (date: DateInput): string => {
    return formatDate(date, DATE_FORMATS.datetime);
};

export const formatTime = (date: DateInput): string => {
    return formatDate(date, DATE_FORMATS.time);
};

export const formatDateForInput = (date: DateInput): string => {
    return formatDate(date, DATE_FORMATS.iso);
};

export const formatDisplayDate = (date: DateInput): string => {
    return formatDate(date, DATE_FORMATS.display);
};

export const formatMonthDay = (date: DateInput): string => {
    return formatDate(date, DATE_FORMATS.monthDay);
};

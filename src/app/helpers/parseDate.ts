export const parseDate = (date: Date) =>
    Intl.DateTimeFormat('es-MX', { timeStyle: 'short', dateStyle: 'full', hour12: true }).format(date);
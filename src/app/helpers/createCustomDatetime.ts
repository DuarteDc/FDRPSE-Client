export const createCustomDatetime = (date: Date, hours: string): Date => {
    const newDate = date.toISOString().split('T');
    const currentTime = hours.split(":")[0].length > 1 ? hours : "0" + hours;
    
    return new Date(`${newDate[0]}T${currentTime}`);
}

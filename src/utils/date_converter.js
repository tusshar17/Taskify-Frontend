const convert_date = (raw_date) => {
    const rawDate = raw_date;
    const dateObj = new Date(rawDate);
    const formatted = dateObj.toISOString().split('T')[0];
    return formatted
}


export default convert_date
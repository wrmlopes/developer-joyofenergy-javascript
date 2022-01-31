const average = (readings) => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

/**
 * Get a time elapsed in hours between first and last reading
 * @param {*} readings 
 * @returns 
 */
const timeElapsedInHours = (readings) => {
    readings.sort((a, b) => a.time - b.time);
    const miliseconds = readings[readings.length - 1].time - readings[0].time;
    const seconds = miliseconds/1000;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

const usage = (readings) => {
    return average(readings) / timeElapsedInHours(readings);
};

const usageCost = (readings, rate) => {
    return usage(readings) * rate;
};



const usageForAllPricePlans = (pricePlans, readings) => {
    return Object.entries(pricePlans).map(([key, value]) => {
        return {
            [key]: usageCost(readings, value.rate),
        };
    });
};

module.exports = {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
};

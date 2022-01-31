const { meters, meterPricePlanMap } = require("../meters/meters");
const { pricePlanNames, pricePlans } = require("../price-plans/price-plans");
const { readings } = require("../readings/readings");
const {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
} = require("./usage");

const mocksReadings = require('../_mocks/readings-mocks.json');

// mocks


describe("Usage tests", () => {
    
    describe("usage for all readings ....", () => {
        it("should average all readings for a meter", () => {
            const { getReadings } = readings({
                [meters.METER0]: mocksReadings.readings48h,
            });
    
            const averageMeter0 = average(getReadings(meters.METER0));
    
            expect(averageMeter0).toBe(0.26785);
        });
    
        it("should get time elapsed in hours for all readings for a meter", () => {
            const { getReadings } = readings({
                [meters.METER0]: mocksReadings.readings48h,
            });
    
            const timeElapsedMeter0 = timeElapsedInHours(
                getReadings(meters.METER0)
            );
    
            expect(timeElapsedMeter0).toBe(48);
        });
    
        it("should get usage for all readings for a meter", () => {
            const { getReadings } = readings({
                [meters.METER0]: mocksReadings.readings48h,
            });
    
            const usageMeter0 = usage(getReadings(meters.METER0));
    
            expect(usageMeter0).toBe(0.26785 / 48);
        });
    
        it("should get usage cost for all readings for a meter", () => {
            const { getReadings } = readings({
                [meters.METER2]: mocksReadings.readings48h,
            });
    
            const rate = meterPricePlanMap[meters.METER2].rate;
            const usageCostForMeter = usageCost(getReadings(meters.METER2), rate);
    
            expect(usageCostForMeter).toBe(0.26785 / 48 * 1);
        });
    
        it("should get usage cost for all readings for all price plans", () => {
            const { getReadings } = readings({
                [meters.METER2]: mocksReadings.readings48h,
            });
    
            const expected = [
                {
                    [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
                },
                {
                    [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
                },
                {
                    [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
                },
            ];
    
            const usageForAllPricePlansArray = usageForAllPricePlans(
                pricePlans,
                getReadings(meters.METER2)
            );
    
            expect(usageForAllPricePlansArray).toEqual(expected);
        });
    });

    describe( 'Usage for readings in interval', () => {

        it('should get usage cost for a "last week" for a meter with plan', () => {

        })
    })
})


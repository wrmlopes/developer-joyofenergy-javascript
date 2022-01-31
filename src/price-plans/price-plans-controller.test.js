const { meters } = require("../meters/meters");
const { pricePlanNames } = require("./price-plans");
const { readings } = require("../readings/readings");
const { compare, recommend } = require("./price-plans-controller");

const mockReadings = require('../_mocks/readings-mocks.json');

describe("price plans", () => {
    it("should compare usage cost for all price plans", () => {
        const { getReadings } = readings({
            [meters.METER0]: mockReadings.readings48h,
        });

        const expected = {
            pricePlanComparisons: [
                {
                    [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
                },
                {
                    [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
                },
                {
                    [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
                },
            ],
            smartMeterId: meters.METER0
        };

        const recommendation = compare(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should recommend usage cost for all price plans by ordering from cheapest to expensive", () => {
        const { getReadings } = readings({
            [meters.METER0]: mockReadings.readings48h,
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
            },
            {
                [pricePlanNames.PRICEPLAN0]: 0.26785 / 48 * 10,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {}
        });

        expect(recommendation).toEqual(expected);
    });

    it("should limit recommendation", () => {
        const { getReadings } = readings({
            [meters.METER0]: mockReadings.readings48h,
        });

        const expected = [
            {
                [pricePlanNames.PRICEPLAN2]: 0.26785 / 48 * 1,
            },
            {
                [pricePlanNames.PRICEPLAN1]: 0.26785 / 48 * 2,
            },
        ];

        const recommendation = recommend(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
            query: {
                limit: 2
            }
        });

        expect(recommendation).toEqual(expected);
    });
});

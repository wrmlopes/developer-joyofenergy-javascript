const {usageIntervalFromPreviousWeek} = require("./usage-interval");

describe("usage-interval", () => {
  it("should return the current week start as interval ending", () => {
    const date = new Date(2021, 8, 25, 10, 15); // 2021-09-25

    expect(usageIntervalFromPreviousWeek(date).end)
      .toBe(new Date(2021, 8, 19).getTime() / 1000);  // 2021-09-19
  });

  it("should return the previews week start as interval start", () => {
    const date = new Date(2021, 8, 25, 10, 15); // 2021-09-25

    expect(usageIntervalFromPreviousWeek(date).start)
      .toBe(new Date(2021, 8, 12).getTime() / 1000);  // 2021-09-12
  });
});


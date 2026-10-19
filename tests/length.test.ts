import { describe, expect, it } from "vitest";

import { convertLength } from "../src/length";

describe("convertLength", () => {
  it.each([
    { value: 1, fromUnit: "km", toUnit: "m", expected: 1000 },
    { value: 250, fromUnit: "cm", toUnit: "m", expected: 2.5 },
    { value: 1, fromUnit: "mi", toUnit: "m", expected: 1609.344 },
    { value: 1, fromUnit: "ft", toUnit: "in", expected: 12 },
    { value: 1, fromUnit: "in", toUnit: "cm", expected: 2.54 },
    { value: 1, fromUnit: "m", toUnit: "ft", expected: 3.280839895 },
    { value: -3, fromUnit: "m", toUnit: "cm", expected: -300 },
  ] as const)(
    "converts $value $fromUnit to $expected $toUnit",
    ({ value, fromUnit, toUnit, expected }) => {
      const result = convertLength(value, fromUnit, toUnit);

      expect(result).toBeCloseTo(expected, 9);
    },
  );

  it("returns the value unchanged when both units are the same", () => {
    const result = convertLength(42.5, "mi", "mi");

    expect(result).toBe(42.5);
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "rejects a non-finite value %s",
    (value) => {
      expect(() => convertLength(value, "m", "km")).toThrow(RangeError);
    },
  );

  it("rejects a conversion whose result overflows", () => {
    expect(() => convertLength(1e308, "km", "m")).toThrow(RangeError);
  });
});

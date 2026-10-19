/**
 * Length unit conversion.
 *
 * Imperial units use their exact international definitions (1959 agreement), so conversions
 * through the metre introduce no error beyond floating-point rounding.
 */

/** Supported length units, in display order. */
export const LENGTH_UNITS = ["m", "km", "cm", "mi", "ft", "in"] as const;

export type LengthUnit = (typeof LENGTH_UNITS)[number];

const METRES_BY_UNIT: Record<LengthUnit, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mi: 1609.344,
  ft: 0.3048,
  in: 0.0254,
};

/**
 * Converts a length from one unit to another.
 *
 * @param value - Length expressed in `fromUnit`; any finite number, negative included.
 * @param fromUnit - Unit of `value`.
 * @param toUnit - Unit of the returned length.
 * @returns The same length expressed in `toUnit`.
 * @throws {RangeError} If `value` is NaN or infinite, or the result is too large for a number.
 */
export function convertLength(value: number, fromUnit: LengthUnit, toUnit: LengthUnit): number {
  if (!Number.isFinite(value)) {
    throw new RangeError(`value must be a finite number, got ${value}`);
  }
  if (fromUnit === toUnit) {
    return value;
  }

  const converted = (value * METRES_BY_UNIT[fromUnit]) / METRES_BY_UNIT[toUnit];
  if (!Number.isFinite(converted)) {
    throw new RangeError(`${value} ${fromUnit} overflows when converted to ${toUnit}`);
  }
  return converted;
}

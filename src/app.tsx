import { useState } from "react";

import { convertLength, LENGTH_UNITS, type LengthUnit } from "./length";

const RESULT_SIGNIFICANT_DIGITS = 6;

const resultFormat = new Intl.NumberFormat("en", {
  maximumSignificantDigits: RESULT_SIGNIFICANT_DIGITS,
  useGrouping: false,
});

function isLengthUnit(candidate: string): candidate is LengthUnit {
  return (LENGTH_UNITS as readonly string[]).includes(candidate);
}

function describeConversion(valueText: string, fromUnit: LengthUnit, toUnit: LengthUnit): string {
  // Number("") is 0, so an empty field needs its own check; NaN covers any other non-number.
  const value = valueText.trim() === "" ? Number.NaN : Number(valueText);
  if (Number.isNaN(value)) {
    return "Enter a number";
  }

  let converted: number;
  try {
    converted = convertLength(value, fromUnit, toUnit);
  } catch (error) {
    if (error instanceof RangeError) {
      return "Value out of range";
    }
    throw error;
  }
  return `${valueText} ${fromUnit} = ${resultFormat.format(converted)} ${toUnit}`;
}

interface UnitSelectProps {
  label: string;
  unit: LengthUnit;
  onUnitChange: (unit: LengthUnit) => void;
}

function UnitSelect({ label, unit, onUnitChange }: UnitSelectProps) {
  return (
    <label>
      {label}
      <select
        value={unit}
        onChange={(event) => {
          if (isLengthUnit(event.target.value)) onUnitChange(event.target.value);
        }}
      >
        {LENGTH_UNITS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Root component of the unit converter page. */
export function App() {
  const [valueText, setValueText] = useState("1");
  const [fromUnit, setFromUnit] = useState<LengthUnit>("m");
  const [toUnit, setToUnit] = useState<LengthUnit>("ft");

  return (
    <main>
      <h1>Unit converter</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Value
          <input
            type="number"
            value={valueText}
            onChange={(event) => setValueText(event.target.value)}
          />
        </label>
        <UnitSelect label="From" unit={fromUnit} onUnitChange={setFromUnit} />
        <UnitSelect label="To" unit={toUnit} onUnitChange={setToUnit} />
      </form>
      <output>{describeConversion(valueText, fromUnit, toUnit)}</output>
    </main>
  );
}

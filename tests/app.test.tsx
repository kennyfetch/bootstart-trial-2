import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "../src/app";

// Testing Library only cleans up automatically when Vitest globals are enabled; they are not.
afterEach(cleanup);

function enterConversion(valueText: string, fromUnit: string, toUnit: string): void {
  fireEvent.change(screen.getByLabelText("Value"), { target: { value: valueText } });
  fireEvent.change(screen.getByLabelText("From"), { target: { value: fromUnit } });
  fireEvent.change(screen.getByLabelText("To"), { target: { value: toUnit } });
}

function readResult(): string | null {
  return screen.getByRole("status").textContent;
}

describe("App", () => {
  it("renders the page heading", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Unit converter" })).toBeDefined();
  });

  it("shows one metre in feet before any input", () => {
    render(<App />);

    expect(readResult()).toBe("1 m = 3.28084 ft");
  });

  it("shows the converted value for the chosen units", () => {
    render(<App />);

    enterConversion("1", "km", "mi");

    expect(readResult()).toBe("1 km = 0.621371 mi");
  });

  it.each([
    { valueText: "5", fromUnit: "cm", toUnit: "cm", expected: "5 cm = 5 cm" },
    { valueText: "0", fromUnit: "m", toUnit: "ft", expected: "0 m = 0 ft" },
    { valueText: "-2", fromUnit: "ft", toUnit: "in", expected: "-2 ft = -24 in" },
    { valueText: "0.5", fromUnit: "mi", toUnit: "m", expected: "0.5 mi = 804.672 m" },
    { valueText: "0.001", fromUnit: "cm", toUnit: "km", expected: "0.001 cm = 0.00000001 km" },
  ])(
    "shows $expected for $valueText $fromUnit to $toUnit",
    ({ valueText, fromUnit, toUnit, expected }) => {
      render(<App />);

      enterConversion(valueText, fromUnit, toUnit);

      expect(readResult()).toBe(expected);
    },
  );

  it("shows an out-of-range message when the result overflows", () => {
    render(<App />);

    enterConversion("1e308", "km", "m");

    expect(readResult()).toBe("Value out of range");
  });

  it("asks for a number when the value is empty", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Value"), { target: { value: "" } });

    expect(readResult()).toBe("Enter a number");
  });

  it("echoes the value exactly as typed, without rounding it", () => {
    render(<App />);

    enterConversion("1234567", "m", "ft");

    expect(readResult()).toBe("1234567 m = 4050420 ft");
  });

  it.each(["From", "To"])(
    "keeps the previous %s unit when the selected unit is unknown",
    (label) => {
      render(<App />);

      fireEvent.change(screen.getByLabelText(label), { target: { value: "yd" } });

      expect(readResult()).toBe("1 m = 3.28084 ft");
    },
  );
});

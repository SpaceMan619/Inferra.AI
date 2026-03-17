import { describe, it, expect } from "vitest";
import { getPasswordStrength } from "./passwordStrength";

describe("getPasswordStrength", () => {
  it("returns 0 for empty string", () => {
    expect(getPasswordStrength("")).toBe(0);
  });

  it("returns 1 (Weak) for short lowercase only", () => {
    expect(getPasswordStrength("abc")).toBe(1);
  });

  it("returns 2 (Fair) for 8+ chars with mixed case", () => {
    expect(getPasswordStrength("Password")).toBe(2);
  });

  it("returns 3 (Good) for 8+ chars with mixed case + number", () => {
    expect(getPasswordStrength("Password1")).toBe(3);
  });

  it("returns 4 (Strong) for 8+ chars with mixed case + number + special", () => {
    expect(getPasswordStrength("Pinno@8772")).toBe(4);
  });
});

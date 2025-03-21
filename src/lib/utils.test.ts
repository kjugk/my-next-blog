import { describe, expect, it } from "vitest";
import { cn } from "./utils";

// write your tests here
describe("cn", () => {
  it("should merge classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});

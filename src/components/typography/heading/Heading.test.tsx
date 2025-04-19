import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Heading } from "./Heading";

type HeadingSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

describe("Heading", () => {
  it("renders children correctly", () => {
    render(<Heading>Test Heading</Heading>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders as h2 tag by default", () => {
    render(<Heading>Default Heading</Heading>);
    const heading = screen.getByText("Default Heading");
    expect(heading.tagName).toBe("H2");
  });

  it("renders with the correct tag when as prop is provided", () => {
    const tags: ("h1" | "h2" | "h3" | "h4" | "h5" | "h6")[] = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ];

    tags.forEach((tag) => {
      const { unmount } = render(<Heading as={tag}>Heading {tag}</Heading>);
      const heading = screen.getByText(`Heading ${tag}`);
      expect(heading.tagName).toBe(tag.toUpperCase());
      unmount();
    });
  });

  it("applies the correct size classes", () => {
    const sizes: (
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
    )[] = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

    const sizeClassMap = {
      sm: "text-xs md:text-sm font-medium",
      md: "text-sm md:text-base font-medium",
      lg: "text-base md:text-lg font-medium",
      xl: "text-lg md:text-xl font-semibold",
      "2xl": "text-xl md:text-2xl font-semibold",
      "3xl": "text-2xl md:text-3xl font-semibold",
      "4xl": "text-3xl md:text-4xl font-bold",
      "5xl": "text-4xl md:text-5xl font-bold",
      "6xl": "text-5xl md:text-6xl font-bold",
    };

    sizes.forEach((size) => {
      const { unmount } = render(<Heading size={size}>Size {size}</Heading>);
      const heading = screen.getByText(`Size ${size}`);

      const classes = sizeClassMap[size].split(" ");
      classes.forEach((className) => {
        expect(heading.classList.contains(className)).toBe(true);
      });

      unmount();
    });
  });

  it("applies additional className when provided", () => {
    render(<Heading className="test-class">Heading with Class</Heading>);
    const heading = screen.getByText("Heading with Class");
    expect(heading.classList.contains("test-class")).toBe(true);
  });

  it("passes additional props to the element", () => {
    render(<Heading data-testid="heading-test">Heading with Props</Heading>);
    expect(screen.getByTestId("heading-test")).toBeInTheDocument();
  });

  it("applies responsive classes for all sizes", () => {
    const sizes: (
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
    )[] = ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

    const responsiveClassMap: Record<
      HeadingSize,
      { mobile: string; desktop: string }
    > = {
      sm: { mobile: "text-xs", desktop: "md:text-sm" },
      md: { mobile: "text-sm", desktop: "md:text-base" },
      lg: { mobile: "text-base", desktop: "md:text-lg" },
      xl: { mobile: "text-lg", desktop: "md:text-xl" },
      "2xl": { mobile: "text-xl", desktop: "md:text-2xl" },
      "3xl": { mobile: "text-2xl", desktop: "md:text-3xl" },
      "4xl": { mobile: "text-3xl", desktop: "md:text-4xl" },
      "5xl": { mobile: "text-4xl", desktop: "md:text-5xl" },
      "6xl": { mobile: "text-5xl", desktop: "md:text-6xl" },
    };

    sizes.forEach((size) => {
      const { unmount } = render(
        <Heading size={size}>Responsive {size}</Heading>,
      );
      const heading = screen.getByText(`Responsive ${size}`);

      // Check mobile class is applied
      expect(heading.classList.contains(responsiveClassMap[size].mobile)).toBe(
        true,
      );

      // Check desktop (md:) class is applied
      const classListArray = Array.from(heading.classList);
      const hasDesktopClass = classListArray.some((className) =>
        className.includes(responsiveClassMap[size].desktop.replace("md:", "")),
      );
      expect(hasDesktopClass).toBe(true);

      unmount();
    });
  });
});

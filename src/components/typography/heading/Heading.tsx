import React from "react";
import { cn } from "@/lib/utils";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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

interface HeadingProps {
  as?: HeadingElement;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<HeadingSize, string> = {
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

export const Heading = ({
  as: Element = "h2",
  size = "xl",
  children,
  className,
  ...props
}: HeadingProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Element className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Element>
  );
};

export default Heading;

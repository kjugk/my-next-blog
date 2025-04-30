import { cn } from "@/lib/utils";
import { JSX, PropsWithChildren } from "react";

const sizeClasses = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
};

export type ContainerProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  size?: keyof typeof sizeClasses;
}>;

export const Container = ({
  as: Component = "div",
  className,
  size = "md",
  children,
}: ContainerProps) => {
  const mergedCn = cn(sizeClasses[size], "w-full mx-auto", className);

  return <Component className={mergedCn}>{children}</Component>;
};

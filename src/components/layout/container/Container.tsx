import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Container = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  const mergedCn = cn("max-w-[768px] mx-auto", className);

  return <div className={mergedCn}>{children}</div>;
};

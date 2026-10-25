import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-[#E4DFD5]/60 rounded-none", className)}
      {...props}
    />
  );
}

export { Skeleton };

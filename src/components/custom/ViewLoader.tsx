import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ViewLoaderProps = {
  variant?: "card" | "billboard";
  className?: string;
};

export function ViewLoader({ variant = "card", className }: ViewLoaderProps) {
  if (variant === "billboard") {
    return (
      <div
        className={cn(
          "relative max-w-lg w-full",
          "bg-stone-100/95 border border-stone-300/60 rounded-xl shadow-lg",
          "overflow-hidden",
          className
        )}
      >
        <Skeleton className="aspect-[16/10] w-full rounded-none" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "bg-stone-100/95 border border-stone-300/60 shadow-lg",
        className
      )}
    >
      <CardHeader>
        <Skeleton className="h-7 w-2/5" />
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

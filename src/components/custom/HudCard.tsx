import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HudCardProps = {
  title: string;
  description: string;
  className?: string;
};

export function HudCard({ title, description, className }: HudCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 text-foreground shadow-lg",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
        <CardDescription className="text-foreground/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0" />
    </Card>
  );
}

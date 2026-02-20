import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  title: string;
  content: string;
  className?: string;
};

export function GlassCard({ title, content, className }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-md border-white/20 text-foreground shadow-lg",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground/90 whitespace-pre-wrap">{content}</p>
      </CardContent>
    </Card>
  );
}

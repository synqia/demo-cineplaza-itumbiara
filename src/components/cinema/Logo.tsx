import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className,
  href = "/",
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: "text-lg gap-1.5",
    md: "text-xl gap-2",
    lg: "text-2xl gap-2.5",
  };

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-8 w-8",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center font-heading font-bold tracking-wide",
        sizes[size],
        className
      )}
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-md border border-accent/50 bg-surface-elevated",
          iconSizes[size]
        )}
        aria-hidden
      >
        <span className="absolute inset-0.75 rounded-[3px] border border-primary/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="text-foreground">
        Cine<span className="text-primary">plaza</span>
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex shrink-0" aria-label="Cineplaza — página inicial">
      {content}
    </Link>
  );
}

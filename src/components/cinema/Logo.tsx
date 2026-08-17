import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}

const heights = {
  sm: "h-7",
  md: "h-8",
  lg: "h-10",
};

export default function Logo({
  className,
  href = "/",
  size = "md",
}: LogoProps) {
  const image = (
    <img
      src="/enterprise-logo.png"
      alt="Cineplaza"
      className={cn("w-auto", heights[size], className)}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="inline-flex shrink-0">
      {image}
    </Link>
  );
}

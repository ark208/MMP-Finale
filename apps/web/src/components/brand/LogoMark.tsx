import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className, ...props }: LogoMarkProps) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="SaferStreets emblem"
      {...props}
    >
      <defs>
        <linearGradient
          id={`shieldGrad-${id}`}
          x1="6"
          y1="4"
          x2="42"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2F2A6B" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      {/* Outer Shield Shell */}
      <path
        d="M24 4L8 10V22C8 31.5 14.8 40.2 24 44C33.2 40.2 40 31.5 40 22V10L24 4Z"
        fill={`url(#shieldGrad-${id})`}
      />
      {/* Dark Inner Shield Face */}
      <path
        d="M24 8L12 12.5V22C12 29.5 17.2 36.5 24 39.8C30.8 36.5 36 29.5 36 22V12.5L24 8Z"
        className="fill-slate-900"
      />
      {/* S-curved safety transit path */}
      <path
        d="M19 16C19 16 28 17 28 22C28 27 20 28 20 33"
        stroke="#14B8A6"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Crossroads Safety Beacon Point */}
      <circle cx="24" cy="22" r="3.5" fill="#FFFFFF" />
      <circle cx="24" cy="22" r="6.5" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

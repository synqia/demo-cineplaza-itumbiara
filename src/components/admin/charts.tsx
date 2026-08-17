"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent } from "@/lib/admin";

interface Series {
  id: string;
  label: string;
  color: string;
  values: number[];
}

export function AreaChart({
  labels,
  series,
}: {
  labels: string[];
  series: Series[];
}) {
  const [hidden, setHidden] = useState<string[]>([]);
  const visible = series.filter((item) => !hidden.includes(item.id));
  const width = 640;
  const height = 240;
  const pad = { top: 16, right: 12, bottom: 28, left: 52 };

  const max = Math.max(
    1,
    ...visible.flatMap((item) => item.values),
  );

  const pointsFor = (values: number[]) =>
    values
      .map((value, index) => {
        const x =
          pad.left +
          (index / Math.max(values.length - 1, 1)) *
            (width - pad.left - pad.right);
        const y =
          pad.top +
          (1 - value / max) * (height - pad.top - pad.bottom);
        return `${x},${y}`;
      })
      .join(" ");

  const areaFor = (values: number[]) => {
    const line = pointsFor(values);
    const firstX = pad.left;
    const lastX =
      pad.left + (width - pad.left - pad.right);
    const base = height - pad.bottom;
    return `M ${firstX},${base} L ${line.replace(/ /g, " L ")} L ${lastX},${base} Z`;
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {series.map((item) => {
          const active = !hidden.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setHidden((current) =>
                  current.includes(item.id)
                    ? current.filter((id) => id !== item.id)
                    : [...current, item.id]
                )
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs",
                active
                  ? "border-border bg-muted/40 text-foreground"
                  : "border-transparent text-muted-foreground line-through"
              )}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: item.color }}
              />
              {item.label}
            </button>
          );
        })}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 w-full"
        role="img"
        aria-label="Evolução da receita"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = pad.top + (1 - tick) * (height - pad.top - pad.bottom);
          return (
            <g key={tick}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y}
                y2={y}
                className="stroke-border"
                strokeWidth="1"
              />
              <text
                x={pad.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[10px]"
              >
                {formatCurrency(max * tick).replace("R$", "").trim()}
              </text>
            </g>
          );
        })}
        {visible.map((item) => (
          <g key={item.id}>
            <path d={areaFor(item.values)} fill={item.color} opacity="0.16" />
            <polyline
              fill="none"
              stroke={item.color}
              strokeWidth="2"
              points={pointsFor(item.values)}
            />
          </g>
        ))}
        {labels.map((label, index) => {
          const x =
            pad.left +
            (index / Math.max(labels.length - 1, 1)) *
              (width - pad.left - pad.right);
          if (index % Math.ceil(labels.length / 6) !== 0) return null;
          return (
            <text
              key={label}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {label}
            </text>
          );
        })}
      </svg>
      <ChartHover labels={labels} series={visible} />
    </div>
  );
}

function ChartHover({
  labels,
  series,
}: {
  labels: string[];
  series: Series[];
}) {
  const last = labels.length - 1;
  if (last < 0) return null;
  return (
    <p className="mt-2 text-xs text-muted-foreground">
      Último ponto ({labels[last]}):{" "}
      {series
        .map(
          (item) =>
            `${item.label} ${formatCurrency(item.values[last] ?? 0)}`
        )
        .join(" · ")}
    </p>
  );
}

export function DonutChart({
  items,
}: {
  items: Array<{ label: string; value: number; color: string }>;
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <svg viewBox="0 0 140 140" className="size-36" role="img" aria-label="Vendas por canal">
        <circle
          cx="70"
          cy="70"
          r={radius}
          className="fill-none stroke-muted"
          strokeWidth="16"
        />
        {items.map((item) => {
          const length = (item.value / total) * circumference;
          const circle = (
            <circle
              key={item.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="16"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
            />
          );
          offset += length;
          return circle;
        })}
        <text
          x="70"
          y="66"
          textAnchor="middle"
          className="fill-foreground text-lg font-heading"
        >
          100%
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          dos canais
        </text>
      </svg>
      <ul className="w-full space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: item.color }}
              />
              {item.label}
            </span>
            <span className="tabular-nums text-muted-foreground">
              {formatPercent(item.value, 0)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BarChart({
  items,
}: {
  items: Array<{ label: string; value: number }>;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>{item.label}</span>
            <span className="tabular-nums text-muted-foreground">
              {formatPercent(item.value)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function OccupancyBar({ value, className }: { value: number; className?: string }) {
  const percent = Math.round(value * 100);
  return (
    <div className={cn("flex min-w-28 items-center gap-2", className)}>
      <div className="h-1.5 flex-1 rounded-full bg-muted">
        <div
          className={cn(
            "h-1.5 rounded-full",
            percent >= 90 ? "bg-primary" : percent >= 70 ? "bg-accent" : "bg-emerald-500"
          )}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
        {percent}%
      </span>
    </div>
  );
}

export function TrendBadge({ value }: { value: number }) {
  const positive = value > 0;
  const neutral = value === 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
        neutral && "bg-muted text-muted-foreground",
        positive && "bg-emerald-500/15 text-emerald-400",
        !positive && !neutral && "bg-primary/15 text-primary"
      )}
    >
      {neutral ? "0%" : `${positive ? "+" : ""}${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`}
    </span>
  );
}

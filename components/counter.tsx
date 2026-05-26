"use client";


export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <span>
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

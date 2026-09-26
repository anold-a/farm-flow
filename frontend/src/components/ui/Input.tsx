"use client";

import { InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?:string;
}

export default function Input({
  label,
  className="",
  ...props
}: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold tracking-wide text-slate-200">
        {label}
      </label>

      <input
        {...props}
        className={`w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 ${className}`}
      />
    </div>
  );
}
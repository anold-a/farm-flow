"use client";

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function FieldSearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="search"
      placeholder="Search fields..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
        
      }
      aria-label="Search fields"
      className="w-full rounded-md border border-gray-300 text-sm outline-none focus:border-emerald-600 p-3"
    />
  );
}
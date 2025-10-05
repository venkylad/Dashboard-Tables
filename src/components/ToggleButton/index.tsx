import type { ReactNode } from "react";

interface ToggleButtonGroupProps<T extends string | number> {
  options: { label: string; value: T; icon?: ReactNode }[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ToggleButtonGroup<T extends string | number>({
  options,
  selected,
  onChange,
  className,
}: ToggleButtonGroupProps<T>) {
  return (
    <div
      className={`border-gray-400 border rounded-md overflow-hidden flex ${
        className || ""
      }`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`p-2 text-xs flex items-center gap-1 cursor-pointer transition ${
            selected === opt.value
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onChange(opt.value)} // ✅ now strongly typed
        >
          {opt.icon && <span>{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

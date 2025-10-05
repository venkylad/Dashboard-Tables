import type { ReactNode } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  icon?: ReactNode;
  value: string | number;
  options: (string | Option)[];
  placeholder?: string; // optional
  onChange: (value: string) => void;
}

export const SelectField = ({
  icon,
  value,
  options,
  placeholder,
  onChange,
}: SelectFieldProps) => (
  <div className="relative flex items-center border border-gray-300 rounded-md px-2 py-1.5 bg-white gap-2 w-full md:w-auto hover:border-blue-400 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-400 focus-within:outline-none transition-all">
    {icon}
    <select
      className="appearance-none border-0 bg-transparent pr-6 pl-1 text-sm text-gray-700 focus:ring-0 focus:outline-0 cursor-pointer w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option
            className="text-gray-700 font-normal text-sm"
            key={opt}
            value={opt}
          >
            {opt}
          </option>
        ) : (
          <option
            className="text-gray-700 font-normal text-sm"
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        )
      )}
    </select>

    {/* custom arrow */}
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  </div>
);

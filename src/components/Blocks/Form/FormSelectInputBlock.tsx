import React from "react";

interface FormSelectInputBlockProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  isRequired: boolean;
  onChange: (value: string) => void;
}

const FormSelectInputBlock: React.FC<FormSelectInputBlockProps> = ({
  id,
  label,
  value,
  options,
  isRequired,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full"
      required={isRequired}
      aria-label={label}
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelectInputBlock;

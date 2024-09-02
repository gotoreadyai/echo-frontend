import React from "react";

interface FormRelationInputBlockProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isRequired: boolean;
}

const FormRelationInputBlock: React.FC<FormRelationInputBlockProps> = ({
  id,
  label,
  value,
  onChange,
  isRequired,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type="text"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input input-bordered w-full"
      required={isRequired}
      aria-label={label}
    />
  </div>
);

export default FormRelationInputBlock;

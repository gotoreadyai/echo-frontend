import React from "react";

interface FormTextareaBlockProps {
  id: string;
  label: string;
  value: string;
  isRequired: boolean;
  onChange: (value: string) => void;
}

const FormTextareaBlock: React.FC<FormTextareaBlockProps> = ({
  id,
  label,
  value,
  isRequired,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="textarea textarea-bordered w-full"
      required={isRequired}
      aria-label={label}
    />
  </div>
);

export default FormTextareaBlock;

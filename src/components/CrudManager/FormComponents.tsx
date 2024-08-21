
interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isRequired: boolean;
}

export const TextInput = ({
  id,
  label,
  value,
  onChange,
  isRequired,
}: TextInputProps) => (
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

interface TextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  isRequired: boolean;
}

export const Textarea = ({
  id,
  label,
  value,
  onChange,
  isRequired,
}: TextareaProps) => (
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

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  isRequired: boolean;
}

export const SelectInput = ({
  id,
  label,
  value,
  onChange,
  options,
  isRequired,
}: SelectInputProps) => (
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

export const RelationInput = ({
  id,
  label,
  value,
  onChange,
  isRequired,
}: TextInputProps) => (
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

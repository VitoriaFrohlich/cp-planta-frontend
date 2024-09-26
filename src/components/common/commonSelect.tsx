interface SelectProps {
  label: string;
  placeholder: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const commonSelect: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  onChange,
  value
}) => {
  return (
    <div className="mb-4">
      <label className="block text-black mb-1">{label}</label>
      <select
        className="w-full mt-1 border border-greenHortti rounded-lg p-2"
        onChange={onChange}
        value={value}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default commonSelect;

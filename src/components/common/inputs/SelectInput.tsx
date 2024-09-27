interface SelectInputProps {
  label: string;
  placeholder: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const selectInput: React.FC<SelectInputProps> = ({
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
        className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2"
        onChange={onChange}
        value={value}
      >
        {placeholder && (
          <option className="text-[#1e1e1e]" value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option className="text-[#1e1e1e]" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default selectInput;

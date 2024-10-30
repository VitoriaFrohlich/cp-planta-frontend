interface SelectInputProps {
  label: string;
  placeholder: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  error?: string;
}

const selectInput: React.FC<SelectInputProps> = ({
  label,
  placeholder,
  options,
  onChange,
  error,
  value
}) => {
  return (
    <div className="mb-4">
      <label className="block text-black mb-1">{label}</label>
      <select
        className="w-full text-black mt-1 border border-greenHortti rounded-lg p-2 box"
        onChange={onChange}
        value={value}
      >
        {placeholder && (
          <option className="text-[#1e1e1e] w-full" value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option className="text-[#1e1e1e] w-full" key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* Exibe o erro se houver */}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default selectInput;

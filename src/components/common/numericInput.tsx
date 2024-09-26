interface NumericInputProps {
  label: string;
  placeholder: string;
  disable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
}

const numericInput: React.FC<NumericInputProps> = ({
  label,
  placeholder,
  disable,
  onChange,
  value
}) => {
  return (
    <div className="mb-4">
      <label className="block text-black mb-1">{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        className="w-full mt-1 border border-greenHortti rounded-lg p-2"
        disabled={disable === undefined ? false : disable}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default numericInput;

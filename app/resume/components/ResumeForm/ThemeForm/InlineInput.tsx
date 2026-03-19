interface InputProps<K extends string, V extends string> {
  label: string;
  labelClassName?: string;
  name: K;
  value?: V;
  placeholder: string;
  inputStyle?: React.CSSProperties;
  onChange: (name: K, value: V) => void;
}

export const InlineInput = <K extends string>({
  label,
  labelClassName,
  name,
  value = "",
  placeholder,
  inputStyle = {},
  onChange,
}: InputProps<K, string>) => {
  return (
    <label
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 ${labelClassName}`}
    >
      <span>{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-[6rem] border-b border-slate-200 bg-transparent text-center font-bold text-slate-900 outline-none transition-all focus:border-slate-900"
        style={inputStyle}
      />
    </label>
  );
};

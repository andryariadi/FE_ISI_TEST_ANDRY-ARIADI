type InputFieldProps = {
  icon?: React.ReactNode;
  passIcon?: React.ReactNode;
  openPass?: boolean;
  setOpenPass?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  propData?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({ icon, passIcon, openPass, setOpenPass, type, propData, ...props }: InputFieldProps) => {
  return (
    <div className="relative">
      {/* Left icon */}
      <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-logo">{icon}</div>

      {/* Password visibility toggle (for password fields only) */}
      {type === "password" || type === "text" ? (
        <div className="absolute inset-y-0 right-0 px-3 flex items-center text-logo cursor-pointer" onClick={() => setOpenPass && setOpenPass(!openPass)}>
          {passIcon}
        </div>
      ) : null}

      {/* Input field */}
      <input
        {...propData}
        {...props}
        type={type}
        className="w-full py-3 pl-9 pr-3 bg-bgrd rounded-lg outline-none border border-gray-800 focus:border-logo text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
      />
    </div>
  );
};

export default InputField;

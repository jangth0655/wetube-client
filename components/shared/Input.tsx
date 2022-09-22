import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  placeholder: string;
  id: string;
  label: string;
  type: string;
  register?: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  id,
  label,
  type,
  register,
}) => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      <label className="uppercase font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        {...register}
        className="px-2 py-1 rounded-md text-zinc-700 shadow-black shadow-md"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

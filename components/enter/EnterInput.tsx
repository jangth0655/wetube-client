import { UseFormRegisterReturn } from "react-hook-form";

interface EnterInputProps {
  type: string;
  id: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
}

const EnterInput: React.FC<EnterInputProps> = ({
  type,
  id,
  placeholder,
  register,
}) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <input
        className="p-2 rounded-lg  text-zinc-700 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
};
export default EnterInput;

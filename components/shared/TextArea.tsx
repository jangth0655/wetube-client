import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label: string;
  id: string;
  name: string;
  register?: UseFormRegisterReturn;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, name, register }) => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      <label className="uppercase font-bold" htmlFor={id}>
        {label}
      </label>
      <textarea
        {...register}
        className="w-full rounded-lg text-zinc-700 px-2 py-1"
        name={name}
        id={id}
        rows={10}
      />
    </div>
  );
};

export default TextArea;

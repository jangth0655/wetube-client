import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, register }) => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      <label htmlFor={id} className="uppercase font-bold">
        {label}
      </label>
      <textarea
        {...register}
        className="w-full rounded-lg text-zinc-700 px-2 py-1"
        id={id}
        rows={10}
      />
    </div>
  );
};

export default TextArea;

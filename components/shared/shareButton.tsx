import Image from "next/image";
import github from "../../public/image/github.png";

interface ButtonProps {
  loading?: boolean;
  text: string;
  social?: boolean;
}

const ShareButton: React.FC<ButtonProps> = ({ loading, text, social }) => {
  console.log("social", loading);
  return (
    <button className="text-zinc-100 uppercase">
      {loading ? "Loading..." : text}
    </button>
  );
};
export default ShareButton;

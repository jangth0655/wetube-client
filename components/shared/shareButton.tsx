import Image from "next/image";
import github from "../../public/image/github.png";

interface ButtonProps {
  loading?: boolean;
  text: string;
  social?: boolean;
}

const ShareButton: React.FC<ButtonProps> = ({ loading, text, social }) => {
  return social ? (
    <button className="text-zinc-100 uppercase flex justify-center items-center w-full space-x-2">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="relative w-6 h-6 ">
            <Image
              src={github}
              layout="fill"
              objectFit="cover"
              alt=""
              placeholder="blur"
              priority
            />
          </div>
          <span>{text}</span>
        </>
      )}
    </button>
  ) : (
    <button className="text-zinc-100 uppercase">
      {loading ? "Loading..." : text}
    </button>
  );
};
export default ShareButton;

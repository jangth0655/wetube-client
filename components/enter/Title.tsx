import Image from "next/image";
import logo from "../../public/image/logo/wetube-logo.png";

interface EnterTitleProps {
  title: string;
}

const EnterTitle: React.FC<EnterTitleProps> = ({ title }) => {
  return (
    <>
      <div className="mb-16">
        <h1 className="text-center font-bold text-zinc-700 dark:text-zinc-50 uppercase text-3xl ">
          {title}
        </h1>
        <div className="w-[100%] h-[1px] bg-zinc-300 mt-2" />
      </div>
      <div className="flex items-center space-x-4 mb-10">
        <div className="uppercase font-bold text-xl">
          <span className="text-rose-600">we</span>
          <span>tube</span>
        </div>
        <div className="relative w-14 h-14">
          <Image src={logo} layout="fill" objectFit="cover" alt="" />
        </div>
      </div>
    </>
  );
};

export default EnterTitle;

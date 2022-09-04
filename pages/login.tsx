import { NextPage } from "next";
import Image from "next/image";
import logo from "../public/image/logo/wetube-logo.png";
import loginImage from "../public/image/login/login.jpg";
import EnterInput from "../components/enter/EnterInput";
import ShareButton from "../components/shared/shareButton";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const onSignUp = () => {
    router.push("/signUp");
  };
  return (
    <section className="min-h-screen flex">
      <div className="relative h-screen w-0 lg:w-[60%]">
        <Image src={loginImage} layout="fill" objectFit="cover" alt="" />
      </div>

      <main className="my-48 w-[100%] lg:w-[40%] flex flex-col justify-center items-center ">
        <div className="mb-16">
          <h1 className="text-center font-bold text-zinc-700 uppercase text-3xl ">
            Login
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
        <form className="flex flex-col lg:w-[70%] sm:w-[50%] w-[70%] space-y-8">
          <div className="space-y-4">
            <EnterInput type="text" id="username" placeholder="Username" />
            <EnterInput type="password" id="password" placeholder="Password" />
          </div>
          <div className="border-2 p-2 rounded-lg bg-zinc-800 text-zinc-50 text-center hover:bg-zinc-700 cursor-pointer transition-all">
            <ShareButton text="Continue" loading={false} />
          </div>
          <div onClick={onSignUp} className="text-center mt-2">
            <span className="cursor-pointer text-blue-400 hover:text-blue-600 font-bold text-sm transition-all">
              Go Sign-Up
            </span>
          </div>
        </form>
      </main>
    </section>
  );
};
export default Login;

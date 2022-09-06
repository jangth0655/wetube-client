import { NextPage } from "next";
import Image from "next/image";
import loginImage from "../public/image/login/login.jpg";
import EnterInput from "../components/enter/EnterInput";
import ShareButton from "../components/shared/shareButton";
import { useRouter } from "next/router";
import EnterTitle from "../components/enter/Title";
import { useForm } from "react-hook-form";
import useMutation from "../libs/mutation";
import { useEffect } from "react";
import ErrorMessage from "../components/shared/ErrorMessage";
import Link from "next/link";

interface LoginForm {
  username: string;
  password: string;
  error?: string;
}

interface LoginMutation {
  ok: boolean;
  loggedIn: boolean;
  error?: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();
  const [login, { data, loading, error }] = useMutation<LoginMutation>("login");

  const router = useRouter();

  const onSignUp = () => {
    router.push("/signUp");
  };

  const onValid = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };

  useEffect(() => {
    if (data?.loggedIn) {
      router.push("/");
    }
  }, [router, data]);

  useEffect(() => {
    if (error) {
      setError("error", { message: error });
    }
  }, [error, setError]);

  const errorMessage = errors.username?.message || errors.password?.message;

  return (
    <section className="min-h-screen flex">
      <div className="relative min-h-screen w-0 lg:w-[60%]">
        <Image
          src={loginImage}
          layout="fill"
          objectFit="cover"
          alt=""
          placeholder="blur"
          priority
        />
      </div>

      <main className="my-48 w-[100%] lg:w-[40%] flex flex-col justify-center items-center ">
        <EnterTitle title="login" />
        {errorMessage && <ErrorMessage error={errorMessage} />}
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col lg:w-[70%] sm:w-[50%] w-[70%] space-y-8"
        >
          <div className="space-y-4">
            <EnterInput
              register={register("username", {
                required: "Username is required.",
              })}
              type="text"
              id="username"
              placeholder="Username"
            />
            <EnterInput
              register={register("password", {
                required: "Password is required",
              })}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-50 text-center hover:bg-zinc-700 cursor-pointer transition-all">
            <ShareButton social={false} text="Continue" loading={loading} />
          </div>
        </form>
        <div onClick={onSignUp} className="text-center mt-10">
          <span className="cursor-pointer text-blue-400 hover:text-blue-600 font-bold text-sm transition-all">
            Go Sign-Up
          </span>
        </div>
      </main>
    </section>
  );
};
export default Login;

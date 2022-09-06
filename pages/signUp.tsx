import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import EnterInput from "../components/enter/EnterInput";
import EnterLayout from "../components/enter/EnterLayout";
import EnterTitle from "../components/enter/Title";
import ErrorMessage from "../components/shared/ErrorMessage";
import ShareButton from "../components/shared/shareButton";
import useMutation from "../libs/mutation";
import signUp from "../public/image/signUp/signUp.jpg";

interface SignUpMutation {
  ok: boolean;
}

interface SignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  location: string;
  error?: string;
}

const SignUp: NextPage = () => {
  const router = useRouter();
  const onLogin = () => {
    router.push("/login");
  };
  const [join, { loading, data, error }] = useMutation<SignUpMutation>("join");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignUpForm>();

  const onValid = (data: SignUpForm) => {
    if (loading) return;
    join(data);
  };
  useEffect(() => {
    if (error) {
      setError("error", { message: error });
    }
  }, [setError, error]);

  useEffect(() => {
    if (data?.ok) {
      router.push("/login");
    }
  }, [data?.ok, router]);

  const errorMessage =
    errors.username?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message ||
    errors.email?.message;

  return (
    <section className="min-h-screen flex">
      <div className="relative h-screen w-0 lg:w-[60%]">
        <Image src={signUp} layout="fill" objectFit="cover" alt="" />
      </div>

      <EnterLayout>
        <EnterTitle title="signup" />
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
              register={register("email", {
                required: "Email is required.",
                validate: {
                  emailForm: (value) =>
                    value.includes("@") || "Please email form.",
                },
              })}
              type="text"
              id="email"
              placeholder="Email"
            />
            <EnterInput
              register={register("name")}
              type="text"
              id="name"
              placeholder="Name"
            />
            <EnterInput
              register={register("location")}
              type="text"
              id="location"
              placeholder="Location"
            />
            <EnterInput
              register={register("password", {
                required: "Password is required.",
              })}
              type="password"
              id="password"
              placeholder="Password"
            />
            <EnterInput
              register={register("confirmPassword", {
                required: "Password is required.",
              })}
              type="password"
              id="confirm"
              placeholder="Confirm"
            />
          </div>
          <div className="border-2 p-2 rounded-lg bg-zinc-800 text-zinc-50 text-center hover:bg-zinc-700 cursor-pointer transition-all">
            <ShareButton text="Continue" loading={loading} />
          </div>
        </form>
        <div onClick={onLogin} className="text-center mt-10">
          <span className="cursor-pointer text-blue-400 hover:text-blue-600 font-bold text-sm transition-all">
            Go Login
          </span>
        </div>
      </EnterLayout>
    </section>
  );
};

export default SignUp;

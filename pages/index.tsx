import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useMutation from "../libs/mutation";
import useUser from "../libs/useUser";
import BASE_URL from "../server";

interface Logout {
  ok: boolean;
  error?: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR(`${BASE_URL}`);
  const { user } = useUser({ isPrivate: false });
  const [logout, { data: logoutData, loading, error: logoutError }] =
    useMutation<Logout>("logout");
  // withCredentials : 쿠키정보를 공유할 수 있다.

  const onLogout = () => {
    if (loading) return;
    logout({});
  };

  useEffect(() => {
    if (logoutData?.ok) {
      router.replace("/login");
    }
  }, [logoutData, router]);

  return (
    <div className="">
      <button
        className="border-2 bg-teal-600 text-zinc-100 p-1 rounded-md"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;

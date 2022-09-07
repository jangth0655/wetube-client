import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Layout from "../components/layout";
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

  useEffect(() => {
    if (logoutData?.ok) {
      router.replace("/login");
    }
  }, [logoutData, router]);

  return (
    <Layout>
      <h1>hello</h1>
    </Layout>
  );
};

export default Home;

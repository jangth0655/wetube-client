import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data, error } = useSWR("http://localhost:8000/");

  return <div className="bg-black text-zinc-50">hello world</div>;
};

export default Home;

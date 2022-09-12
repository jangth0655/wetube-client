import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../components/layout";
import { Video } from "../libs/interface";
import useMutation from "../libs/mutation";
import useUser from "../libs/useUser";
import BASE_URL from "../server";
import Player from "react-player/lazy";

interface Logout {
  ok: boolean;
  error?: string;
}

interface VideoData {
  ok: boolean;
  videos: Video[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data, error } = useSWR<VideoData>(`${BASE_URL}`);
  const { user } = useUser({ isPrivate: false });
  const [logout, { data: logoutData, loading, error: logoutError }] =
    useMutation<Logout>("logout");
  // withCredentials : 쿠키정보를 공유할 수 있다.

  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (logoutData?.ok) {
      router.replace("/login");
    }
  }, [logoutData, router]);

  return (
    <Layout>
      <div></div>
      {data?.videos.map((video) => (
        <div key={video._id} className="flex justify-center items-center ">
          <div className="w-72 h-64">
            <Player
              width="100%"
              height="100%"
              url={video.url}
              controls
              playing={isPlaying}
            />
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Home;

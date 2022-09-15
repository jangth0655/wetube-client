import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../components/layout";
import { User, Video } from "../libs/interface";
import useUser from "../libs/useUser";
import BASE_URL from "../server";

import VideoPlayer from "../components/VideoPlayer";

interface videoWithUser extends Video {
  user: User;
}

interface VideoData {
  ok: boolean;
  videos: videoWithUser[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { data: videoData, error: videoError } = useSWR<VideoData>(
    `${BASE_URL}`
  );

  return (
    <Layout>
      <div></div>
      {videoData?.videos.map((video) => (
        <div key={video._id} className="flex justify-center items-center">
          <VideoPlayer video={video} user={video.user} />
        </div>
      ))}
    </Layout>
  );
};

export default Home;

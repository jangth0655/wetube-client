import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../components/layout";
import { User, Video } from "../libs/interface";
import BASE_URL from "../server";

import VideoList from "../components/videoList";

interface videoWithUser extends Video {
  user: User;
}

interface VideoData {
  ok: boolean;
  videos: videoWithUser[];
}

const Home: NextPage = () => {
  const { data: videoData, error: videoError } = useSWR<VideoData>(
    `${BASE_URL}`
  );

  return (
    <Layout>
      {videoData?.videos.map((video) => (
        <div key={video._id} className="grid sm:grid-cols-3 grid-cols-2 gap-4">
          <VideoList video={video} user={video.user} />
        </div>
      ))}
    </Layout>
  );
};

export default Home;

import type { NextPage } from "next";
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 space-y-20 sm:space-y-0">
        {videoData?.videos.map((video) => (
          <div key={video._id}>
            <VideoList video={video} user={video.user} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

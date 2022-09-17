import Image from "next/image";
import { User, Video } from "../libs/interface";

import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";

interface VideoListProps {
  video: Video;
  user: User;
}

const VideoList: React.FC<VideoListProps> = ({ video, user }) => {
  const router = useRouter();
  const videoDetail = (videoId: string) => {
    router.push(`/videos/${videoId}`);
  };
  return (
    <section>
      <div className="shadow-black shadow-md">
        <div
          onClick={() => videoDetail(video._id)}
          className="bg-black p-2 cursor-pointer rounded-t-md"
        >
          <video className="w-full h-48" src={video.url}></video>
        </div>

        <div className="flex items-center px-4 py-2 space-x-4 bg-zinc-900">
          <div className="relative w-10 h-10 cursor-pointer">
            {user?.avatarId ? (
              <Image
                src={user.avatarId}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            ) : (
              <div className="w-10 h-10 bg-zinc-400 rounded-full flex justify-center items-center">
                <FaUser />
              </div>
            )}
          </div>
          <div>
            <span>{user.username}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoList;

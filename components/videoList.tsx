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

  const onProfile = (userId: string) => {
    router.push(`users/${userId}`);
  };
  return (
    <section>
      <div className="shadow-xl w-[70%] sm:w-full m-auto">
        <div
          onClick={() => videoDetail(video._id)}
          className="p-2 cursor-pointer"
        >
          <video className="w-full h-full" src={video.url}></video>
        </div>

        <div className="flex items-center justify-between px-4 py-2 rounded-b-md">
          <div
            onClick={() => onProfile(user._id)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative w-8 h-8">
              {user?.avatarId ? (
                <Image
                  src={user.avatarId}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              ) : (
                <div className="w-8 h-8 bg-zinc-400 rounded-full flex justify-center items-center">
                  <FaUser />
                </div>
              )}
            </div>
            <div>
              <span className="text-sm">{user.username}</span>
            </div>
          </div>
          <div>
            <span className="font-bold">{video.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoList;

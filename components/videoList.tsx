import Image from "next/image";
import { User, Video } from "../libs/interface";

import { useRouter } from "next/router";
import { dateFormate } from "../libs/dateFormat";

import { FaUser } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";

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
      <div className="w-[70%] sm:w-full m-auto border-[1px] border-zinc-700 shadow-black shadow-sm rounded-md">
        <div
          onClick={() => videoDetail(video._id)}
          className="p-2 cursor-pointer relative h-56 "
        >
          {video.thumbnailURL ? (
            <Image
              className="rounded-t-md"
              src={video.thumbnailURL}
              objectFit="cover"
              layout="fill"
              alt=""
            />
          ) : (
            <div className="absolute w-full h-full flex justify-center items-center space-x-2">
              <MdImageNotSupported size={30} />
              <span className="text-sm">썸네일이 없습니다.</span>
            </div>
          )}
        </div>

        <div className="px-4 py-2 rounded-b-md">
          <div className="flex items-center justify-between">
            <div
              onClick={() => onProfile(user._id)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full">
                {user?.avatarId ? (
                  <Image
                    className="rounded-full"
                    src={user.avatarId}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                    priority
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

          <div className="flex items-center space-x-3 mt-2">
            <div className="space-x-2 text-rose-400">
              <span className="text-xs">조회수</span>
              <span className="text-xs">{video.meta.view}</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-xs">{dateFormate(video.createAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoList;

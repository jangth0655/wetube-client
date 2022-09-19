import { useRouter } from "next/router";
import useUser from "../../../libs/useUser";

import { FaUser } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import PageNav from "../../../components/PageNav";
import Image from "next/image";
import { useEffect } from "react";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const router = useRouter();
  const { user } = useUser({ isPrivate: true });

  const onEdit = (id?: string) => {
    router.push(`/users/${id}/edit`);
  };

  const onVideoDetail = (videoId: string) => {
    router.push(`/videos/${videoId}`);
  };

  const confirmProfileUser = user?._id === router.query.id;

  useEffect(() => {
    if (user?._id !== router.query.id) {
      router.replace("/");
    }
  }, [router, user?._id]);

  return (
    <PageNav title={`${user?.username}' Profile`}>
      <div className="flex justify-center items-center">
        <div className="space-x-8 flex items-center">
          {user?.avatarId ? (
            <div className="w-28 h-28 rounded-full relative shadow-black shadow-md">
              <Image
                className="rounded-full"
                src={user?.avatarId}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </div>
          ) : (
            <div className="rounded-full bg-zinc-400 w-28 h-28 sm:w-36 sm:h-36  flex justify-center items-center text-3xl shadow-black shadow-md">
              <FaUser />
            </div>
          )}

          <div className="h-full flex justify-center items-center space-x-20">
            <span className="font-bold text-xl">{user?.username}</span>
            {confirmProfileUser ? (
              <div
                onClick={() => onEdit(user?._id)}
                className="text-xl hover:text-rose-500 transition-all cursor-pointer"
              >
                <FaRegEdit />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-28 px-2">
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-4">
          {user?.videos.map((video) => (
            <div
              onClick={() => onVideoDetail(video._id)}
              className="w-full h-72 shadow-black shadow-md cursor-pointer"
              key={video._id}
            >
              <video className="w-full h-[85%] p-2" src={video.url}></video>
              <div className="h-[15%] p-2">
                <span className="font-bold dark:text-zinc-100">
                  {video.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageNav>
  );
};

export default UserProfile;

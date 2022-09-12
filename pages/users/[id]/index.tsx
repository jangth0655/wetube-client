import { useRouter } from "next/router";
import useUser from "../../../libs/useUser";

import { FaUser } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import PageNav from "../../../components/PageNav";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const router = useRouter();
  const { user } = useUser({ isPrivate: true });

  const onEdit = (id?: string) => {
    router.push(`/users/${id}/edit`);
  };

  return (
    <PageNav title={`${user?.username}' Profile`}>
      <div className="flex justify-center">
        <div className="space-x-8 flex items-center">
          {user?.avatarId ? (
            <div>{user.avatarId}</div>
          ) : (
            <div className="rounded-full bg-zinc-400 w-28 h-28 sm:w-36 sm:h-36 shadow-black shadow-lg flex justify-center items-center text-3xl">
              <FaUser />
            </div>
          )}

          <div className="h-full flex justify-center items-center space-x-20">
            <span className="font-bold text-xl">{user?.username}</span>
            {user ? (
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

      <div></div>
    </PageNav>
  );
};

export default UserProfile;

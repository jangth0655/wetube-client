import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import BASE_URL from "../server";
import { User, Video } from "./interface";

interface UserWithVideo extends User {
  videos: Video[];
}

interface IUser {
  ok: boolean;
  user: UserWithVideo;
}

interface UserProps {
  isPrivate: boolean;
}

const useUser = ({ isPrivate }: UserProps) => {
  const router = useRouter();
  const { data, error } = useSWR<IUser>(`${BASE_URL}/users/me`);

  useEffect(() => {
    if (isPrivate) {
      if (data && !data.ok) {
        router.replace("/");
      }
    } else {
      return;
    }
  }, [router, isPrivate, data]);

  return { user: data?.user, error: !data && !error };
};

export default useUser;

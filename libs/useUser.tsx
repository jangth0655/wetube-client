import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import BASE_URL from "../server";

interface User {
  ok: boolean;
  user: User;
}

interface UserProps {
  isPrivate: boolean;
}

const useUser = ({ isPrivate }: UserProps) => {
  const router = useRouter();
  const { data, error } = useSWR<User>(`${BASE_URL}/users/me`);

  useEffect(() => {
    if (isPrivate) {
      if (data && !data.ok) {
        router.replace("/");
      }
    } else {
      return;
    }
  }, [router, isPrivate, data]);

  return { user: data?.user ? data?.user : false, error: !data && !error };
};

export default useUser;

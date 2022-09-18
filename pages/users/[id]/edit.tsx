import Image from "next/image";
import { useRouter } from "next/router";
import PageNav from "../../../components/PageNav";
import useUser from "../../../libs/useUser";

import Input from "../../../components/shared/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ShareButton from "../../../components/shared/shareButton";

import { FaUser } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import useMutation from "../../../libs/mutation";
import axios from "axios";
import BASE_URL from "../../../server";
import Link from "next/link";

interface EditProfileProps {}

interface EditForm {
  name: string;
  email: string;
  username: string;
  location: string;
  avatarId: FileList;
  error?: any;
}

interface EditMutation {
  ok: boolean;
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const router = useRouter();
  const { user } = useUser({ isPrivate: true });
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<EditForm>();

  const [edit, { data, error, loading }] = useMutation<EditMutation>(
    `users/${user?._id}/edit`
  );

  const onValid = async (data: EditForm) => {
    if (loading) return;
    if (data.avatarId && data.avatarId.length > 0) {
      const form = new FormData();
      form.append("file", data.avatarId[0], `${user?.username}-avatars`);
      const avatarFile = (
        await axios(`${BASE_URL}/users/awsUpload`, {
          method: "POST",
          data: form,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
      ).data;
      edit({ ...data, avatarId: avatarFile.file.location });
    }
    return;
  };

  const image = watch("avatarId");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);

  useEffect(() => {
    user?.username && setValue("username", user.username);
    user?.email && setValue("email", user.email);
    user?.name && setValue("name", user.name);
    user?.location && setValue("location", user.location);
    user?.avatarId && setPreview(user.avatarId);
  }, [
    setValue,
    user?.avatarId,
    user?.email,
    user?.location,
    user?.name,
    user?.username,
  ]);

  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <PageNav title="Edit Profile">
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col justify-center items-center"
      >
        <label htmlFor="avatar" className="flex cursor-pointer relative mb-14">
          {preview ? null : (
            <div className="absolute right-0 bottom-4 text-xl hover:text-red-500 transition-all cursor-pointer">
              <FaEdit />
            </div>
          )}
          {preview ? (
            <div className="w-36 h-36 relative rounded-full shadow-black shadow-md ">
              <Image
                className="rounded-full"
                src={preview}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </div>
          ) : (
            <div className="w-36 h-36 rounded-full bg-zinc-400 flex justify-center items-center text-4xl">
              <FaUser />
            </div>
          )}
          <input
            id="avatar"
            className="hidden w-full h-full cursor-pointer"
            type="file"
            accept="image/*"
            {...register("avatarId")}
          />
        </label>

        <div className="space-y-6 w-[70%]">
          <div>
            <Input
              id="username"
              label="Username"
              placeholder="username"
              type="text"
              register={register("username")}
            />
          </div>
          <div>
            <Input
              id="email"
              label="Email"
              placeholder="email"
              type="text"
              register={register("email")}
            />
          </div>
          <div>
            <Input
              id="name"
              label="name"
              placeholder="name"
              type="text"
              register={register("name")}
            />
          </div>
          <div>
            <Input
              id="location"
              label="location"
              placeholder="location"
              type="text"
              register={register("location")}
            />
          </div>
        </div>

        <div className="mt-14 w-[70%] flex justify-center items-center rounded-md p-1 bg-orange-400 hover:bg-orange-500 transition-all cursor-pointer">
          <ShareButton text="Edit" loading={loading} />
        </div>
      </form>

      <div className="w-[70%] m-auto mt-14">
        <Link href={`/users/${user?._id}/edit-password`}>
          <a className="font-bold text-blue-400 hover:text-blue-600 transition-all">
            Change Password
          </a>
        </Link>
      </div>
    </PageNav>
  );
};

export default EditProfile;

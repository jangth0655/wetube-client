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

import Link from "next/link";
import uploadFileProcess from "../../../libs/uploadFIleProcess";
import ErrorMessage from "../../../components/shared/ErrorMessage";

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
  error?: string;
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
    clearErrors,
  } = useForm<EditForm>();

  const [edit, { data: editData, error, loading }] = useMutation<EditMutation>(
    `users/${user?._id}/edit`
  );

  const onValid = async (data: EditForm) => {
    if (loading) return;
    try {
      if (data.avatarId && data.avatarId.length > 0) {
        const uploadFile = await uploadFileProcess(
          data.avatarId,
          `${user?.username}_avatars`,
          "users"
        );
        if (uploadFile.error) {
          setError("error", { message: uploadFile.error });
          return;
        }
        edit({ ...data, avatarId: uploadFile.file });
      } else {
        edit({ ...data, avatarId: null });
      }

      if (error) {
        setError("error", { message: error });
      }
    } catch (error) {
      console.log(error);
      setError("error", { message: editData?.error });
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
    if (editData && editData.ok) {
      router.push("/");
    }
  }, [editData, router]);

  const errorStateMessage =
    errors.email?.message ||
    errors.location?.message ||
    errors.name?.message ||
    errors.username?.message ||
    errors.error?.message;

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
              register={register("username", {
                onChange: () => clearErrors("error"),
              })}
            />
          </div>
          <div>
            <Input
              id="email"
              label="Email"
              placeholder="email"
              type="text"
              register={register("email", {
                onChange: () => clearErrors("error"),
              })}
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
        {errorStateMessage && (
          <div className="mt-2">
            <ErrorMessage error={errorStateMessage} />
          </div>
        )}
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

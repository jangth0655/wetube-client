import Layout from "../../components/layout";
import PageTitle from "../../components/shared/PageTitle";
import useUser from "../../libs/useUser";

import { FaCloudUploadAlt } from "react-icons/fa";
import Input from "../../components/shared/Input";
import TextArea from "../../components/shared/TextArea";
import ShareButton from "../../components/shared/shareButton";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/shared/ErrorMessage";
import useMutation from "../../libs/mutation";
import axios from "axios";
import BASE_URL from "../../server";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface UploadForm {
  title: string;
  hashtags: string;
  description: string;
  file: FileList;
  error?: string;
}

interface UploadMutation {
  ok: true;
}

const VideoUpload = () => {
  const router = useRouter();
  const { user } = useUser({ isPrivate: true });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<UploadForm>();

  const [upload, { data, loading }] =
    useMutation<UploadMutation>("videos/upload");

  const onValid = async (data: UploadForm) => {
    if (loading) return;
    if (data.file && data.file.length > 0) {
      const formData = new FormData();
      formData.append("file", data.file[0], `${user?.username}_${data.title}`);
      const videoData = await (
        await axios(`${BASE_URL}/videos/awsUpload`, {
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
      ).data;
      upload({ ...data, file: videoData.file.location });
    } else {
      setError("file", { message: "Video is Required." });
    }
  };

  const onRecorder = () => {
    router.push("/videos/recorder");
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  const errorMessage =
    errors.title?.message ||
    errors.description?.message ||
    errors.file?.message ||
    errors.hashtags?.message;

  return (
    <Layout uploadPage={true}>
      <PageTitle title="Upload" />
      <div>
        <div className="mb-6">
          <div className="w-[50%] m-auto">
            <span
              onClick={onRecorder}
              className="bg-orange-500 uppercase px-2 py-1 font-bold rounded-md hover:bg-orange-600 transition-all cursor-pointer"
            >
              Recorder
            </span>
          </div>
        </div>

        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit(onValid)}
          className="w-full"
        >
          <div className="border-2 border-zinc-500 dark:border-zinc-50 rounded-md border-dashed w-[50%] h-48 m-auto transition-all flex justify-center items-center group flex-col space-y-2">
            <div className="text-4xl group-hover:text-orange-500 transition-all opacity-40">
              <FaCloudUploadAlt />
            </div>
            <label className="flex justify-center items-center p-4 rounded-lg group-hover:bg-orange-500 group-hover:text-zinc-50 bg-orange-200 text-zinc-700 cursor-pointer transition-all">
              <span>Upload Video File</span>
              <input
                {...register("file", { required: "Video is required" })}
                name="file"
                className="hidden"
                type="file"
                accept="video/*"
              />
            </label>
          </div>
          <div className="w-[50%] m-auto mt-16 space-y-8">
            {errorMessage && <ErrorMessage error={errorMessage} />}
            <Input
              register={register("title", { required: "Title is required." })}
              type="text"
              id="title"
              placeholder="Title"
              label="Title"
            />
            <Input
              register={register("hashtags")}
              type="text"
              id="hashtags"
              placeholder="HashTags"
              label="HashTags"
            />
            <TextArea
              register={register("description")}
              id="description"
              label="Description"
            />
            <div className="flex justify-center items-center rounded-lg bg-orange-300 p-2 hover:bg-orange-500 transition-all cursor-pointer">
              <ShareButton text="Submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default VideoUpload;

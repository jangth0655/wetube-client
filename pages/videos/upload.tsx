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

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import uploadFileProcess from "../../libs/uploadFIleProcess";
import Image from "next/image";
import cls from "../../libs/cls";

interface UploadForm {
  title: string;
  hashtags: string;
  description: string;
  file: FileList;
  thumbnailURL: FileList;
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
    clearErrors,
  } = useForm<UploadForm>({
    mode: "onChange",
  });
  const [isOnVideoFile, setIsOnVideoFile] = useState(false);
  const [videoFileName, setVideoFileName] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const [upload, { data, loading }] =
    useMutation<UploadMutation>("videos/upload");

  const onValid = async (data: UploadForm) => {
    if (loading) return;

    let uploadFile;
    let thumbnail;
    if (data.file && data.file.length > 0) {
      uploadFile = await uploadFileProcess(
        data.file,
        `${user?.username}_${data.title}`,
        "videos"
      );
      if (uploadFile.error) {
        setError("error", { message: uploadFile.error });
        return;
      }
    }
    if (data.thumbnailURL && data.thumbnailURL.length > 0) {
      thumbnail = await uploadFileProcess(
        data.thumbnailURL,
        `${user?.username}_${data.title}_Thumbnail`,
        "videos"
      );
      if (thumbnail.error) {
        setError("error", { message: thumbnail.error });
        return;
      }
    } else {
      setError("file", { message: "Video is Required." });
    }
    upload({ ...data, file: uploadFile?.file, thumbnailURL: thumbnail?.file });
  };

  const onRecorder = () => {
    router.push("/videos/recorder");
  };

  useEffect(() => {
    if (data?.ok) {
      router.push("/");
    }
  }, [data, router]);

  const videoFile = watch("file");
  useEffect(() => {
    if (videoFile) {
      const videoName = videoFile[0]?.name ? videoFile[0].name : "Upload video";
      setIsOnVideoFile(true);
      setVideoFileName(videoName);
    }
  }, [videoFile, videoFileName]);

  const thumbnail = watch("thumbnailURL");
  useEffect(() => {
    if (thumbnail && thumbnail.length > 0) {
      const thumbnailFile = thumbnail[0];
      setPreviewThumbnail(URL.createObjectURL(thumbnailFile));
    }
  }, [thumbnail]);

  const onClearThumbnail = () => {
    setPreviewThumbnail("");
  };

  const errorMessage =
    errors.title?.message ||
    errors.description?.message ||
    errors.file?.message ||
    errors.hashtags?.message ||
    errors.error?.message;

  return (
    <Layout uploadPage={true}>
      <PageTitle title="Upload" />
      <div>
        <div className="mb-6">
          <div className="w-[50%] m-auto">
            <span
              onClick={onRecorder}
              className="bg-orange-500 uppercase px-2 py-1 font-bold rounded-md hover:bg-orange-600 transition-all cursor-pointer text-zinc-50"
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
          <div className="rounded-md w-[50%] m-auto transition-all flex justify-center items-center group flex-col">
            <div className="flex flex-col w-full">
              <label className="flex w-[100%] rounded-xl justify-center items-center p-2  text-zinc-50 cursor-pointer hover:dark:bg-black hover:bg-blue-700 bg-zinc-900 transition-all shadow-black shadow-md mb-10">
                <span className="font-bold uppercase">
                  {isOnVideoFile ? videoFileName : "Upload Video"}
                </span>
                <input
                  {...register("file", {
                    required: "Video is required",
                    onChange: () => clearErrors("error"),
                  })}
                  name="file"
                  className="hidden"
                  type="file"
                  accept="video/*"
                />
              </label>

              <label
                className={cls(
                  "p-4 rounded-xl flex justify-center items-center relative h-80 hover:border-orange-500 transition-all cursor-pointer hover:text-orange-500 mb-6",
                  previewThumbnail
                    ? "shadow-black shadow-md"
                    : "border-2 border-dashed"
                )}
              >
                {previewThumbnail ? (
                  <Image
                    className="rounded-xl"
                    src={previewThumbnail}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                ) : (
                  <FaCloudUploadAlt size={60} />
                )}
                <input
                  {...register("thumbnailURL", {
                    required: "Video is required",
                    onChange: () => clearErrors("error"),
                  })}
                  className="hidden"
                  type="file"
                  accept="image/*"
                />
              </label>
              <div onClick={onClearThumbnail}>
                <span className="inline-block px-2 py-1 bg-orange-400 hover:bg-orange-600 text-zinc-50 transition-all rounded-xl cursor-pointer">
                  Reset
                </span>
              </div>
            </div>
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
            <div className="flex justify-center items-center rounded-lg bg-orange-300 p-2 hover:bg-orange-500 transition-all cursor-pointer shadow-black shadow-md">
              <ShareButton text="Submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default VideoUpload;

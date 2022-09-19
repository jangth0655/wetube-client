import axios, { AxiosPromise } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageNav from "../../components/PageNav";
import Input from "../../components/shared/Input";
import ShareButton from "../../components/shared/shareButton";
import TextArea from "../../components/shared/TextArea";
import useMutation from "../../libs/mutation";
import useUser from "../../libs/useUser";
import BASE_URL from "../../server";

interface VideoForm {
  title: string;
  description: string;
  hashtags: string;
}

interface VideoEditMutation {
  ok: boolean;
}

const EditVideo: NextPage = () => {
  const { user } = useUser({ isPrivate: true });
  const [deleteVideoResult, setDeleteVideoResult] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoForm>();

  const videoURL = router.query.videoFile && (router.query.videoFile as string);
  const videoTitle =
    router.query.videoTitle && (router.query.videoTitle as string);
  const videoHashTags =
    router.query.videoHashTags && (router.query.videoHashTags as string);
  const videoId = router.query.videoId && (router.query.videoId as string);

  const [edit, { data, error, loading }] = useMutation<VideoEditMutation>(
    `videos/${videoId}/edit`
  );

  const onDelete = async (videoFile?: string) => {
    window.confirm("Really????!!!");
    const result = await (
      await axios(`${BASE_URL}/videos/${videoId}/delete?file=${videoFile}`, {
        method: "POST",
        data: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
    ).data;
    if (result) {
      setDeleteVideoResult(true);
    }
    return;
  };

  useEffect(() => {
    if (deleteVideoResult) {
      router.replace("/");
    }
  }, [deleteVideoResult, router]);

  const onValid = (data: VideoForm) => {
    if (loading) return;
    edit(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
  }, [data, router]);

  useEffect(() => {
    videoTitle && setValue("title", videoTitle);
    videoHashTags && setValue("hashtags", videoHashTags);
  }, [setValue, videoHashTags, videoTitle]);

  return (
    <PageNav title="Edit">
      <section>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="w-full h-96 bg-black p-2 rounded-md">
            <video className="w-full h-full" src={videoURL}></video>
          </div>

          <div className="w-[70%] m-auto mt-16 space-y-10">
            <div>
              <Input
                type="text"
                id="title"
                label="Title"
                placeholder="title"
                register={register("title")}
              />
            </div>
            <div>
              <Input
                type="text"
                id="hashtags"
                label="HashTags"
                placeholder="HashTags"
                register={register("hashtags")}
              />
            </div>
            <div>
              <TextArea
                label="Description"
                id="description"
                register={register("description")}
              />
            </div>
            <div className="flex justify-center items-center py-1 rounded-md hover:bg-orange-500 bg-orange-400 transition-all cursor-pointer">
              <ShareButton text="Edit" loading={loading} />
            </div>
          </div>
        </form>
        <div className="w-[70%] m-auto mt-10">
          <button
            onClick={() => onDelete(videoURL)}
            className="inline-block px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 cursor-pointer transition-all text-zinc-200 text-sm"
          >
            Delete Video
          </button>
        </div>
      </section>
    </PageNav>
  );
};
export default EditVideo;

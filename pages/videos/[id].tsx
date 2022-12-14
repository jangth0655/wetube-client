import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Comments from "../../components/Comments";
import PageNav from "../../components/PageNav";
import VideoPlayer from "../../components/VideoPlayer";
import { Comment, User, Video } from "../../libs/interface";
import useMutation from "../../libs/mutation";
import BASE_URL from "../../server";

interface CommentWithUser extends Comment {
  user: User;
}

export interface VideoWithUserWithComment extends Video {
  user: User;
  comments: CommentWithUser[];
}

interface VideoDetailResponse {
  ok: boolean;
  video: VideoWithUserWithComment;
}

const VideoDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<VideoDetailResponse>(
    router.query.id ? `${BASE_URL}/videos/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    }
  );

  const [uploadView, { data: dataView }] = useMutation(
    `videos/${data?.video._id}/view`
  );

  useEffect(() => {
    if (data?.video._id) {
      uploadView({});
    }
  }, []);

  return (
    <PageNav title={data?.video.title}>
      <div className="px-4 space-y-16">
        <VideoPlayer video={data?.video} />
        <div className="w-full h-[1px] bg-slate-300" />
        <div>
          <Comments comments={data?.video.comments} id={data?.video._id} />
        </div>
      </div>
    </PageNav>
  );
};
export default VideoDetail;

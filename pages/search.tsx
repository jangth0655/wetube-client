import { NextPage } from "next";
import { useRouter } from "next/router";
import PageNav from "../components/PageNav";
import { VideoWithUser } from "../components/Search";
import VideoList from "../components/videoList";

const Search: NextPage = () => {
  const router = useRouter();
  const videos: VideoWithUser[] = JSON.parse(router.query.videos as any);
  const itemTitle = router.query.keyword;

  return (
    <PageNav title={`${itemTitle}`}>
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-6 space-y-20 sm:space-y-0">
        {videos?.map((video) => (
          <div key={video._id}>
            <VideoList video={video} user={video.user} />
          </div>
        ))}
      </div>
    </PageNav>
  );
};
export default Search;

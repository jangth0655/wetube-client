import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import PageNav from "../components/PageNav";
import VideoList from "../components/videoList";
import { User, Video } from "../libs/interface";
import BASE_URL from "../server";

export interface VideoWithUser extends Video {
  user: User;
}

interface SearchResponse {
  ok: boolean;
  error?: string;
  videos: VideoWithUser[];
}

const Search: NextPage = () => {
  const router = useRouter();
  const keyword = router.query.keyword;
  const { data } = useSWR<SearchResponse>(
    `${BASE_URL}/videos/search/${keyword}`
  );

  return (
    <PageNav title={`${keyword}`}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 space-y-20 sm:space-y-0">
        {data?.videos?.map((video) => (
          <div key={video._id}>
            <VideoList video={video} user={video.user} />
          </div>
        ))}
      </div>
    </PageNav>
  );
};
export default Search;

import { NextPage } from "next";
import { useRouter } from "next/router";
import PageNav from "../../components/PageNav";

const VideoDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <PageNav title="">
      <h1>video detail</h1>
    </PageNav>
  );
};
export default VideoDetail;

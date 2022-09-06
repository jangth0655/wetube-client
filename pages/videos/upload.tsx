import useUser from "../../libs/useUser";

const VideoUpload = () => {
  const { user } = useUser({ isPrivate: true });
  return <h1>hello</h1>;
};
export default VideoUpload;

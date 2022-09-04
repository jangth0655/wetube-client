interface ButtonProps {
  loading: boolean;
  text: string;
}

const ShareButton: React.FC<ButtonProps> = ({ loading, text }) => {
  return (
    <button className="uppercase ">{loading ? "Loading..." : text}</button>
  );
};
export default ShareButton;

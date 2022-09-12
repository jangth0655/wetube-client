interface ButtonProps {
  loading?: boolean;
  text: string;
  social?: boolean;
}

const ShareButton: React.FC<ButtonProps> = ({ loading, text, social }) => {
  return (
    <button className="text-zinc-100 uppercase">
      {loading ? "Loading..." : text}
    </button>
  );
};
export default ShareButton;

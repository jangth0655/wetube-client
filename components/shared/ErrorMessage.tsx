interface ErrorMessageProps {
  error?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="mb-4">
      <span className="font-bold text-red-500">{`${error}`}</span>
    </div>
  );
};
export default ErrorMessage;

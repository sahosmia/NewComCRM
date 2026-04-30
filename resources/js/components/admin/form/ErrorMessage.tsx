interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="text-red-500 text-sm  animate-in fade-in slide-in-from-top-1">
      {message}
    </p>
  );
};

export default ErrorMessage;

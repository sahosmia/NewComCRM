interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="text-[12px] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
      {message}
    </p>
  );
};

export default ErrorMessage;

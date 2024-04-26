import { cn } from 'src/lib/utils';

type ErrorMessageElementProps = React.HTMLAttributes<HTMLParagraphElement>;

interface ErrorMessageProps extends ErrorMessageElementProps {
  errorMessage: string;
  isAbsolute?: boolean;
}

const ErrorMessage = ({ errorMessage, className, isAbsolute }: ErrorMessageProps) => {
  return (
    <p
      className={cn('mt-1 text-xs font-medium capitalize text-destructive', className, {
        absolute: isAbsolute,
      })}
    >
      {errorMessage}
    </p>
  );
};

export default ErrorMessage;

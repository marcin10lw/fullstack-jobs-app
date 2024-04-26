import { ClassValue } from 'clsx';
import mainBackground from 'src/assets/images/main.svg';
import { cn } from 'src/lib/utils';

interface ImageWrapperProps {
  children: React.ReactNode;
  className?: ClassValue;
}

const ImageWrapper = ({ children, className }: ImageWrapperProps) => {
  return (
    <main className={cn('relative grid min-h-screen place-items-center bg-background p-4', className)}>
      <div className="absolute h-full w-full p-4 pt-6 [filter:blur(0px)_brightness(0.5)]">
        <img src={mainBackground} alt="" className="h-full w-full" />
      </div>
      {children}
    </main>
  );
};

export default ImageWrapper;

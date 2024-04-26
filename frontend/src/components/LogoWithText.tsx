import { ClassValue } from 'clsx';
import logo from 'src/assets/images/logo_with_text.svg';
import { cn } from 'src/lib/utils';

const LogoWithText = ({ className }: { className?: ClassValue }) => {
  return <img src={logo} alt="Jobs application" className={cn('block', className)} />;
};

export default LogoWithText;

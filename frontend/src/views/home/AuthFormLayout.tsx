import ImageWrapper from 'src/components/ImageWrapper';
import Logo from 'src/components/Logo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthFormLayout = ({ title, children }: LayoutProps) => {
  return (
    <ImageWrapper>
      <Card className="z-10 w-full max-w-[400px] border-t-4 border-t-primary shadow-2xl">
        <CardHeader>
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </ImageWrapper>
  );
};
export default AuthFormLayout;

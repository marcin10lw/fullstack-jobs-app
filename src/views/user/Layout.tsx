import { Logo } from 'src/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import mainBackground from 'src/assets/images/main.svg';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <section className="relative grid min-h-screen place-items-center bg-background">
      <div className="absolute h-full w-full p-4 [filter:blur(2px)_brightness(0.7)]">
        <img src={mainBackground} alt="" className="h-full w-full" />
      </div>
      <Card className="z-10 w-full max-w-[400px] border-t-4 border-t-primary shadow-2xl">
        <CardHeader>
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
};
export default Layout;

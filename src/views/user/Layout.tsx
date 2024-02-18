import { Logo } from 'src/components';
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

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <section className="bg-background grid min-h-screen place-items-center">
      <Card className="border-t-primary w-full max-w-[400px] border-t-4 shadow-2xl">
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

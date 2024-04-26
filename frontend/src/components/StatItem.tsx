import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';
import { cn } from 'src/lib/utils';

type StatItemProps = {
  status?: string;
  count: number;
  title: string;
  icon: JSX.Element;
  color: string;
};

const StatItem = (stat: StatItemProps) => {
  return (
    <Card
      className={cn('border-b-2 shadow-xl', {
        'border-b-muted-foreground': stat.status === 'pending',
        'border-b-primary/80': stat.status === 'interview',
        'border-b-destructive': stat.status === 'declined',
      })}
    >
      <CardHeader>
        <CardTitle>{stat.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span
            className={`block text-5xl font-bold ${stat.color} leading-loose`}
          >
            {stat.count}
          </span>
          {stat.icon}
        </div>
      </CardContent>
    </Card>
  );
};
export default StatItem;

import {
  ResponsiveContainer,
  AreaChart as Chart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MonthlyApplications } from 'src/infrasctucture/job/types';

type AreaChartProps = {
  monthlyApplications: MonthlyApplications;
};

const AreaChart = ({ monthlyApplications }: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip animationEasing="ease-in-out" />
        <Area type="natural" dataKey="count" stroke="#7e22ce" fill="#b292ce" />
      </Chart>
    </ResponsiveContainer>
  );
};
export default AreaChart;

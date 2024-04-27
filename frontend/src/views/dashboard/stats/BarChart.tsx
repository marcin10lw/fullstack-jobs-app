import { ResponsiveContainer, BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MonthlyApplications } from 'src/api/job/types';

type BarChartProps = {
  monthlyApplications: MonthlyApplications;
};

const BarChart = ({ monthlyApplications }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar type="natural" dataKey="count" className="fill-primary" barSize={75} />
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;

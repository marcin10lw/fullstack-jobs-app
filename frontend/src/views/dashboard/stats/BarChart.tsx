import { Bar, CartesianGrid, BarChart as Chart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { MonthlyApplications } from 'src/api/job/types';
import { useGetThemePrimaryColor } from 'src/hooks/useGetThemeColors';

type BarChartProps = {
  monthlyApplications: MonthlyApplications;
};

const BarChart = ({ monthlyApplications }: BarChartProps) => {
  const appPrimaryColor = useGetThemePrimaryColor();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip labelClassName="text-primary" cursor={{ fill: `${appPrimaryColor}30` }} />
        <Bar type="natural" dataKey="count" className="fill-primary" barSize={75} />
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;

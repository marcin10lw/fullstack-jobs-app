import { Area, CartesianGrid, AreaChart as Chart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { MonthlyApplications } from 'src/api/job/types';
import { useGetThemePrimaryColor } from 'src/hooks/useGetThemeColors';

type AreaChartProps = {
  monthlyApplications: MonthlyApplications;
};

const AreaChart = ({ monthlyApplications }: AreaChartProps) => {
  const appPrimaryColor = useGetThemePrimaryColor();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip animationEasing="ease-in-out" labelClassName="text-black" />
        <Area type="natural" dataKey="count" stroke={appPrimaryColor} fill={`${appPrimaryColor}b3`} />
      </Chart>
    </ResponsiveContainer>
  );
};
export default AreaChart;

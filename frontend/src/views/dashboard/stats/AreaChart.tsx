import { ResponsiveContainer, AreaChart as Chart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MonthlyApplications } from 'src/api/job/types';
import { themeColorsConfig } from 'src/lib/helpers/themeColorsConfig';
import useDashboardContext from '../useDashboardContext';

type AreaChartProps = {
  monthlyApplications: MonthlyApplications;
};

const AreaChart = ({ monthlyApplications }: AreaChartProps) => {
  const { themeMode, themeColor } = useDashboardContext();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip animationEasing="ease-in-out" />
        <Area
          type="natural"
          dataKey="count"
          stroke={themeColorsConfig[themeColor][themeMode]}
          fill={`${themeColorsConfig[themeColor][themeMode]}b3`}
        />
      </Chart>
    </ResponsiveContainer>
  );
};
export default AreaChart;

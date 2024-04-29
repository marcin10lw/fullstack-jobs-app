import { themeColorsConfig } from 'src/lib/helpers/themeColorsConfig';
import useDashboardContext from 'src/views/dashboard/useDashboardContext';

export const useGetThemePrimaryColor = () => {
  const { themeColor, themeMode } = useDashboardContext();
  return themeColorsConfig[themeColor][themeMode];
};

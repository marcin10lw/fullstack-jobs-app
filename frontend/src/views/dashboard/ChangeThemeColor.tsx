import { Palette } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import useDashboardContext from './useDashboardContext';
import { themeColorsList } from 'src/lib/helpers/themeColorsList';

const ChangeThemeColor = () => {
  const { changeThemeColor } = useDashboardContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="mr-4 size-6">
          <Palette className="text-primary" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themeColorsList.map(({ color, title }) => {
          return (
            <DropdownMenuItem
              key={title}
              className="flex cursor-pointer items-center gap-3"
              onClick={() => changeThemeColor(title)}
            >
              <span style={{ backgroundColor: color }} className="size-4 rounded-full" />
              <span className="capitalize">{title}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeThemeColor;

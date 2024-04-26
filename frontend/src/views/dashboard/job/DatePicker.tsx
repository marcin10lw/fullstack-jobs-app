import { PopoverContent } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { Popover, PopoverTrigger } from 'src/components/ui/popover';
import { cn } from 'src/lib/utils';
import dayjs from 'dayjs';

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'default'}
          className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dayjs(date).format('DD/MM/YYYY') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

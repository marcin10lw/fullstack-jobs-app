import { DateValue } from 'react-aria';
import { useState } from 'react';

import { DateTimePicker } from 'src/components/ui/date-time-picker/date-time-picker';

const DatePicker = () => {
  const [date, setDate] = useState<DateValue>();

  return <DateTimePicker granularity={'minute'} value={date} onChange={(value) => setDate(value)} />;
};

export default DatePicker;

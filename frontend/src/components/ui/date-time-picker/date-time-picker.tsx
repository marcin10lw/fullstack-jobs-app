'use client';

import { CalendarIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { DateValue, useButton, useDatePicker, useInteractOutside } from 'react-aria';
import { DatePickerStateOptions, useDatePickerState } from 'react-stately';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from 'src/lib/utils';
import { useForwardedRef } from 'src/hooks/useForwardRef';
import { DateField } from './date-field';
import { TimeField } from './time-field';
import { Calendar } from './calendar';

const DateTimePicker = React.forwardRef<HTMLDivElement, DatePickerStateOptions<DateValue>>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);
  useInteractOutside({
    ref: contentRef,
    onInteractOutside: () => {
      setOpen(false);
    },
  });

  return (
    <div
      {...groupProps}
      ref={ref}
      className={cn(
        groupProps.className,
        'flex items-center rounded-md bg-background ring-1 ring-muted-foreground/70 ring-offset-background focus-within:ring-2 focus-within:ring-ring',
      )}
    >
      <DateField {...fieldProps} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            variant="outline"
            className="rounded-l-none"
            disabled={props.isDisabled}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent ref={contentRef} className="w-full">
          <div {...dialogProps} className="space-y-3">
            <Calendar {...calendarProps} />
            {!!state.hasTime && <TimeField value={state.timeValue} onChange={state.setTimeValue} />}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export { DateTimePicker };

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from 'src/components/ui/select';
import { FormControl, FormItem, FormLabel } from './ui/form';
import { SelectOption } from 'src/types';

interface LabeledFormSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onOptionChange: (value: string) => void;
  children?: React.ReactNode;
}

const LabeledFormSelect = ({ label, options, children, value, onOptionChange }: LabeledFormSelectProps) => {
  return (
    <FormItem className="space-y-[2px]">
      <FormLabel className="font-normal capitalize">{label}</FormLabel>
      <ShadcnSelect value={value} onValueChange={onOptionChange}>
        <FormControl>
          <SelectTrigger className="relative w-full">
            <SelectValue placeholder={label} />
            {children}
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>
    </FormItem>
  );
};

export default LabeledFormSelect;

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from 'src/components/ui/select';
import { FormControl, FormItem, FormLabel } from './ui/form';

interface LabeledSelectProps {
  label: string;
  options: string[] | readonly string[];
  value: string;
  onOptionChange: (value: string) => void;
  children?: React.ReactNode;
}

const LabeledSelect = ({
  label,
  options,
  children,
  value,
  onOptionChange,
}: LabeledSelectProps) => {
  return (
    <FormItem className="space-y-[2px]">
      <FormLabel className="capitalize">{label}</FormLabel>
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
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadcnSelect>
    </FormItem>
  );
};

export default LabeledSelect;

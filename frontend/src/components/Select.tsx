import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from 'src/components/ui/select';
import { SelectOption } from 'src/types';
import { Label } from './ui/label';

interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  onOptionChange: (value: string) => void;
  children?: React.ReactNode;
}

const Select = ({ label, options, value, onOptionChange, children }: SelectProps) => {
  return (
    <div className="relative">
      <Label htmlFor={label} className="absolute bottom-[calc(100%+4px)] ml-1 font-normal capitalize">
        {label}
      </Label>
      <ShadcnSelect value={value} onValueChange={onOptionChange}>
        <SelectTrigger className="relative w-full" id={label}>
          <SelectValue placeholder={label} />
          {children}
        </SelectTrigger>
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
    </div>
  );
};

export default Select;

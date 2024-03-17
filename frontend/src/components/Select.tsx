import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadcnSelect,
} from 'src/components/ui/select';
import { SelectOption } from 'src/types';

interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string;
  onOptionChange: (value: string) => void;
  children?: React.ReactNode;
}

const Select = ({
  label,
  options,
  value,
  onOptionChange,
  children,
}: SelectProps) => {
  return (
    <ShadcnSelect value={value} onValueChange={onOptionChange}>
      <SelectTrigger className="relative w-full">
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
  );
};

export default Select;

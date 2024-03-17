import { SelectOption } from 'src/types';

export const buildSelectOptions = (
  options: string[] | readonly string[],
  substringToReplace: string = '_',
  replacementString: string = '-',
): SelectOption[] =>
  options.map((option) => {
    if (option.includes('_')) {
      return {
        label: option.replace(substringToReplace, replacementString),
        value: option,
      };
    }

    return { label: option, value: option };
  });

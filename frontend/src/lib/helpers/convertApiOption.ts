export const convertApiOption = (
  option: string,
  substringToReplace: string = '_',
  replacementString: string = '-',
) =>
  option.includes(substringToReplace)
    ? option.replace(substringToReplace, replacementString)
    : option;

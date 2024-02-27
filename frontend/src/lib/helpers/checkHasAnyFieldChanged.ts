/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkHasAnyFieldChanged = (
  fields: Record<string, any>,
  initialFields: Record<string, any>,
) =>
  Object.values(fields).some(
    (value, index) => value !== Object.values(initialFields)[index],
  );

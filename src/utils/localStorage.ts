export const saveValueToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLocalStorage = <T>(key: string) => {
  const localStorageValue = localStorage.getItem(key);

  if (localStorageValue === null) {
    return null;
  }

  return JSON.parse(localStorageValue) as T;
};

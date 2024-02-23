export const saveValueToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getValueFromLocalStorage = <T>(key: string, fallback?: T) => {
  const localStorageValue = localStorage.getItem(key);

  if (!localStorageValue) {
    return fallback ? fallback : null;
  }

  return JSON.parse(localStorageValue) as T;
};

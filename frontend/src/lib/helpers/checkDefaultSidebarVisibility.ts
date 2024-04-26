import { LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY } from 'src/common/constants';
import { getValueFromLocalStorage } from './localStorage';

export const getLocalStorageSidebarVisible = () => {
  const localStorageTheme = getValueFromLocalStorage<boolean>(LOCAL_STORAGE_SIDEBAR_VISIBLE_KEY);

  return localStorageTheme ?? true;
};

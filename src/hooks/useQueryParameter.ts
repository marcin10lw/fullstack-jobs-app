import { useSearchParams } from 'react-router-dom';

export const useQueryParameter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQuery = (key: string, value: string) => {
    if (value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    setSearchParams(searchParams);
  };

  return { setQuery };
};

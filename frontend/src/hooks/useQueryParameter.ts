import { useSearchParams } from 'react-router-dom';

export const queryParams = {
  useDeleteQueryParameters: () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const deleteQueryParameters = (keys: string[]) => {
      keys.forEach((key) => {
        searchParams.delete(key);
      });

      setSearchParams(searchParams);
    };

    return { deleteQueryParameters };
  },
  useSetQueryParameter: () => {
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
  },
};
